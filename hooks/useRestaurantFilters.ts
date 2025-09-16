import { useState, useCallback, useMemo } from 'react';
import { Restaurant } from '@/constants/api';
import { 
  filterRestaurantsBySearch, 
  sortRestaurantsAlphabetically, 
  sortRestaurantsByCity,
  filterRestaurantsByPayment,
  filterOpenRestaurants,
  filterAccessibleRestaurants
} from '@/utils/restaurantUtils';

export interface FilterState {
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
      
      // Désactiver les filtres opposés
      const oppositeFilters: Partial<Record<keyof FilterState, keyof FilterState>> = {
        alphabeticalOrder: 'reverseAlphabeticalOrder',
        reverseAlphabeticalOrder: 'alphabeticalOrder',
        cityAlphabeticalOrder: 'cityReverseAlphabeticalOrder',
        cityReverseAlphabeticalOrder: 'cityAlphabeticalOrder',
      };
      
      const oppositeKey = oppositeFilters[filterKey];
      if (oppositeKey && newFilters[oppositeKey].value) {
        newFilters[oppositeKey] = { 
          ...newFilters[oppositeKey], 
          value: false 
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

  const applyFilters = useCallback((restaurants: Restaurant[], searchQuery: string) => {
    let filtered = filterRestaurantsBySearch(restaurants, searchQuery);

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
      filtered = filterRestaurantsByPayment(filtered, filters.cardPayment.value, filters.izlyPayment.value);
    }

    // Filtre par statut d'ouverture
    if (filters.openNow.value) {
      filtered = filterOpenRestaurants(filtered);
    }

    // Filtre d'accessibilité
    if (filters.accessible.value) {
      filtered = filterAccessibleRestaurants(filtered);
    }

    return filtered;
  }, [filters]);

  return {
    filters,
    toggleFilter,
    resetFilters,
    applyFilters,
  };
};
