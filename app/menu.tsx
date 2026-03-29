import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, CreditCard, Heart, ArrowLeft } from 'lucide-react-native';

import { ThemedText } from '@/app/components/ui/ThemedText';
import MealSection from '@/app/components/menu/MealSection';
import OpeningHoursTable from '@/app/components/menu/OpeningHoursTable';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTheme } from '@/contexts/ThemeContext';
import { useFavoriteToggle } from '@/hooks/useFavoriteToggle';
import { api, Restaurant, MenuResponse } from '@/constants/api';
import { checkIfRestaurantOpen, formatDateForAPI } from '@/utils/restaurantUtils';
import { trackPageView } from '@/utils/umami';

export default function MenuScreen() {
  const { restaurantId } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { isFavorite, toggleFavorite } = useFavoriteToggle();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuData, setMenuData] = useState<MenuResponse | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [collapsedRepas, setCollapsedRepas] = useState<Set<number>>(new Set());

  useEffect(() => {
    trackPageView('Menus', '/menu');
  }, []);

  const fetchMenuData = useCallback(async (formattedDate: string) => {
    try {
      const data = await api.getRestaurantMenu(restaurantId as string, formattedDate);
      setMenuData(data);
    } catch {
      setMenuData(null);
    }
  }, [restaurantId]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await api.getRestaurant(restaurantId as string);
        const formattedDate = formatDateForAPI(new Date());

        if (response.success) {
          setRestaurant(response.data);
          setIsOpen(checkIfRestaurantOpen(response.data));
          await fetchMenuData(formattedDate);
        }
      } catch {
        // Network error handled silently
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId, fetchMenuData]);

  useEffect(() => {
    if (menuData?.data.repas) {
      setCollapsedRepas(new Set(menuData.data.repas.map((r) => r.code)));
    }
  }, [menuData]);

  const toggleRepasCollapse = useCallback((repasCode: number) => {
    setCollapsedRepas((prev) => {
      const next = new Set(prev);
      if (next.has(repasCode)) {
        next.delete(repasCode);
      } else {
        next.add(repasCode);
      }
      return next;
    });
  }, []);

  const isCafeteria = restaurant?.type?.libelle === 'Cafeteria';

  if (loading || !restaurant) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: theme.colors.surfaceVariant }]}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <ThemedText style={[styles.title, { color: theme.colors.text }]}>
              {restaurant.nom}
            </ThemedText>
            {restaurant.type && (
              <ThemedText style={[styles.typeLabel, { color: theme.colors.primary }]}>
                {restaurant.type.libelle}
              </ThemedText>
            )}
          </View>
          <TouchableOpacity onPress={() => toggleFavorite(restaurant)}>
            {isFavorite(restaurant.code.toString()) ? (
              <Heart size={24} color={colors.tint} />
            ) : (
              <Heart size={24} color={theme.colors.text} />
            )}
          </TouchableOpacity>
        </View>

        {/* Menu content */}
        {!menuData?.data.repas ? (
          <View style={[styles.emptyMessage, { backgroundColor: theme.colors.surface, borderLeftColor: theme.colors.error }]}>
            <ThemedText style={[styles.emptyTitle, { color: theme.colors.text }]}>
              Aucun plat disponible pour ce restaurant
            </ThemedText>
            <ThemedText style={[styles.emptyText, { color: theme.colors.text }]}>
              Le restaurant ne propose actuellement aucun plat. Veuillez réessayer plus tard.
            </ThemedText>
            <ThemedText style={[styles.emptyNote, { color: theme.colors.text }]}>
              Le menu doit être manuellement mis à jour par le restaurant. Si le menu n'est jamais
              disponible, vous pouvez contacter le restaurant pour leur faire part de votre problème.
            </ThemedText>
          </View>
        ) : (
          <View style={styles.menuContainer}>
            {menuData.data.repas.map((repas) => (
              <MealSection
                key={repas.code}
                repas={repas}
                isCollapsed={collapsedRepas.has(repas.code)}
                isCafeteria={isCafeteria}
                onToggleCollapse={toggleRepasCollapse}
              />
            ))}
          </View>
        )}

        {/* Opening hours */}
        <OpeningHoursTable restaurant={restaurant} isOpen={isOpen} />

        {/* Address */}
        <View style={styles.addressRow}>
          <MapPin size={20} color={colors.text} />
          <ThemedText style={[styles.address, { color: theme.colors.text }]}>
            {restaurant.adresse}
          </ThemedText>
        </View>

        {/* Payment methods */}
        <View style={styles.paymentRow}>
          {restaurant.paiement?.includes('Carte bancaire') && (
            <TouchableOpacity style={[styles.paymentButton, { backgroundColor: theme.colors.surfaceVariant }]}>
              <CreditCard size={20} color={colors.text} />
            </TouchableOpacity>
          )}
          {restaurant.paiement?.includes('IZLY') && (
            <TouchableOpacity style={[styles.paymentButton, { backgroundColor: theme.colors.surfaceVariant }]}>
              <Image
                source={require('@/assets/images/izly.png')}
                style={styles.izlyIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* CROUS info */}
        <View style={styles.crousRow}>
          <ThemedText style={[styles.crousLabel, { color: theme.colors.text }]}>CROUS: </ThemedText>
          <TouchableOpacity>
            <ThemedText style={[styles.crousLink, { color: theme.colors.link }]}>
              {restaurant.zone}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 150 : 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 12,
    marginRight: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  headerTitle: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  menuContainer: {
    marginBottom: 20,
  },
  emptyMessage: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    marginBottom: 8,
  },
  emptyNote: {
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  address: {
    fontSize: 16,
  },
  paymentRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  paymentButton: {
    padding: 8,
    borderRadius: 8,
  },
  izlyIcon: {
    width: 20,
    height: 20,
  },
  crousRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  crousLabel: {
    fontSize: 16,
  },
  crousLink: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
