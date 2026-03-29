import { useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { calculateDistance } from '@/utils/restaurantUtils';

export type LocationType = {
  latitude: number;
  longitude: number;
};

export function useLocation() {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const requestLocationPermission = async () => {
    setLoading(true);
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Permission denied');
        Alert.alert(
          t('location.permission_denied'),
          t('location.permission_required'),
          [{ text: 'OK' }]
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      Alert.alert(
        t('location.error'),
        t('location.error_message'),
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    loading,
    error,
    requestLocationPermission,
    calculateDistance,
  };
} 