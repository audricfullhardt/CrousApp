import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import { SlidersHorizontal, MapPin, Map } from 'lucide-react-native';

import { ThemedText } from '@/app/components/ui/ThemedText';
import RestaurantCard from '../components/ui/RestaurantCard';
import AppHeader from '../components/ui/AppHeader';
import SearchBar from '../components/ui/SearchBar';
import FilterButton from '../components/ui/FilterButton';
import FilterModal from '@/app/components/ui/FilterModal';
import Pagination from '../components/ui/Pagination';
import ResetButton from '../components/ui/ResetButton';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useLocation, LocationType } from '@/hooks/useLocation';
import { useRestaurantFilters } from '@/hooks/useRestaurantFilters';
import { api, Restaurant } from '@/constants/api';
import { PAGINATION_CONFIG } from '@/utils/constants';

type RootStackParamList = {
  menu: { restaurantId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RestaurantsScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [showNearby, setShowNearby] = useState(false);
  
  // Utilisation du hook personnalisé pour la gestion des filtres
  const { filters, toggleFilter, resetFilters, applyFilters: applyFiltersHook } = useRestaurantFilters();
  
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const { t } = useLanguage();
  const { favoriteRestaurants, addFavoriteRestaurant, removeFavoriteRestaurant, isFavorite } = useFavorites();
  const { location, loading: locationLoading, requestLocationPermission, calculateDistance } = useLocation();
  const router = useRouter();

  const ITEMS_PER_PAGE = PAGINATION_CONFIG.ITEMS_PER_PAGE;

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

  // Fonction optimisée pour gérer les favoris
  const toggleFavorite = useCallback((restaurant: Restaurant) => {
    const restaurantId = restaurant.code.toString();
    if (isFavorite(restaurantId)) {
      removeFavoriteRestaurant(restaurantId);
    } else {
      addFavoriteRestaurant({
        id: restaurantId,
        name: restaurant.nom,
        city: restaurant.zone
      });
    }
  }, [isFavorite, removeFavoriteRestaurant, addFavoriteRestaurant]);


  // Fonction optimisée pour calculer les distances
  const updateRestaurantsWithDistance = useCallback((restaurants: Restaurant[], userLocation: LocationType) => {
    return restaurants.map(restaurant => {
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
  }, [calculateDistance]);

  const handleNearbyPress = async () => {
    if (!location) {
      await requestLocationPermission();
    }
    setShowNearby(prev => !prev);
  };

  // Fonction de filtrage optimisée avec useMemo
  const filteredRestaurants = useMemo(() => {
    let filtered = applyFiltersHook(restaurants, searchQuery);

    // Tri par proximité si activé
    if (showNearby && location) {
      filtered = updateRestaurantsWithDistance(filtered, location)
        .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    }

    return filtered;
  }, [restaurants, searchQuery, showNearby, location, applyFiltersHook, updateRestaurantsWithDistance]);
  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);

  // Fonctions optimisées avec useCallback
  const handleReset = useCallback(() => {
    setSearchQuery('');
    setCurrentPage(1);
    resetFilters();
  }, [resetFilters]);

  const handleShowMap = useCallback(() => {
    router.push('/map');
  }, [router]);

  const getFavoritesText = useCallback((count: number) => {
    return count === 1 
      ? `Il y a ${count} restaurant favori`
      : `Il y a ${count} restaurants favoris`;
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader />
      <ScrollView style={[styles.content, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.contentContainer}>
        <ThemedText style={[styles.title, { color: theme.colors.text }]}>
          {t('restaurants.title')}
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: theme.colors.text }]}>
          {t('restaurants.available', { count: filteredRestaurants.length })}
        </ThemedText>

        <SearchBar
          placeholder={t('restaurants.search')}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.filterContainer}>
          <FilterButton 
            title={t('restaurants.filters')} 
            icon={SlidersHorizontal}
            onPress={() => setIsFilterModalVisible(true)}
          />
          <FilterButton
            title={t('restaurants.nearby')}
            icon={MapPin}
            onPress={handleNearbyPress}
          />
          <FilterButton
            title={t('restaurants.show_map')}
            icon={Map}
            onPress={handleShowMap}
          />
          <ResetButton onPress={handleReset} />
        </View>

        {favoriteRestaurants.length > 0 && (
          <View style={[styles.favoritesSection, { backgroundColor: theme.colors.surfaceVariant }]}>
            <ThemedText style={[styles.favoritesTitle, { color: theme.colors.text }]}>
              {getFavoritesText(favoriteRestaurants.length)}
            </ThemedText>
            <View style={styles.favoritesList}>
              {favoriteRestaurants.map((favorite) => {
                const restaurant = restaurants.find(r => r.code.toString() === favorite.id);
                if (!restaurant) return null;
                return (
                  <RestaurantCard
                    key={restaurant.code}
                    imageUrl={restaurant.image_url || ""}
                    name={restaurant.nom}
                    city={restaurant.zone}
                    isOpen={restaurant.actif}
                    onPressMenu={() => navigation.navigate('menu', { restaurantId: restaurant.code.toString() })}
                    onPressFavorite={() => toggleFavorite(restaurant)}
                    isFavorite={true}
                    isCreditCard={restaurant.paiement?.includes('Carte bancaire') || false}
                    isIzly={restaurant.paiement?.includes('IZLY') || false}
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
            .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
            .map((restaurant) => (
              <RestaurantCard
                key={restaurant.code}
                imageUrl={restaurant.image_url || ""}
                name={restaurant.nom}
                city={restaurant.zone}
                isOpen={restaurant.actif}
                onPressMenu={() => navigation.navigate('menu', { restaurantId: restaurant.code.toString() })}
                onPressFavorite={() => toggleFavorite(restaurant)}
                isFavorite={isFavorite(restaurant.code.toString())}
                isCreditCard={restaurant.paiement?.includes('Carte bancaire') || false}
                isIzly={restaurant.paiement?.includes('IZLY') || false}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 150 : 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    flexWrap: 'wrap',
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
    fontWeight: 'bold',
    marginBottom: 12,
  },
  favoritesList: {
    gap: 12,
  },
});
