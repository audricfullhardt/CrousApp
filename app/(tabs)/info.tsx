import { StyleSheet, View, ScrollView, Linking } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import AppHeader from "../components/ui/AppHeader";
import { SafeAreaView } from "react-native";
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { GraduationCap, Flame, Code } from 'lucide-react-native';

export default function InfoScreen() {
  const theme = useTheme();
  const { t } = useLanguage();

  const handleGithubPress = () => {
    Linking.openURL("https://github.com/CROUStillant-Developpement/CROUStillantWeb/tree/main/public");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader />
      <ScrollView style={[styles.scrollView, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.section, { 
          backgroundColor: theme.colors.surface,
          shadowColor: theme.colors.text,
        }]}>
          <View style={styles.titleContainer}>
            <GraduationCap size={24} color={theme.colors.text} />
            <ThemedText style={[styles.title, { color: theme.colors.text }]}>
              {t('info.education.title')}
            </ThemedText>
          </View>
          <ThemedText style={[styles.description, { color: theme.colors.text }]}>
            {t('info.students_desc')}
          </ThemedText>
        </View>

        <View style={[styles.section, { 
          backgroundColor: theme.colors.surface,
          shadowColor: theme.colors.text,
        }]}>
          <View style={styles.titleContainer}>
            <Flame size={24} color={theme.colors.text} />
            <ThemedText style={[styles.title, { color: theme.colors.text }]}>
              {t('info.passion.title')}
            </ThemedText>
          </View>
          <ThemedText style={[styles.description, { color: theme.colors.text }]}>
            {t('info.hot_meals_desc')}
          </ThemedText>
        </View>

        <View style={[styles.section, { 
          backgroundColor: theme.colors.surface,
          shadowColor: theme.colors.text,
        }]}>
          <View style={styles.titleContainer}>
            <Code size={24} color={theme.colors.text} />
            <ThemedText style={[styles.title, { color: theme.colors.text }]}>
              {t('info.tech.title')}
            </ThemedText>
          </View>
          <ThemedText style={[styles.description, { color: theme.colors.text }]}>
            {t('info.open_source_desc')}
          </ThemedText>
          <ThemedText
            style={[styles.link, { color: theme.colors.link }]}
            onPress={handleGithubPress}
          >
            {t('info.view_github')}
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 32,
    borderRadius: 12,
    padding: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  link: {
    marginTop: 12,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
