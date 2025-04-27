import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface FilterButtonProps {
  title: string;
  icon: string;
  onPress: () => void;
  isActive?: boolean;
}

export default function FilterButton({ title, icon, onPress, isActive = false }: FilterButtonProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = isActive ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].background;
  const textColor = isActive ? '#fff' : Colors[colorScheme ?? 'light'].text;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        isActive ? styles.activeButton : styles.inactiveButton,
      ]}
      onPress={onPress}
    >
      <IconSymbol name={icon} size={16} color={textColor} />
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
    borderRadius: 8,
    gap: 6,
  },
  activeButton: {
    borderWidth: 0,
  },
  inactiveButton: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 