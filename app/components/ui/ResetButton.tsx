import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { RotateCcw } from 'lucide-react-native';

interface ResetButtonProps {
  onPress: () => void;
}

function ResetButton({ onPress }: ResetButtonProps) {
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <RotateCcw size={16} color={theme.colors.text} />
      <ThemedText style={[styles.text, { color: theme.colors.text }]}>
        {t('reset')}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  text: {
    fontSize: 14,
  },
});

export default ResetButton; 