import { StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

function SearchBar({ placeholder, value, onChangeText }: SearchBarProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.colors.surfaceVariant,
      borderColor: theme.colors.border,
    }]}>
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
  },
  input: {
    fontSize: 16,
    padding: 4,
  },
});

export default SearchBar; 