import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { useTheme } from '@/contexts/ThemeContext';

interface FilterButtonProps {
  title: string;
  icon?: IconSymbolName;
  onPress: () => void;
}

function FilterButton({ title, icon, onPress }: FilterButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { 
        borderColor: theme.colors.text,
        backgroundColor: theme.colors.surfaceVariant 
      }]}
      onPress={onPress}
    >
      {icon && (
        <IconSymbol name={icon} size={16} color={theme.colors.text} />
      )}
      <ThemedText style={[styles.text, { color: theme.colors.text }]}>{title}</ThemedText>
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

export default FilterButton; 