import { useState, useCallback, useMemo } from 'react';
import { Restaurant } from '@/constants/api';
import { 
  filterRestaurantsBySearch, 
  sortRestaurantsAlphabetically, 
  sortRestaurantsByCity,
  filterRestaurantsByPayment,
  filterOpenRestaurants,
  filterAccessibleRestaurants,
  filterRestaurantsByRegion,
  filterRestaurantsByRegionAll
} from '@/utils/restaurantUtils';

export interface FilterState {
  region: { key: string; value: number | null ; onToggle: () => void };
  regionAll: { key: string; value: boolean; onToggle: () => void };
  alphabeticalOrder: { key: string; value: boolean; onToggle: () => void };
  reverseAlphabeticalOrder: { key: string; value: boolean; onToggle: () => void };
  cityAlphabeticalOrder: { key: string; value: boolean; onToggle: () => void };
  cityReverseAlphabeticalOrder: { key: string; value: boolean; onToggle: () => void };
  cardPayment: { key: string; value: boolean; onToggle: () => void };
  izlyPayment: { key: string; value: boolean; onToggle: () => void };
  openNow: { key: string; value: boolean; onToggle: () => void };
  accessible: { key: string; value: boolean; onToggle: () => void };
}

export const useRestaurantFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    region: { key: 'region', value: null as number | null, onToggle: () => toggleFilter('region') },
    regionAll: { key: 'regionAll', value: false, onToggle: () => toggleFilter('regionAll') },
    alphabeticalOrder: { key: 'alpha', value: false, onToggle: () => toggleFilter('alphabeticalOrder') },
    reverseAlphabeticalOrder: { key: 'reverseAlpha', value: false, onToggle: () => toggleFilter('reverseAlphabeticalOrder') },
    cityAlphabeticalOrder: { key: 'cityAlpha', value: false, onToggle: () => toggleFilter('cityAlphabeticalOrder') },
    cityReverseAlphabeticalOrder: { key: 'cityReverseAlpha', value: false, onToggle: () => toggleFilter('cityReverseAlphabeticalOrder') },
    cardPayment: { key: 'card', value: false, onToggle: () => toggleFilter('cardPayment') },
    izlyPayment: { key: 'izly', value: false, onToggle: () => toggleFilter('izlyPayment') },
    openNow: { key: 'open', value: false, onToggle: () => toggleFilter('openNow') },
    accessible: { key: 'accessible', value: false, onToggle: () => toggleFilter('accessible') },
  });

  const toggleFilter = useCallback((filterKey: keyof FilterState) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      const oppositeFilters: Partial<Record<keyof FilterState, keyof FilterState>> = {
        region: 'region',
        regionAll: 'regionAll',
        alphabeticalOrder: 'reverseAlphabeticalOrder',
        reverseAlphabeticalOrder: 'alphabeticalOrder',
        cityAlphabeticalOrder: 'cityReverseAlphabeticalOrder',
        cityReverseAlphabeticalOrder: 'cityAlphabeticalOrder',
      };
      
      const oppositeKey = oppositeFilters[filterKey];
      if (oppositeKey && newFilters[oppositeKey].value) {
        newFilters[oppositeKey] = { 
          ...newFilters[oppositeKey], 
          value: 0 
        };
      }
      
      // Toggle le filtre actuel
      newFilters[filterKey] = { ...newFilters[filterKey], value: !newFilters[filterKey].value };
      
      return newFilters;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(prev => Object.keys(prev).reduce((acc, key) => ({
      ...acc,
      [key]: { ...prev[key as keyof FilterState], value: false }
    }), prev));
  }, []);

  const applyFilters = useCallback(
    (restaurants: Restaurant[], searchQuery: string, favoriteRegion?: string) => {
      let filtered = filterRestaurantsBySearch(restaurants, searchQuery);
  
      // Filtre par région (priorité à favoriteRegion si présent)
      if (favoriteRegion && favoriteRegion !== 'all') {
        filtered = filterRestaurantsByRegion(filtered, Number(favoriteRegion));
      } else if (filters.region.value) {
        filtered = filterRestaurantsByRegion(filtered, filters.region.value as number);
      }
  
      // Tri alphabétique
      if (filters.alphabeticalOrder.value) {
        filtered = sortRestaurantsAlphabetically(filtered);
      } else if (filters.reverseAlphabeticalOrder.value) {
        filtered = sortRestaurantsAlphabetically(filtered, true);
      }
  
      // Tri par ville
      if (filters.cityAlphabeticalOrder.value) {
        filtered = sortRestaurantsByCity(filtered);
      } else if (filters.cityReverseAlphabeticalOrder.value) {
        filtered = sortRestaurantsByCity(filtered, true);
      }
  
      // Filtres de paiement
      if (filters.cardPayment.value || filters.izlyPayment.value) {
        filtered = filterRestaurantsByPayment(
          filtered,
          filters.cardPayment.value,
          filters.izlyPayment.value
        );
      }
  
      // Filtre ouverture
      if (filters.openNow.value) {
        filtered = filterOpenRestaurants(filtered);
      }
  
      // Filtre accessibilité
      if (filters.accessible.value) {
        filtered = filterAccessibleRestaurants(filtered);
      }
  
      return filtered;
    },
    [filters]
  );
  

  return {
    filters,
    toggleFilter,
    resetFilters,
    applyFilters,
  };
};
