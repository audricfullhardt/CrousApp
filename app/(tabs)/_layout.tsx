import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useLanguage();

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
            bottom: 0,
            left: 0,
            right: 0,
            height: 88,
            paddingBottom: 30,
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          default: {
            height: 60,
            paddingBottom: 10,
            borderTopWidth: 0,
            elevation: 0,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          tabBarLabel: t('tabs.home'),
        }}
      />
      <Tabs.Screen
        name="restaurants"
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="fork.knife" color={color} />,
          tabBarLabel: t('tabs.restaurants'),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
          href: null,
          tabBarLabel: t('tabs.menu'),
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="info.circle" color={color} />,
          tabBarLabel: t('tabs.info'),
        }}
      />
      <Tabs.Screen
        name="params"
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
          tabBarLabel: t('tabs.settings'),
        }}
      />
    </Tabs>
  );
}
