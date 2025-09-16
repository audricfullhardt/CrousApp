import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/app/components/ui/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';

interface AppHeaderProps {
  title?: string;
}

function AppHeader({ title = 'CROUStillant' }: AppHeaderProps) {
  const theme = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
      <View style={styles.leftSection}>
        <Image
          source={require('@/assets/images/logo.webp')}
          style={styles.logo}
        />
        <ThemedText style={[styles.appName, { color: theme.colors.text }]}>{title}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default AppHeader; 