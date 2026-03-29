import { StyleSheet, View, ScrollView, Platform, ActivityIndicator } from "react-native";
import AppHeader from "../components/ui/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackEvent, trackPageView } from "@/utils/umami";
import { useCallback, useEffect } from "react";
import { ThemedText } from "../components/ui/ThemedText";
import RestaurantCard from "../components/ui/RestaurantCard";
import { useRouter } from "expo-router";
import { Restaurant } from "@/constants/api";
import NoFavorite from "../components/NoFavorite";
import { useRestaurants } from "@/hooks/useRestaurants";
import { useFavoriteToggle } from "@/hooks/useFavoriteToggle";

export default function FavScreen() {
  const theme = useTheme();
  const { t } = useLanguage();
  const router = useRouter();
  const { restaurants, loading } = useRestaurants();
  const { favoriteRestaurants, toggleFavorite, isFavorite } = useFavoriteToggle();

  useEffect(() => {
    trackPageView("Favorite", "/fav");
  }, []);

  const getFavoritesText = useCallback(
    (count: number) => t("RestaurantsPage.favourites", { count }),
    [t]
  );

  const handlePressMenu = useCallback(
    (restaurant: Restaurant) => {
      router.push({
        pathname: "/menu",
        params: { restaurantId: restaurant.code.toString() },
      });
      trackEvent(`Menu`, "/menu");
    },
    [router]
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
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
          {t("Header.favorites")}
        </ThemedText>

        {favoriteRestaurants.length > 0 ? (
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
                    onPressMenu={() => handlePressMenu(restaurant)}
                    onPressFavorite={() => toggleFavorite(restaurant)}
                    isFavorite={isFavorite(restaurant.code.toString())}
                    isCreditCard={restaurant.paiement?.includes("Carte bancaire") || false}
                    isIzly={restaurant.paiement?.includes("IZLY") || false}
                    location={restaurant.adresse}
                    payment={restaurant.paiement?.join(", ") || "Aucun"}
                  />
                );
              })}
            </View>
          </View>
        ) : (
          <NoFavorite />
        )}
      </ScrollView>
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
    gap: 8,
  },
});
