import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/app/components/ui/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TeamMembers() {
  const theme = useTheme();
  const { t } = useLanguage();

  const members = [
    t('home.Team.Cards.teamDesc.teamMembers.members.paul'),
    t('home.Team.Cards.teamDesc.teamMembers.members.alden'),
    t('home.Team.Cards.teamDesc.teamMembers.members.lucas'),
    t('home.Team.Cards.teamDesc.teamMembers.members.louis'),
    t('home.Team.Cards.teamDesc.teamMembers.members.audric'),
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <ThemedText style={[styles.title, { color: theme.colors.text }]}>
        {t('home.Team.Cards.teamDesc.teamMembers.title')}
      </ThemedText>
      {members.map((member, index) => (
        <View 
          key={index} 
          style={[styles.memberRow, { 
            borderBottomWidth: index < members.length - 1 ? 1 : 0,
            borderBottomColor: theme.colors.border 
          }]}
        >
          <View style={[styles.dot, { backgroundColor: theme.colors.primary }]} />
          <ThemedText style={[styles.memberName, { color: theme.colors.text }]}>
            {member}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  memberName: {
    fontSize: 16,
  },
}); 