import { StyleSheet, View, ScrollView, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import RestaurantCard from '../components/ui/RestaurantCard';
import AppHeader from '../components/ui/AppHeader';
import SearchBar from '../components/ui/SearchBar';
import FilterButton from '../components/ui/FilterButton';
import FilterModal from '@/app/components/ui/FilterModal';
import Pagination from '../components/ui/Pagination';
import ResetButton from '../components/ui/ResetButton';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useLocation, LocationType } from '@/hooks/useLocation';
import { useRouter } from 'expo-router';
import { SlidersHorizontal, MapPin, Map } from 'lucide-react-native';

type RootStackParamList = {
  menu: { restaurantId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Region {
  code: number;
  libelle: string;
}

interface Restaurant {
  code: number;
  nom: string;
  adresse: string;
  image_url: string | null;
  region: Region;
  actif: boolean;
  horaires: string[];
  zone: string;
  paiement: string[];
  latitude?: number;
  longitude?: number;
  distance?: number;
}

export default function RestaurantsScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [showNearby, setShowNearby] = useState(false);
  const [filters, setFilters] = useState({
    alphabeticalOrder: { key: 'alpha', value: false, onToggle: () => toggleFilter('alphabeticalOrder') },
    reverseAlphabeticalOrder: { key: 'reverseAlpha', value: false, onToggle: () => toggleFilter('reverseAlphabeticalOrder') },
    cityAlphabeticalOrder: { key: 'cityAlpha', value: false, onToggle: () => toggleFilter('cityAlphabeticalOrder') },
    cityReverseAlphabeticalOrder: { key: 'cityReverseAlpha', value: false, onToggle: () => toggleFilter('cityReverseAlphabeticalOrder') },
    cardPayment: { key: 'card', value: false, onToggle: () => toggleFilter('cardPayment') },
    izlyPayment: { key: 'izly', value: false, onToggle: () => toggleFilter('izlyPayment') },
    openNow: { key: 'open', value: false, onToggle: () => toggleFilter('openNow') },
    accessible: { key: 'accessible', value: false, onToggle: () => toggleFilter('accessible') },
  });
  
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const { t } = useLanguage();
  const { favoriteRestaurants, addFavoriteRestaurant, removeFavoriteRestaurant, isFavorite } = useFavorites();
  const { location, loading: locationLoading, requestLocationPermission, calculateDistance } = useLocation();
  const router = useRouter();

  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`https://api.croustillant.menu/v1/restaurants`);
        const responseText = await response.text();
        
        console.log('API Response:', responseText);
        

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          console.error('Raw Response:', responseText);
          throw new Error('Invalid JSON response from server');
        }
        
        if (data.success) {
          setRestaurants(data.data);
        } else {
          console.error('API Error:', data);
          throw new Error('API returned unsuccessful response');
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
      
      setLoading(false);
    };

    fetchRestaurants();
  }, []);

  const toggleFavorite = (restaurant: Restaurant) => {
    if (isFavorite(restaurant.code.toString())) {
      removeFavoriteRestaurant(restaurant.code.toString());
    } else {
      addFavoriteRestaurant({
        id: restaurant.code.toString(),
        name: restaurant.nom,
        city: restaurant.zone
      });
    }
  };

  const toggleFilter = (filterKey: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: { ...prev[filterKey], value: !prev[filterKey].value },
      ...(filterKey === 'alphabeticalOrder' && prev.reverseAlphabeticalOrder.value
        ? { reverseAlphabeticalOrder: { ...prev.reverseAlphabeticalOrder, value: false } }
        : {}),
      ...(filterKey === 'reverseAlphabeticalOrder' && prev.alphabeticalOrder.value
        ? { alphabeticalOrder: { ...prev.alphabeticalOrder, value: false } }
        : {}),
      ...(filterKey === 'cityAlphabeticalOrder' && prev.cityReverseAlphabeticalOrder.value
        ? { cityReverseAlphabeticalOrder: { ...prev.cityReverseAlphabeticalOrder, value: false } }
        : {}),
      ...(filterKey === 'cityReverseAlphabeticalOrder' && prev.cityAlphabeticalOrder.value
        ? { cityAlphabeticalOrder: { ...prev.cityAlphabeticalOrder, value: false } }
        : {}),
    }));
  };

  const updateRestaurantsWithDistance = (restaurants: Restaurant[], userLocation: LocationType) => {
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
  };

  const handleNearbyPress = async () => {
    if (!location) {
      await requestLocationPermission();
    }
    setShowNearby(prev => !prev);
  };

  const applyFilters = (restaurants: Restaurant[]) => {
    let filtered = [...restaurants];

    if (searchQuery.trim()) {
      filtered = filtered.filter(restaurant =>
        (restaurant.nom?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (restaurant.adresse?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (restaurant.zone?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      );
    }

    if (showNearby && location) {
      filtered = updateRestaurantsWithDistance(filtered, location)
        .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    } else {
      if (filters.alphabeticalOrder.value) {
        filtered.sort((a, b) => a.nom.localeCompare(b.nom, undefined, { sensitivity: 'base' }));
      } else if (filters.reverseAlphabeticalOrder.value) {
        filtered.sort((a, b) => b.nom.localeCompare(a.nom, undefined, { sensitivity: 'base' }));
      }

      if (filters.cityAlphabeticalOrder.value) {
        filtered.sort((a, b) => (a.zone || '').localeCompare(b.zone || '', undefined, { sensitivity: 'base' }));
      } else if (filters.cityReverseAlphabeticalOrder.value) {
        filtered.sort((a, b) => (b.zone || '').localeCompare(a.zone || '', undefined, { sensitivity: 'base' }));
      }
    }

    if (filters.cardPayment.value || filters.izlyPayment.value) {
      filtered = filtered.filter(restaurant => {
        if (!restaurant.paiement) return false;
        
        if (filters.cardPayment.value && filters.izlyPayment.value) {
          return restaurant.paiement.includes('Carte bancaire') && restaurant.paiement.includes('IZLY');
        } else if (filters.cardPayment.value) {
          return restaurant.paiement.includes('Carte bancaire');
        } else if (filters.izlyPayment.value) {
          return restaurant.paiement.includes('IZLY');
        }
        return true;
      });
    }

    if (filters.openNow.value) {
      const now = new Date();
      const currentDay = now.getDay();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTime = currentHour * 60 + currentMinutes;

      filtered = filtered.filter(restaurant => {
        if (!restaurant.actif) return false;
        if (!restaurant.horaires || restaurant.horaires.length === 0) return false;

        const todaySchedule = restaurant.horaires[currentDay === 0 ? 6 : currentDay - 1];
        if (!todaySchedule) return false;

        const timeMatch = todaySchedule.match(/(\d{1,2})h(\d{2})\s*-\s*(\d{1,2})h(\d{2})/);
        if (!timeMatch) return false;

        const openHour = parseInt(timeMatch[1]);
        const openMinutes = parseInt(timeMatch[2]);
        const closeHour = parseInt(timeMatch[3]);
        const closeMinutes = parseInt(timeMatch[4]);

        const openTime = openHour * 60 + openMinutes;
        const closeTime = closeHour * 60 + closeMinutes;

        return currentTime >= openTime && currentTime <= closeTime;
      });
    }

    if (filters.accessible.value) {
      filtered = filtered.filter(restaurant => 
        restaurant.paiement && restaurant.paiement.some(p => 
          p.toLowerCase().includes('pmr') || 
          p.toLowerCase().includes('accessib')
        )
      );
    }

    if (!showNearby && !filters.alphabeticalOrder.value && !filters.reverseAlphabeticalOrder.value && 
        !filters.cityAlphabeticalOrder.value && !filters.cityReverseAlphabeticalOrder.value) {
      filtered = restaurants.filter(restaurant => 
        filtered.some(f => f.code === restaurant.code)
      );
    }

    return filtered;
  };

  const filteredRestaurants = applyFilters(restaurants);
  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);

  const handleReset = () => {
    setSearchQuery('');
    setCurrentPage(1);
    setFilters(prev => Object.keys(prev).reduce((acc, key) => ({
      ...acc,
      [key]: { ...prev[key as keyof typeof prev], value: false }
    }), prev));
  };

  const handleShowMap = () => {
    router.push('/map');
  };

  const getFavoritesText = (count: number) => {
    if (count === 1) {
      return `Il y a ${count} restaurant favori`;
    }
    return `Il y a ${count} restaurants favoris`;
  };

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
                    isCreditCard={restaurant.paiement && restaurant.paiement.includes('Carte bancaire')}
                    isIzly={restaurant.paiement && restaurant.paiement.includes('IZLY')}
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
                isCreditCard={restaurant.paiement && restaurant.paiement.includes('Carte bancaire')}
                isIzly={restaurant.paiement && restaurant.paiement.includes('IZLY')}
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
