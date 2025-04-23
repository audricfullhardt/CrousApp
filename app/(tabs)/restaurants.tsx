import { StyleSheet, View, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { RestaurantCard } from '@/components/ui/RestaurantCard';
import { AppHeader } from '@/components/ui/AppHeader';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  menu: { restaurantId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Region {
  code: number;
  libelle: string;
  adresse: string;
}

export default function RestaurantsScreen() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchAllRegions = async () => {
      const allRegions: Region[] = [];
      
      for (let i = 1; i <= 100; i++) {
        try {
          const response = await fetch(`https://api-croustillant.bayfield.dev/v1/regions/${i}`);
          const data = await response.json();
          
          if (data.success) {
            allRegions.push(data.data);
          }
        } catch (error) {
          console.error(`Error fetching region ${i}:`, error);
        }
      }
      
      setRegions(allRegions);
      setLoading(false);
    };

    fetchAllRegions();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <ScrollView style={styles.content}>
        {regions.map((region) => (
          <RestaurantCard
            key={region.code}
            imageUrl="https://example.com/restaurant.jpg"
            city={region.libelle}
            isOpen={true}
            onPressMenu={() => navigation.navigate('menu', { restaurantId: region.code.toString() })}
          />
        ))}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
