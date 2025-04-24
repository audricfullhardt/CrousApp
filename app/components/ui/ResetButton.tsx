import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResetButtonProps {
  onPress: () => void;
}

function ResetButton({ onPress }: ResetButtonProps) {
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <TouchableOpacity
      style={[styles.container, { 
        borderColor: theme.colors.text,
        backgroundColor: theme.colors.surfaceVariant 
      }]}
      onPress={onPress}
    >
      <IconSymbol name="arrow.counterclockwise" size={16} color={theme.colors.text} />
      <ThemedText style={[styles.text, { color: theme.colors.text }]}>{t('restaurants.reset')}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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