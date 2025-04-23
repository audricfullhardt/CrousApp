import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/ui/Button';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface RestaurantCardProps {
  imageUrl: string;
  city: string;
  isOpen: boolean;
  onPressMenu: () => void;
}

export function RestaurantCard({ imageUrl, city, isOpen, onPressMenu }: RestaurantCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText style={styles.city}>{city}</ThemedText>
          <View style={[styles.status, { backgroundColor: isOpen ? '#4CAF50' : '#F44336' }]}>
            <ThemedText style={styles.statusText}>
              {isOpen ? 'Ouvert' : 'Fermé'}
            </ThemedText>
          </View>
        </View>
        <Button
          title="Voir le menu"
          size="medium"
          color={colors.tint}
          textColor={colors.background}
          onPress={onPressMenu}
          icon="arrow.right"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
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
    alignItems: 'center',
    marginBottom: 16,
  },
  city: {
    fontSize: 18,
    fontWeight: 'bold',
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
});
