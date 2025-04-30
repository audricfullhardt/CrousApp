import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppHeader from '../components/ui/AppHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import InfoCard from '../components/ui/InfoCard';
import ServerStatus from '../components/ui/ServerStatus';
import { ArrowRight, MapPin, Clock, CreditCard, HeartHandshake, UtensilsCrossed } from 'lucide-react-native';
import TeamCard from '../components/ui/TeamCard';

type RootStackParamList = {
  restaurants: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const theme = useTheme();
  const { t } = useLanguage();
  const navigation = useNavigation<NavigationProp>();

  const navigateToRestaurants = () => navigation.navigate('restaurants');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.openSource}>
          <ThemedText style={[styles.openSourceText, { 
            color: theme.colors.text,
            backgroundColor: theme.colors.openSource,
            borderColor: theme.colors.openSourceBorder,
          }]}>
            {t('home.open_source')}
            <ArrowRight size={14} color={theme.colors.text}/>
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
              onPress={navigateToRestaurants}
              icon={<ArrowRight />}
            />
          </View>

          <View style={styles.section}>
            <ThemedText style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {t('home.Cards.title')}
            </ThemedText>

            <InfoCard
              title={t('home.Cards.searchCard.title')}
              description={t('home.Cards.searchCard.desc')}
              buttonText={t('home.Cards.searchCard.button')}
              onPress={navigateToRestaurants}
              icon={<MapPin size={130} color={theme.colors.text} strokeWidth={2} />}
            />
            <InfoCard
              title={t('home.Cards.hoursCard.title')}
              description={t('home.Cards.hoursCard.desc')}
              buttonText={t('home.Cards.hoursCard.button')}
              onPress={navigateToRestaurants}
              icon={<Clock size={130} color={theme.colors.text} strokeWidth={2} />}
            />
            <InfoCard
              title={t('home.Cards.paymentCard.title')}
              description={t('home.Cards.paymentCard.desc')}
              buttonText={t('home.Cards.paymentCard.button')}
              onPress={navigateToRestaurants}
              icon={<CreditCard size={130} color={theme.colors.text} strokeWidth={2} />}
            />
            <InfoCard
              title={t('home.Cards.accessCard.title')}
              description={t('home.Cards.accessCard.desc')}
              buttonText={t('home.Cards.accessCard.button')}
              onPress={navigateToRestaurants}
              icon={<UtensilsCrossed size={130} color={theme.colors.text} strokeWidth={2} />}
            />
          </View>

          <View style={styles.section}>
            <ThemedText style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {t('home.Team.title')}
            </ThemedText>

            <TeamCard
              title={t('home.Team.Cards.projectDesc.title')}
              description={t('home.Team.Cards.projectDesc.desc')}
              buttonText={t('home.Team.Cards.projectDesc.button')}
              members={[
                { name: 'Paul Bayfield' },
                { name: 'Alden Cherif' },
                { name: 'Lucas Debeve' },
                { name: 'Louis Descotes' }
              ]}
              onPress={navigateToRestaurants}
            />

            <TeamCard
              title={t('home.Team.Cards.teamDesc.title')}
              description={t('home.Team.Cards.teamDesc.desc')}
              buttonText={t('home.Team.Cards.teamDesc.button')}
              members={[
                { name: t('home.Team.Cards.teamDesc.teamMembers.members.paul') },
                { name: t('home.Team.Cards.teamDesc.teamMembers.members.alden') },
                { name: t('home.Team.Cards.teamDesc.teamMembers.members.lucas') },
                { name: t('home.Team.Cards.teamDesc.teamMembers.members.louis') }
              ]}
              onPress={navigateToRestaurants}
            />

            <ServerStatus 
              title={t('home.Team.Cards.cicd.server.title')}
              description={t('home.Team.Cards.cicd.desc')}
              buttonText={t('home.Team.Cards.cicd.server.link')}
              onPress={navigateToRestaurants}
            />

            <View style={[styles.convincedCard, { backgroundColor: theme.colors.surface }]}>
                <View style={[styles.convincedCardLogo, { backgroundColor: theme.colors.convincedCard.background }]}>
                  <HeartHandshake size={80} color={theme.colors.convincedCard.text}/>
                </View>
              <ThemedText style={[styles.convincedTitle, { color: theme.colors.text }]}>
                {t('home.Team.Cards.convinced.title')}
              </ThemedText>
              <ThemedText style={[styles.convincedDesc, { color: theme.colors.text }]}>
                {t('home.Team.Cards.convinced.desc')}
              </ThemedText>
              <Button
                title={t('home.Team.Cards.convinced.button')}
                size="large"
                color={theme.colors.primary}
                textColor={theme.colors.surface}
                onPress={navigateToRestaurants}
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    marginHorizontal: 'auto',
    marginTop: 20,
    lineHeight: 40,
    width: '80%',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    marginHorizontal: 20,
  },
  buttonsContainer: {
    margin: 'auto',
    width: '80%',
    gap: 16,
    marginBottom: 40,
  },
  openSource: {
    padding: 20,
    alignItems: 'center',
  },
  openSourceText: {
    fontSize: 16,
    paddingHorizontal: 22,
    paddingVertical: 4,
    textAlign: 'center',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
  },
  section: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    width: '100%',
    lineHeight: 36,
  },
  convincedCard: {
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  convincedTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 32,
  },
  convincedDesc: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  convincedCardLogo: {
    width: 120,
    height: 120,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD7D7',
    shadowOffset: {
      width: -6,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});
