import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="restaurants"
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="fork.knife" color={color} />,
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="info.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="params"
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
