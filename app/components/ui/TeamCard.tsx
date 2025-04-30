import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';

interface TeamMember {
  name: string;
}

interface TeamCardProps {
  title: string;
  description: string;
  buttonText: string;
  members: TeamMember[];
  onPress: () => void;
}

export default function TeamCard({ title, description, buttonText, members, onPress }: TeamCardProps) {
  const theme = useTheme();

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

      <View style={[styles.membersContainer, {backgroundColor: theme.colors.teamCard.membersCard.background}]} >
        <View style={[styles.membersInnerContainer, { 
          backgroundColor: theme.colors.teamCard.membersCard.background,
          borderColor: theme.colors.teamCard.membersCard.border,
          borderWidth: 1,
        }]}>
          <ThemedText style={[styles.membersTitle, { color: theme.colors.teamCard.membersCard.text }]}>
            Membres de l'équipe
          </ThemedText>
          {members.map((member, index) => (
            <View key={index} style={styles.memberRow}>
              <View style={[styles.bullet, { backgroundColor: theme.colors.teamCard.membersCard.dot }]} />
              <ThemedText style={[styles.memberName, { color: theme.colors.teamCard.membersCard.text }]}>
                {member.name}
              </ThemedText>
            </View>
          ))}
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
  membersContainer: {
    marginTop: 16,
    borderRadius: 12,
    padding: 10,
  },
  membersInnerContainer: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  membersTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '400',
  },
}); 