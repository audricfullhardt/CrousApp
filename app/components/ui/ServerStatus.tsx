import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServerStatusProps {
  title: string;
  description: string;
  buttonText: string;
  onPress: () => void;
}

export default function ServerStatus({ title, description, buttonText, onPress }: ServerStatusProps) {
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.mainContent}>
        <ThemedText style={[styles.title, { color: theme.colors.cardsTitle }]}>
          {title}
        </ThemedText>
        <ThemedText style={[styles.description, { color: theme.colors.text }]}>
          {description}
        </ThemedText>
        <ThemedText 
          onPress={onPress}
          style={[styles.button, { color: theme.colors.text }]}
        >
          {buttonText}
        </ThemedText>
      </View>
      <View style={[styles.serverContainer, {backgroundColor: theme.colors.teamCard.membersCard.background}]} >
        <View style={[styles.serverInnerContainer, { 
          backgroundColor: theme.colors.teamCard.membersCard.background,
          borderColor: theme.colors.teamCard.membersCard.border,
          borderWidth: 1,
        }]}>
          <View style={styles.serverTitleRow}>
            <ThemedText style={[styles.serverTitle, { color: theme.colors.teamCard.membersCard.text }]}>
              Serveur
            </ThemedText>
            <View style={[styles.statusDot, { backgroundColor: theme.colors.success }]} />
          </View>

          <View style={[styles.serverUrlRow, { borderColor: theme.colors.teamCard.membersCard.border }]}>
            <ThemedText style={[styles.serverUrl, { color: theme.colors.teamCard.membersCard.text }]}>
              {t('home.Team.Cards.cicd.server.link')}
            </ThemedText>
          </View>
          
          <View style={[styles.serverStatusRow, { borderColor: theme.colors.teamCard.membersCard.border }]}>
            <ThemedText style={[styles.serverStatus, { color: theme.colors.teamCard.membersCard.text }]}>
              {t('home.Team.Cards.cicd.server.server_desc')}
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    width: '100%',
    overflow: 'hidden',
  },
  mainContent: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  serverContainer: {
    borderRadius: 12,
    padding: 10,
  },
  serverInnerContainer: {
    borderRadius: 12,
    padding: 20,
  },
  serverTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  serverTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  serverUrlRow: {
    borderTopWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  serverUrl: {
    fontSize: 14,
  },
  serverStatusRow: {
    borderTopWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  serverStatus: {
    fontSize: 14,
    color: '#666666',
  },
}); 