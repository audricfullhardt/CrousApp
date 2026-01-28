import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { SlidersHorizontal, MapPin, Map } from "lucide-react-native";

import { ThemedText } from "@/app/components/ui/ThemedText";
import RestaurantCard from "../components/ui/RestaurantCard";
import AppHeader from "../components/ui/AppHeader";
import SearchBar from "../components/ui/SearchBar";
import FilterButton from "../components/ui/FilterButton";
import FilterModal from "@/app/components/ui/FilterModal";
import Pagination from "../components/ui/Pagination";
import ResetButton from "../components/ui/ResetButton";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useLocation, LocationType } from "@/hooks/useLocation";
import { useRestaurantFilters } from "@/hooks/useRestaurantFilters";
import { api, Restaurant } from "@/constants/api";
import { PAGINATION_CONFIG } from "@/utils/constants";
import { trackPageView, trackEvent } from "@/utils/umami";

export default function RestaurantsScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [showNearby, setShowNearby] = useState(false);

  const {
    filters,
    toggleFilter,
    resetFilters,
    applyFilters: applyFiltersHook,
  } = useRestaurantFilters();

  const theme = useTheme();
  const { t } = useLanguage();
  const {
    favoriteRestaurants,
    addFavoriteRestaurant,
    removeFavoriteRestaurant,
    isFavorite,
  } = useFavorites();
  const {
    location,
    loading: locationLoading,
    requestLocationPermission,
    calculateDistance,
  } = useLocation();
  const router = useRouter();
  const { favoriteRegion } = useFavorites();

  const ITEMS_PER_PAGE = PAGINATION_CONFIG.ITEMS_PER_PAGE;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.getRestaurants();

        if (response.success) {
          setRestaurants(response.data);
        } else {
          console.error("API Error:", response);
          throw new Error("API returned unsuccessful response");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }

      setLoading(false);
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    trackPageView("Restaurants", "/restaurants");
  }, []);

  const toggleFavorite = useCallback(
    (restaurant: Restaurant) => {
      const restaurantId = restaurant.code.toString();
      if (isFavorite(restaurantId)) {
        removeFavoriteRestaurant(restaurantId);
      } else {
        addFavoriteRestaurant({
          id: restaurantId,
          name: restaurant.nom,
          city: restaurant.zone,
        });
      }
    },
    [isFavorite, removeFavoriteRestaurant, addFavoriteRestaurant]
  );

  const updateRestaurantsWithDistance = useCallback(
    (restaurants: Restaurant[], userLocation: LocationType) => {
      return restaurants.map((restaurant) => {
        if (restaurant.latitude && restaurant.longitude) {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            restaurant.latitude,
            restaurant.longitude
          );
          return { ...restaurant, distance };
        }
        return restaurant;
      });
    },
    [calculateDistance]
  );

  const handleNearbyPress = async () => {
    if (!location) {
      await requestLocationPermission();
    }
    setShowNearby((prev) => !prev);
  };

  const filteredRestaurants = useMemo(() => {
    let filtered = applyFiltersHook(restaurants, searchQuery, favoriteRegion);

    if (showNearby && location) {
      filtered = updateRestaurantsWithDistance(filtered, location).sort(
        (a, b) => (a.distance || Infinity) - (b.distance || Infinity)
      );
    }

    return filtered;
  }, [
    restaurants,
    searchQuery,
    showNearby,
    location,
    favoriteRegion,
    applyFiltersHook,
    updateRestaurantsWithDistance,
  ]);

  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);

  const handleReset = useCallback(() => {
    setSearchQuery("");
    setCurrentPage(1);
    resetFilters();
  }, [resetFilters]);

  const handleShowMap = useCallback(() => {
    if (Platform.OS === "android") {
      Alert.alert(
        "Indisponible pour le moment",
        "Les équipes CROUStillant travaillent dessus",
        [{ text: "OK", style: "default" }]
      );
    } else {
      router.push("/map");
    }
  }, [router]);

  const getFavoritesText = useCallback(
    (count: number) => {
      return t("RestaurantsPage.favourites", { count });
    },
    [t]
  );

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppHeader />
      <ScrollView
        style={[styles.content, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <ThemedText style={[styles.title, { color: theme.colors.text }]}>
          {t("RestaurantsPage.seo.title")}
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: theme.colors.text }]}>
          {t("RestaurantsPage.results", { count: filteredRestaurants.length })}
        </ThemedText>

        <SearchBar
          placeholder={t("Filters.search")}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.filterContainer}>
          <FilterButton
            title={t("Filters.title")}
            icon={SlidersHorizontal}
            onPress={() => setIsFilterModalVisible(true)}
          />
          <FilterButton
            title={t("Filters.geolocated.title")}
            icon={MapPin}
            onPress={handleNearbyPress}
          />
          <FilterButton
            title={t("Filters.map")}
            icon={Map}
            onPress={handleShowMap}
          />
          <ResetButton onPress={handleReset} />
        </View>

        {favoriteRestaurants.length > 0 && (
          <View
            style={[
              styles.favoritesSection,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            <ThemedText
              style={[styles.favoritesTitle, { color: theme.colors.text }]}
            >
              {getFavoritesText(favoriteRestaurants.length)}
            </ThemedText>
            <View style={styles.favoritesList}>
              {favoriteRestaurants.map((favorite) => {
                const restaurant = restaurants.find(
                  (r) => r.code.toString() === favorite.id
                );
                if (!restaurant) return null;
                return (
                  <RestaurantCard
                    key={restaurant.code}
                    imageUrl={restaurant.image_url || ""}
                    name={restaurant.nom}
                    city={restaurant.zone}
                    isOpen={restaurant.ouvert}
                    onPressMenu={() => {
                      router.push({
                        pathname: "/menu",
                        params: { restaurantId: restaurant.code.toString() },
                      });
                      trackEvent(`Menu`, "/menu");
                    }}
                    onPressFavorite={() => toggleFavorite(restaurant)}
                    isFavorite={true}
                    isCreditCard={
                      restaurant.paiement?.includes("Carte bancaire") || false
                    }
                    isIzly={restaurant.paiement?.includes("IZLY") || false}
                    location={restaurant.adresse}
                    payment={restaurant.paiement?.join(", ") || "Aucun"}
                  />
                );
              })}
            </View>
          </View>
        )}

        <View style={styles.restaurantList}>
          {filteredRestaurants
            .filter(
              (restaurant) =>
                !favoriteRestaurants.some(
                  (favorite) => favorite.id === restaurant.code.toString()
                )
            )
            .slice(
              (currentPage - 1) * ITEMS_PER_PAGE,
              currentPage * ITEMS_PER_PAGE
            )
            .map((restaurant) => (
              <RestaurantCard
                key={restaurant.code}
                imageUrl={restaurant.image_url || ""}
                name={restaurant.nom}
                city={restaurant.zone}
                isOpen={restaurant.ouvert}
                onPressMenu={() => {
                  router.push({
                    pathname: "/menu",
                    params: { restaurantId: restaurant.code.toString() },
                  });
                  trackEvent(`Menu`, "/menu");
                }}
                onPressFavorite={() => toggleFavorite(restaurant)}
                isFavorite={isFavorite(restaurant.code.toString())}
                isCreditCard={
                  restaurant.paiement?.includes("Carte bancaire") || false
                }
                isIzly={restaurant.paiement?.includes("IZLY") || false}
                location={restaurant.adresse}
                payment={restaurant.paiement?.join(", ") || "Aucun"}
              />
            ))}
        </View>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </ScrollView>

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        filters={filters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 150 : 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  restaurantList: {
    gap: 16,
  },
  favoritesSection: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
  },
  favoritesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  favoritesList: {
    gap: 12,
  },
});
