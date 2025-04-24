import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FavoriteRestaurant {
  id: string;
  name: string;
  city: string;
}

type FavoritesContextType = {
  favoriteRestaurants: FavoriteRestaurant[];
  favoriteRegion: string;
  addFavoriteRestaurant: (restaurant: FavoriteRestaurant) => Promise<void>;
  removeFavoriteRestaurant: (restaurantId: string) => Promise<void>;
  setFavoriteRegion: (regionId: string) => Promise<void>;
  clearFavorites: () => Promise<void>;
  isFavorite: (restaurantId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<FavoriteRestaurant[]>([]);
  const [favoriteRegion, setFavoriteRegionState] = useState<string>('all');

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedRestaurants = await AsyncStorage.getItem('favoriteRestaurants');
        const savedRegion = await AsyncStorage.getItem('favoriteRegion');
        
        if (savedRestaurants) {
          setFavoriteRestaurants(JSON.parse(savedRestaurants));
        }
        if (savedRegion) {
          setFavoriteRegionState(savedRegion);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  const addFavoriteRestaurant = async (restaurant: FavoriteRestaurant) => {
    try {
      const newFavorites = [...favoriteRestaurants, restaurant];
      await AsyncStorage.setItem('favoriteRestaurants', JSON.stringify(newFavorites));
      setFavoriteRestaurants(newFavorites);
    } catch (error) {
      console.error('Error adding favorite restaurant:', error);
    }
  };

  const removeFavoriteRestaurant = async (restaurantId: string) => {
    try {
      const newFavorites = favoriteRestaurants.filter(restaurant => restaurant.id !== restaurantId);
      await AsyncStorage.setItem('favoriteRestaurants', JSON.stringify(newFavorites));
      setFavoriteRestaurants(newFavorites);
    } catch (error) {
      console.error('Error removing favorite restaurant:', error);
    }
  };

  const setFavoriteRegion = async (regionId: string) => {
    try {
      await AsyncStorage.setItem('favoriteRegion', regionId);
      setFavoriteRegionState(regionId);
    } catch (error) {
      console.error('Error setting favorite region:', error);
    }
  };

  const clearFavorites = async () => {
    try {
      await AsyncStorage.multiRemove(['favoriteRestaurants', 'favoriteRegion']);
      setFavoriteRestaurants([]);
      setFavoriteRegionState('all');
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  };

  const isFavorite = (restaurantId: string) => {
    return favoriteRestaurants.some(restaurant => restaurant.id === restaurantId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteRestaurants,
        favoriteRegion,
        addFavoriteRestaurant,
        removeFavoriteRestaurant,
        setFavoriteRegion,
        clearFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 