import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { LucideIcon } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface FilterButtonProps {
  title: string;
  icon: LucideIcon;
  onPress: () => void;
  isActive?: boolean;
}

export default function FilterButton({ title, icon: Icon, onPress, isActive = false }: FilterButtonProps) {
  const theme = useTheme();
  const backgroundColor = theme.colors.background
  const borderColor = theme.colors.text
  const textColor = theme.colors.text

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: backgroundColor, borderColor: borderColor },
      ]}
      onPress={onPress}
    >
      <Icon size={16} color={textColor} />
      <ThemedText style={[styles.text, { color: textColor }]}>{title}</ThemedText>
    </TouchableOpacity>
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
    fontWeight: '500',
  },
}); 