import { StyleSheet, View, ScrollView, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import RestaurantCard from '../components/ui/RestaurantCard';
import AppHeader from '../components/ui/AppHeader';
import SearchBar from '../components/ui/SearchBar';
import FilterButton from '../components/ui/FilterButton';
import Pagination from '../components/ui/Pagination';
import ResetButton from '../components/ui/ResetButton';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';

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
}

export default function RestaurantsScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const { t } = useLanguage();
  const { favoriteRestaurants, addFavoriteRestaurant, removeFavoriteRestaurant, isFavorite } = useFavorites();

  const ITEMS_PER_PAGE = 20;
  const totalPages = Math.ceil(restaurants.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`https://api-croustillant.bayfield.dev/v1/restaurants`);
        const data = await response.json();
        
        if (data.success) {
          setRestaurants(data.data);
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

  const filteredRestaurants = restaurants.filter(restaurant =>
    (restaurant.nom?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (restaurant.adresse?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  const paginatedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleReset = () => {
    setSearchQuery('');
    setCurrentPage(1);
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
          <FilterButton title={t('restaurants.filters')} icon="slider.horizontal.3" onPress={() => {}} />
          <FilterButton
            title={t('restaurants.nearby')}
            icon="location"
            onPress={() => {}}
          />
          <FilterButton
            title={t('restaurants.show_map')}
            icon="map"
            onPress={() => {}}
          />
          <ResetButton onPress={handleReset} />
        </View>

        <View style={styles.restaurantList}>
          {paginatedRestaurants.map((restaurant) => (
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
            />
          ))}
        </View>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
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
});
