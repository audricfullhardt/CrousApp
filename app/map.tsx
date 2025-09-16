import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Pressable } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useRouter, useNavigation } from 'expo-router';
import { ThemedView } from '@/app/components/ui/ThemedView';
import { ThemedText } from '@/app/components/ui/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from '@/hooks/useLocation';
import { Colors } from '@/constants/Colors';
import { ChevronLeft } from 'lucide-react-native';
import { api, Restaurant } from '@/constants/api';

export default function MapScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const navigation = useNavigation();
  const theme = useTheme();
  const { t } = useLanguage();
  const { location, requestLocationPermission } = useLocation();
  const [region, setRegion] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.getRestaurantsForMap();
        
        if (response.success) {
          setRestaurants(response.data);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (location) {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  const handleBackPress = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <ChevronLeft size={24} color={theme.colors.text} />
        </Pressable>
        <ThemedText style={styles.title}>{t('restaurants.map_title')}</ThemedText>
      </View>

      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {restaurants.map((restaurant) => (
          restaurant.latitude && restaurant.longitude ? (
            <Marker
              key={restaurant.code}
              coordinate={{
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
              }}
              pinColor={restaurant.actif ? Colors.light.tint : '#666'}
            >
              <Callout
                onPress={() => {
                  router.push({
                    pathname: '/menu',
                    params: { restaurantId: restaurant.code.toString() }
                  });
                }}
              >
                <View style={styles.callout}>
                  <ThemedText style={styles.calloutTitle}>{restaurant.nom}</ThemedText>
                  <ThemedText style={styles.calloutSubtitle}>{restaurant.zone}</ThemedText>
                  <ThemedText style={styles.calloutStatus}>
                    {restaurant.actif ? t('restaurants.open') : t('restaurants.closed')}
                  </ThemedText>
                  <ThemedText style={styles.calloutAction}>
                    {t('restaurants.view_menu')} →
                  </ThemedText>
                </View>
              </Callout>
            </Marker>
          ) : null
        ))}
      </MapView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  backText: {
    fontSize: 17,
    marginLeft: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  map: {
    flex: 1,
  },
  callout: {
    padding: 8,
    minWidth: 200,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  calloutSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  calloutStatus: {
    fontSize: 14,
    marginBottom: 8,
  },
  calloutAction: {
    fontSize: 14,
    color: Colors.light.tint,
    fontWeight: '600',
  },
}); 