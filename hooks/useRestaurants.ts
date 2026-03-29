import { useState, useEffect } from 'react';
import { api, Restaurant } from '@/constants/api';

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.getRestaurants();
        if (response.success) {
          setRestaurants(response.data);
        } else {
          console.error('API Error:', response);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return { restaurants, loading };
}
