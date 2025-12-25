import { StyleSheet, View, ScrollView, Linking, Platform } from "react-native";
import { ThemedText } from "@/app/components/ui/ThemedText";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Button from "@/app/components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppHeader from "../components/ui/AppHeader";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import InfoCard from "../components/ui/InfoCard";
import ServerStatus from "../components/ui/ServerStatus";
import {
  ArrowRight,
  MapPin,
  Clock,
  CreditCard,
  HeartHandshake,
  UtensilsCrossed,
} from "lucide-react-native";
import TeamCard from "../components/ui/TeamCard";
import StudentProjectCard from "../components/ui/StudentProjectCard";
import { Config } from "@/constants/Config";
import TrackedButton from "../components/TrackedButton";
import { trackPageView } from "@/utils/umami";
import { useEffect } from "react";

type RootStackParamList = {
  restaurants: undefined;
  info: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const theme = useTheme();
  const { t } = useLanguage();
  const navigation = useNavigation<NavigationProp>();

  const navigateToRestaurants = () => navigation.navigate("restaurants");
  const navigateToInfo = () => navigation.navigate("info");
  const navigateToGitHub = () => Linking.openURL(Config.EXTERNAL.GITHUB_REPO);
  const navigateToServer = () => Linking.openURL(Config.API.BASE_URL);

  useEffect(() => {
    trackPageView("Home", "/home");
  }, []);

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppHeader />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.openSource}>
          <ThemedText
            style={[
              styles.openSourceText,
              {
                color: theme.colors.text,
                backgroundColor: theme.colors.openSource,
                borderColor: theme.colors.openSourceBorder,
              },
            ]}
          >
            {t("HomePage.badge.title")}
            <ArrowRight size={14} color={theme.colors.text} />
          </ThemedText>
        </View>

        <View style={styles.content}>
          <ThemedText style={[styles.title, { color: theme.colors.text }]}>
            {t("HomePage.title.first")}
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: theme.colors.text }]}>
            {t("HomePage.subtitle")}
          </ThemedText>

          <View style={styles.buttonsContainer}>
            <TrackedButton
              title={t("HomePage.cta.first")}
              size="large"
              color={theme.colors.primary}
              textColor={theme.colors.surface}
              onPress={navigateToRestaurants}
              icon={<ArrowRight />}
              path="/restaurants"
            />
          </View>

          <View style={styles.section}>
            <ThemedText
              style={[styles.sectionTitle, { color: theme.colors.text }]}
            >
              {t("HomePage.title.second")}
            </ThemedText>

            <InfoCard
              title={t("HomePage.card1.title")}
              description={t("HomePage.card1.description")}
              buttonText={t("HomePage.card1.cta")}
              onPress={navigateToInfo}
              icon={
                <MapPin size={130} color={theme.colors.text} strokeWidth={2} />
              }
            />
            <InfoCard
              title={t("HomePage.card2.title")}
              description={t("HomePage.card2.description")}
              buttonText={t("HomePage.card2.cta")}
              onPress={navigateToInfo}
              icon={
                <Clock size={130} color={theme.colors.text} strokeWidth={2} />
              }
            />
            <InfoCard
              title={t("HomePage.card3.title")}
              description={t("HomePage.card3.description")}
              buttonText={t("HomePage.card3.cta")}
              onPress={navigateToInfo}
              icon={
                <CreditCard
                  size={130}
                  color={theme.colors.text}
                  strokeWidth={2}
                />
              }
            />
            <InfoCard
              title={t("HomePage.card4.title")}
              description={t("HomePage.card4.description")}
              buttonText={t("HomePage.card4.cta")}
              onPress={navigateToInfo}
              icon={
                <UtensilsCrossed
                  size={130}
                  color={theme.colors.text}
                  strokeWidth={2}
                />
              }
            />
          </View>

          <View style={styles.section}>
            <ThemedText
              style={[styles.sectionTitle, { color: theme.colors.text }]}
            >
              {t("HomePage.title.third")}
            </ThemedText>

            <StudentProjectCard
              title={t("HomeCard.RadarsCard.title")}
              description={t("HomeCard.RadarsCard.subtitle")}
              buttonText={t("HomeCard.RadarsCard.cta")}
              onPress={navigateToGitHub}
            />

            <TeamCard
              title={t("HomeCard.GitCard.title")}
              description={t("HomeCard.GitCard.subtitle")}
              buttonText={t("HomeCard.GitCard.cta")}
              members={[
                { name: t("AboutPage.team.members.member1.name") },
                { name: t("AboutPage.team.members.member2.name") },
                { name: t("AboutPage.team.members.member3.name") },
                { name: t("AboutPage.team.members.member4.name") },
                { name: t("AboutPage.team.members.member5.name") },
              ]}
              onPress={navigateToGitHub}
            />

            <ServerStatus
              title={t("HomeCard.ApiCard.Card.title")}
              description={t("HomeCard.ApiCard.subtitle")}
              buttonText={t("HomeCard.ApiCard.cta")}
              onPress={navigateToServer}
            />

            <View
              style={[
                styles.convincedCard,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <View
                style={[
                  styles.convincedCardLogo,
                  { backgroundColor: theme.colors.convincedCard.background },
                ]}
              >
                <HeartHandshake
                  size={80}
                  color={theme.colors.convincedCard.text}
                />
              </View>
              <ThemedText
                style={[styles.convincedTitle, { color: theme.colors.text }]}
              >
                {t("HomePage.footer.title")}
              </ThemedText>
              <ThemedText
                style={[styles.convincedDesc, { color: theme.colors.text }]}
              >
                {t("HomePage.footer.subtitle")}
              </ThemedText>
              <TrackedButton
                title={t("HomePage.cta.first")}
                size="large"
                color={theme.colors.primary}
                textColor={theme.colors.surface}
                onPress={navigateToRestaurants}
                path="/restaurants"
              />
            </View>
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
  },
  // scrollViewContent: {
  //   paddingBottom: Platform.OS === "ios" ? 100 : 5,
  // },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    marginHorizontal: "auto",
    marginTop: 20,
    lineHeight: 40,
    width: "80%",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 32,
    marginHorizontal: 20,
  },
  buttonsContainer: {
    margin: "auto",
    width: "80%",
    gap: 16,
    marginBottom: 40,
  },
  openSource: {
    padding: 20,
    alignItems: "center",
  },
  openSourceText: {
    fontSize: 16,
    paddingHorizontal: 22,
    paddingVertical: 4,
    textAlign: "center",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
  },
  section: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
    width: "100%",
    lineHeight: 36,
  },
  convincedCard: {
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  convincedTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    lineHeight: 32,
  },
  convincedDesc: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  convincedCardLogo: {
    width: 120,
    height: 120,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFD7D7",
    shadowOffset: {
      width: -6,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});
