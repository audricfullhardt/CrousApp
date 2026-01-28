import {
  StyleSheet,
  View,
  ScrollView,
  Linking,
  Platform,
  Pressable,
} from "react-native";
import AppHeader from "../components/ui/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackEvent, trackPageView } from "@/utils/umami";
import { useCallback, useEffect, useState } from "react";
import { ThemedText } from "../components/ui/ThemedText";
import { useFavorites } from "@/contexts/FavoritesContext";
import RestaurantCard from "../components/ui/RestaurantCard";
import { useRouter } from "expo-router";
import { api, Restaurant } from "@/constants/api";
import NoFavorite from "../components/NoFavorite";

export default function FavScreen() {
  const theme = useTheme();
  const { t } = useLanguage();
  const { favoriteRestaurants } = useFavorites();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    trackPageView("Favorite", "/fav");
  }, []);
  const getFavoritesText = useCallback(
    (count: number) => {
      return t("RestaurantsPage.favourites", { count });
    },
    [t]
  );

  useEffect(() => {
      const fetchRestaurants = async () => {
        try {
          const response = await api.getRestaurants();
          
          if (response.success) {
            setRestaurants(response.data);
          } else {
            console.error('API Error:', response);
            throw new Error('API returned unsuccessful response');
          }
        } catch (error) {
          console.error('Error fetching restaurants:', error);
        }
        
        setLoading(false);
      };
  
      fetchRestaurants();
    }, []);

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
        {favoriteRestaurants.length > 0 ?
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
                function toggleFavorite(restaurant: any): void {
                  throw new Error("Function not implemented.");
                }

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
                    onPressFavorite={()=> 0}
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
        : <NoFavorite/>
        }
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
function setLoading(arg0: boolean) {
    throw new Error("Function not implemented.");
}

