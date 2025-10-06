import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/app/components/ui/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import packageJson from '../../../package.json';

interface AppHeaderProps {
  title?: string;
}

function AppHeader({ title = 'CROUStillant' }: AppHeaderProps) {
  const theme = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
      <View style={styles.centeredContent}>
        <Image
          source={require('@/assets/images/logo.webp')}
          style={styles.logo}
        />
        <ThemedText style={[styles.appName, { color: theme.colors.text }]}>{title}</ThemedText>
        <View style={styles.versionContainer}>
          <ThemedText style={styles.versionText}>
            v{packageJson.version}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  centeredContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  versionContainer: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 16,
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default AppHeader; 