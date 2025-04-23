import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title = 'CROUStillant' }: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <Image
        source={require('@/assets/images/logo.webp')}
        style={styles.logo}
      />
      <ThemedText style={styles.appName}>{title}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 