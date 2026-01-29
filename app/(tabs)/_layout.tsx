import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/app/components/ui/HapticTab';
import TabBarBackground from '@/app/components/ui/TabBarBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Heart, Home, Info, Settings, UtensilsCrossed } from 'lucide-react-native';

export default function TabLayout() {
  const theme = useTheme();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
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
            paddingTop: 5,
            marginTop: 10,
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: theme.colors.background,
          },
          android: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
            paddingTop: 5,
            borderTopWidth: 0,
            elevation: 0,
            backgroundColor: theme.colors.background,
          },
          default: {
            height: 60,
            paddingBottom: 10,
            paddingTop: 5,
            borderTopWidth: 0,
            elevation: 0,
            backgroundColor: theme.colors.background,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: t('Header.home'),
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="restaurants"
        options={{
          tabBarLabel: t('Header.restaurants'),
          tabBarIcon: ({ color }) => <UtensilsCrossed size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="fav"
        options={{
          tabBarLabel: t('Header.favorites'),
          tabBarIcon: ({ color }) => <Heart size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          tabBarLabel: t('Header.about'),
          tabBarIcon: ({ color }) => <Info size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="params"
        options={{
          tabBarLabel: t('Header.settings'),
          tabBarIcon: ({ color }) => <Settings size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
