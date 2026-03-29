import { useCallback } from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Restaurant } from '@/constants/api';

export function useFavoriteToggle() {
  const {
    favoriteRestaurants,
    addFavoriteRestaurant,
    removeFavoriteRestaurant,
    isFavorite,
    favoriteRegion,
  } = useFavorites();

  const toggleFavorite = useCallback(
    (restaurant: Restaurant) => {
      const id = restaurant.code.toString();
      if (isFavorite(id)) {
        removeFavoriteRestaurant(id);
      } else {
        addFavoriteRestaurant({
          id,
          name: restaurant.nom,
          city: restaurant.zone,
        });
      }
    },
    [isFavorite, removeFavoriteRestaurant, addFavoriteRestaurant]
  );

  return {
    favoriteRestaurants,
    favoriteRegion,
    isFavorite,
    toggleFavorite,
  };
}
