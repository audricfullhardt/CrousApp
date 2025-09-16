import { StyleSheet, View, ScrollView, Linking, Platform } from "react-native";
import { ThemedText } from "@/app/components/ui/ThemedText";
import AppHeader from "../components/ui/AppHeader";
import { SafeAreaView } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { GraduationCap, Flame, Code, Check } from "lucide-react-native";
import { Config } from "@/constants/Config";

export default function InfoScreen() {
  const theme = useTheme();
  const { t } = useLanguage();

  const handleGithubPress = () => {
    Linking.openURL(Config.EXTERNAL.GITHUB_WEB_REPO);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppHeader />
      <ScrollView
        style={[
          styles.scrollView,
          { backgroundColor: theme.colors.background },
        ]}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.surface,
              shadowColor: theme.colors.text,
            },
          ]}
        >
          <View style={styles.titleContainer}>
            <GraduationCap size={24} color={theme.colors.text} />
            <ThemedText style={[styles.title, { color: theme.colors.text }]}>
              {t("info.students")}
            </ThemedText>
          </View>
          <ThemedText
            style={[styles.description, { color: theme.colors.text }]}
          >
            {t("info.students_desc")}
          </ThemedText>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.surface,
              shadowColor: theme.colors.text,
            },
          ]}
        >
          <View style={styles.titleContainer}>
            <Flame size={24} color={theme.colors.text} />
            <ThemedText style={[styles.title, { color: theme.colors.text }]}>
              {t("info.hot_meals")}
            </ThemedText>
          </View>
          <ThemedText
            style={[styles.description, { color: theme.colors.text }]}
          >
            {t("info.hot_meals_desc")}
          </ThemedText>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.surface,
              shadowColor: theme.colors.text,
            },
          ]}
        >
          <View style={styles.titleContainer}>
            <Code size={24} color={theme.colors.text} />
            <ThemedText style={[styles.title, { color: theme.colors.text }]}>
              {t("info.open_source")}
            </ThemedText>
          </View>
          <ThemedText
            style={[styles.description, { color: theme.colors.text }]}
          >
            {t("info.open_source_desc")}
          </ThemedText>
          <ThemedText
            style={[styles.link, { color: theme.colors.link }]}
            onPress={handleGithubPress}
          >
            {t("info.view_github")}
          </ThemedText>
        </View>
        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.surface,
              shadowColor: theme.colors.text,
            },
          ]}
        >
          <View style={styles.titleContainer}>
            <ThemedText style={[styles.title, { color: theme.colors.text }]}>
              {t("info.simple_to_use")}
            </ThemedText>
          </View>
          <ThemedText
            style={[styles.description, { color: theme.colors.text }]}
          >
            {t("info.simple_to_use_desc")}
          </ThemedText>
          <View style={styles.checkContainer}>
            <Check size={24} color={theme.colors.text} style={[styles.check, { backgroundColor: theme.colors.success }]} />
            <ThemedText style={[styles.checkText, { color: theme.colors.text }]}>{t("info.access_all_restaurants")}</ThemedText>
          </View>
          <View style={styles.checkContainer}>
            <Check size={24} color={theme.colors.text} style={[styles.check, { backgroundColor: theme.colors.success }]} />
            <ThemedText style={[styles.checkText, { color: theme.colors.text }]}>{t("info.search_by_region")}</ThemedText>
          </View>
          <View style={styles.checkContainer}>
            <Check size={24} color={theme.colors.text} style={[styles.check, { backgroundColor: theme.colors.success }]} />
            <ThemedText style={[styles.checkText, { color: theme.colors.text }]}>{t("info.opening_hours")}</ThemedText>
          </View>
          <View style={styles.checkContainer}>
            <Check size={24} color={theme.colors.text} style={[styles.check, { backgroundColor: theme.colors.success }]} />
            <ThemedText style={[styles.checkText, { color: theme.colors.text }]}>{t("info.contacts_and_payment")}</ThemedText>
          </View>

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
  scrollViewContent: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 5, // Espace pour la tab bar
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
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  check: {
    marginTop: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
