import { Image, StyleSheet, TouchableOpacity, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Utensils, MapPin, CreditCard } from 'lucide-react-native';

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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.placeholderImage, { backgroundColor: theme.colors.surfaceVariant }]}>
            <View style={styles.iconContainer}>
              <Utensils size={48} color={theme.colors.text} />
            </View>
          </View>
        )}
        <TouchableOpacity
          style={[styles.favoriteButton, { backgroundColor: theme.colors.surface }]}
          onPress={onPressFavorite}
        >
          <IconSymbol
            name={isFavorite ? "heart.fill" : "heart"}
            size={24}
            color={isFavorite ? theme.colors.primary : theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <ThemedText style={[styles.name, { color: theme.colors.text }]}>{name}</ThemedText>
            <ThemedText style={[styles.city, { color: theme.colors.text }]}>{city}</ThemedText>
          </View>
          <View style={[styles.status, { backgroundColor: isOpen ? theme.colors.success : theme.colors.error }]}>
            <ThemedText style={[styles.statusText, { color: theme.colors.surface }]}>
              {isOpen ? t('restaurants.open') : t('restaurants.closed')}
            </ThemedText>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.locationContainer}>
            <MapPin size={20} color={theme.colors.text} />
            <ThemedText style={[styles.location, { color: theme.colors.text }]}>
              {location}
            </ThemedText>
          </View>

          <View style={styles.paymentContainer}>
            <CreditCard size={20} color={theme.colors.text} />
            <ThemedText style={[styles.payment, { color: theme.colors.text }]}>
              {payment}
            </ThemedText>
          </View>
        </View>

        <View style={styles.actions}>
          {isCreditCard && (
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.colors.surfaceVariant }]}>
              <IconSymbol name="creditcard" size={20} color={theme.colors.text} />
            </TouchableOpacity>
          )}
          {isIzly && (
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Image 
              source={require('@/assets/images/izly.png')} 
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.menuButton, { backgroundColor: theme.colors.primary }]}
            onPress={onPressMenu}
          >
            <ThemedText style={[styles.menuButtonText, { color: theme.colors.surface }]}>
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
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
});

export default RestaurantCard; 