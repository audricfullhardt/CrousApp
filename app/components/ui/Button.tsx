import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/app/components/ui/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
}

export default function Button({ 
  title, 
  onPress, 
  color, 
  textColor, 
  size = 'medium', 
  icon 
}: ButtonProps) {
  const theme = useTheme();
  
  // Styles optimisés avec useMemo
  const buttonStyles = useMemo(() => {
    const buttonColor = color || theme.colors.primary;
    const buttonTextColor = textColor || theme.colors.surface;
    
    const sizeStyles = {
      small: { button: styles.smallButton, text: styles.smallText },
      medium: { button: styles.mediumButton, text: styles.mediumText },
      large: { button: styles.largeButton, text: styles.largeText },
    };
    
    const currentSize = sizeStyles[size];
    
    return {
      button: [styles.button, currentSize.button, { backgroundColor: buttonColor }],
      text: [currentSize.text, { color: buttonTextColor }],
      textColor: buttonTextColor,
    };
  }, [color, textColor, size, theme.colors.primary, theme.colors.surface]);

  // Calcul de la taille de l'icône basé sur la taille du bouton
  const iconSize = useMemo(() => {
    const sizeMap = { small: 16, medium: 20, large: 24 };
    return sizeMap[size];
  }, [size]);

  return (
    <TouchableOpacity
      style={buttonStyles.button}
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        <ThemedText style={buttonStyles.text}>
          {title}
        </ThemedText>
        {icon && (
          <View style={styles.iconContainer}>
            {React.cloneElement(icon as React.ReactElement, {
              size: iconSize,
              color: buttonStyles.textColor
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