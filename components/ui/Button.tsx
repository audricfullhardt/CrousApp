import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { useTheme } from '@/contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
}

export default function Button({ title, onPress, color, textColor, size = 'medium', icon }: ButtonProps) {
  const theme = useTheme();
  const buttonColor = color || theme.colors.primary;
  const buttonTextColor = textColor || theme.colors.surface;

  const getButtonStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'large':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  const getTextStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallText;
      case 'large':
        return styles.largeText;
      default:
        return styles.mediumText;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), { backgroundColor: buttonColor }]}
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        <ThemedText style={[getTextStyle(), { color: buttonTextColor }]}>
          {title}
        </ThemedText>
        {icon && (
          <View style={styles.iconContainer}>
            {React.cloneElement(icon as React.ReactElement, {
              size: size === 'small' ? 16 : size === 'large' ? 24 : 20,
              color: buttonTextColor
            })}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconContainer: {
    marginLeft: 4,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});