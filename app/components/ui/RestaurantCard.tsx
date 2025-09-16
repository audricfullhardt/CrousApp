import React, { useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Utensils, MapPin, CreditCard, Heart } from 'lucide-react-native';

import { ThemedText } from '@/app/components/ui/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export interface RestaurantCardProps {
  imageUrl: string | null;
  name: string;
  city: string;
  isOpen: boolean;
  onPressMenu: () => void;
  onPressFavorite: () => void;
  isFavorite?: boolean;
  isIzly?: boolean;
  isCreditCard?: boolean;
  location: string;
  payment: string;
}

function RestaurantCard({
  imageUrl,
  name,
  city,
  isOpen,
  onPressMenu,
  onPressFavorite,
  isFavorite = false,
  isIzly = false,
  isCreditCard = false,
  location,
  payment,
}: RestaurantCardProps) {
  const theme = useTheme();
  const { t } = useLanguage();

  // Optimisation des styles avec useMemo
  const cardStyles = useMemo(() => ({
    container: [styles.container, { backgroundColor: theme.colors.surface }],
    favoriteButton: [styles.favoriteButton, { backgroundColor: theme.colors.surface }],
    status: [styles.status, { backgroundColor: isOpen ? theme.colors.success : theme.colors.error }],
    iconButton: [styles.iconButton, { backgroundColor: theme.colors.surfaceVariant }],
    menuButton: [styles.menuButton, { backgroundColor: theme.colors.primary }],
    name: [styles.name, { color: theme.colors.text }],
    city: [styles.city, { color: theme.colors.text }],
    statusText: [styles.statusText, { color: theme.colors.surface }],
    menuButtonText: [styles.menuButtonText, { color: theme.colors.surface }],
  }), [theme.colors, isOpen]);

  // Image source optimisée
  const imageSource = useMemo(() => {
    return imageUrl 
      ? { uri: imageUrl } 
      : require('@/assets/images/default_ru.png');
  }, [imageUrl]);

  return (
    <View style={cardStyles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
        <TouchableOpacity
          style={cardStyles.favoriteButton}
          onPress={onPressFavorite}
        >
          <Heart
            size={24}
            color={isFavorite ? theme.colors.primary : theme.colors.text}
            fill={isFavorite ? theme.colors.primary : 'none'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <ThemedText style={cardStyles.name} numberOfLines={2}>
              {name}
            </ThemedText>
            <ThemedText style={cardStyles.city} numberOfLines={1}>
              {city}
            </ThemedText>
          </View>
          <View style={cardStyles.status}>
            <ThemedText style={cardStyles.statusText}>
              {isOpen ? t('restaurants.open') : t('restaurants.closed')}
            </ThemedText>
          </View>
        </View>

        <View style={styles.actions}>
          {isCreditCard && (
            <TouchableOpacity style={cardStyles.iconButton}>
              <CreditCard size={20} color={theme.colors.text} />
            </TouchableOpacity>
          )}
          {isIzly && (
            <TouchableOpacity style={cardStyles.iconButton}>
              <Image 
                source={require('@/assets/images/izly.png')} 
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={cardStyles.menuButton}
            onPress={onPressMenu}
          >
            <ThemedText style={cardStyles.menuButtonText}>
              {t('restaurants.view_menu')}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 8,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  city: {
    fontSize: 18,
    opacity: 0.7,
  },
  location: {
    fontSize: 14,
    opacity: 0.7,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  menuButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  payment: {
    fontSize: 14,
    opacity: 0.7,
  },
});

export default RestaurantCard; 