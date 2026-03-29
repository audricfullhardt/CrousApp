import React, { useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CreditCard, Heart } from 'lucide-react-native';

import { ThemedText } from '@/app/components/ui/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export interface RestaurantCardProps {
  imageUrl: string | null;
  name: string;
  city: string;
  isOpen: boolean | undefined;
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
}: RestaurantCardProps) {
  const theme = useTheme();
  const { t } = useLanguage();

  const cardStyles = useMemo(() => ({
    container: [styles.container, { backgroundColor: theme.colors.surface }],
    status: [styles.status, { backgroundColor: isOpen ? theme.colors.success : theme.colors.error }],
    menuButton: [styles.menuButton, { backgroundColor: theme.colors.primary }],
  }), [theme.colors, isOpen]);

  const imageSource = useMemo(() => {
    return imageUrl
      ? { uri: imageUrl }
      : require('@/assets/images/default_ru.png');
  }, [imageUrl]);

  return (
    <TouchableOpacity style={cardStyles.container} onPress={onPressMenu} activeOpacity={0.85}>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.titleBlock}>
            <ThemedText style={[styles.name, { color: theme.colors.text }]} numberOfLines={1}>
              {name}
            </ThemedText>
            <ThemedText style={[styles.city, { color: theme.colors.text }]} numberOfLines={1}>
              {city}
            </ThemedText>
          </View>
          <TouchableOpacity onPress={onPressFavorite} hitSlop={8}>
            <Heart
              size={20}
              color={isFavorite ? theme.colors.primary : theme.colors.text}
              fill={isFavorite ? theme.colors.primary : 'none'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.badges}>
            <View style={cardStyles.status}>
              <ThemedText style={[styles.statusText, { color: theme.colors.surface }]}>
                {isOpen ? t('RestaurantInformation.open') : t('RestaurantInformation.closed')}
              </ThemedText>
            </View>
            {isCreditCard && (
              <View style={[styles.paymentBadge, { backgroundColor: theme.colors.surfaceVariant }]}>
                <CreditCard size={14} color={theme.colors.text} />
              </View>
            )}
            {isIzly && (
              <View style={[styles.paymentBadge, { backgroundColor: theme.colors.surfaceVariant }]}>
                <Image
                  source={require('@/assets/images/izly.png')}
                  style={styles.izlyIcon}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
          <View style={cardStyles.menuButton}>
            <ThemedText style={[styles.menuButtonText, { color: theme.colors.surface }]}>
              {t('RestaurantCard.cta')}
            </ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  titleBlock: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  city: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  paymentBadge: {
    padding: 4,
    borderRadius: 6,
  },
  izlyIcon: {
    width: 14,
    height: 14,
  },
  menuButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  menuButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default RestaurantCard;
