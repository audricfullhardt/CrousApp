import { StyleSheet, Platform, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppHeader from '../components/ui/AppHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

type RootStackParamList = {
  restaurants: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const theme = useTheme();
  const { t } = useLanguage();
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader />
      <View style={styles.openSource}>
        <ThemedText style={[styles.openSourceText, { 
          borderColor: theme.colors.error,
          color: theme.colors.error 
        }]}>
          {t('home.open_source')}
        </ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText style={[styles.title, { color: theme.colors.text }]}>
          {t('app.description')}
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: theme.colors.text }]}>
          {t('app.subtitle')}
        </ThemedText>
        <View style={styles.buttonsContainer}>
          <Button
            title={t('home.discover')}
            size="large"
            color={theme.colors.primary}
            textColor={theme.colors.surface}
            onPress={() => navigation.navigate('restaurants')}
            icon="arrow.right"
          />
          <Button
            title={t('home.view_restaurants')}
            size="large"
            color={theme.colors.surface}
            textColor={theme.colors.text}
            onPress={() => navigation.navigate('restaurants')}
            icon="fork.knife"
            border={theme.colors.text}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonsContainer: {
    width: '80%',
    gap: 16,
  },
  openSource: {
    padding: 20,
    alignItems: 'center',
  },
  openSourceText: {
    fontSize: 12,
    paddingHorizontal: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
});
