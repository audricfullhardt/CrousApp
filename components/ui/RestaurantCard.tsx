import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { IconSymbol } from './IconSymbol';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/contexts/LanguageContext';

interface RestaurantCardProps {
  imageUrl: string;
  name: string;
  city: string;
  distance?: number;
  isOpen: boolean;
  onPressMenu: () => void;
  onPressFavorite: () => void;
  isFavorite: boolean;
  isCreditCard: boolean;
  isIzly: boolean;
}

export default function RestaurantCard({
  imageUrl,
  name,
  city,
  distance,
  isOpen,
  onPressMenu,
  onPressFavorite,
  isFavorite,
  isCreditCard,
  isIzly,
}: RestaurantCardProps) {
  const { t } = useLanguage();

  return (
    <ThemedView style={styles.container}>
      <Image
        source={{ uri: imageUrl || 'https://via.placeholder.com/400x200' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.name}>{name}</ThemedText>
            <View style={styles.locationContainer}>
              <IconSymbol name="mappin" size={14} color="#666" />
              <ThemedText style={styles.city}>{city}</ThemedText>
              {distance !== undefined && (
                <ThemedText style={styles.distance}>
                  {t('location.distance', { distance: distance.toFixed(1) })}
                </ThemedText>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={onPressFavorite} style={styles.favoriteButton}>
            <IconSymbol
              name={isFavorite ? "heart.fill" : "heart"}
              size={24}
              color={isFavorite ? Colors.light.tint : "#666"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: isOpen ? '#4CAF50' : '#F44336' }]} />
            <ThemedText style={styles.status}>
              {isOpen ? t('restaurants.open') : t('restaurants.closed')}
            </ThemedText>
          </View>

          <View style={styles.paymentMethods}>
            {isCreditCard && (
              <IconSymbol name="creditcard" size={20} color="#666" />
            )}
            {isIzly && (
              <Image
                source={require('@/assets/images/izly.png')}
                style={styles.izlyIcon}
                resizeMode="contain"
              />
            )}
          </View>

          <TouchableOpacity style={styles.menuButton} onPress={onPressMenu}>
            <ThemedText style={styles.menuButtonText}>
              {t('restaurants.view_menu')}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  city: {
    fontSize: 14,
    color: '#666',
  },
  distance: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  favoriteButton: {
    padding: 8,
    marginTop: -8,
    marginRight: -8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
  paymentMethods: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  izlyIcon: {
    width: 40,
    height: 20,
  },
  menuButton: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
}); 