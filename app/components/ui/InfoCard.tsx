import React, { useMemo } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import { ThemedText } from '@/app/components/ui/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';

interface InfoCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon?: React.ReactNode;
  onPress: () => void;
}

export default function InfoCard({ 
  title, 
  description, 
  buttonText, 
  icon, 
  onPress 
}: InfoCardProps) {
  const theme = useTheme();

  // Styles optimisés avec useMemo
  const cardStyles = useMemo(() => ({
    container: [styles.container, { backgroundColor: theme.colors.surface }],
    title: [styles.title, { color: theme.colors.cardsTitle }],
    description: [styles.description, { color: theme.colors.text }],
    buttonText: [styles.buttonText, { 
      color: theme.colors.text,
      textDecorationLine: 'underline'
    }],
  }), [theme.colors]);

  return (
    <View style={cardStyles.container}>
      <View style={styles.content}>
        <ThemedText style={cardStyles.title}>
          {title}
        </ThemedText>
        <ThemedText style={cardStyles.description}>
          {description}
        </ThemedText>
      </View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.8 : 1 }
        ]}
      >
        <ThemedText style={cardStyles.buttonText}>
          {buttonText}
        </ThemedText>
      </Pressable>
      {icon && (
        <View style={styles.iconContainer}>
          {icon}
        </View>
      )}
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
  content: {
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 32,
    width: '80%',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    width: '80%',
  },
  button: {
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  iconContainer: {
    position: 'absolute',
    right: -65,
    top: '50%',
    transform: [{ translateY: -50 }],
    opacity: 0.1,
  },
  icon: {
    transform: [{ scale: 1.5 }],
  },
}); 