import { useColorScheme } from 'react-native';
import { Colors } from './Colors';

export type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
    success: string;
    error: string;
    link: string;
    surface: string;
    surfaceVariant: string;
    openSource: string;
    openSourceBorder: string;
    cardsTitle: string;
    teamCard: {
      membersCard: {
        background: string;
        text: string;
        dot: string;
        border: string;
      }
    }
    convincedCard: {
      background: string;
      text: string;
      border: string;
    },
    StudentProjectCard: {
      background: string;
      firstCircle: string;
      secondCircle: string;
      iconBackground: string;
      iconColor: string;
      borderColor: string;
    },
  };
};

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: Colors.light.tint,
    background: Colors.light.background,
    card: '#F2F2F7',
    text: Colors.light.text,
    border: '#C6C6C8',
    notification: '#FF3B30',
    icon: Colors.light.icon,
    tabIconDefault: Colors.light.tabIconDefault,
    tabIconSelected: Colors.light.tabIconSelected,
    success: '#4CAF50',
    error: '#F44336',
    link: '#2196F3',
    surface: '#fafafa',
    surfaceVariant: '#F5F5F5',
    openSource: '#fed7da',
    openSourceBorder: '#eaafb3',
    cardsTitle: '#f0353d',
    teamCard: {
      membersCard: {
        background: '#f9f3f3',
        border: '#FAEBEA',
        text: '#000000',
        dot: '#3B82F6',
      }
    },
    convincedCard: {
      background: '#ff6563',
      text: '#F2F2F2',
      border: '#ff9493',
    },
    StudentProjectCard: {
      background: '#fdeaea',
      firstCircle: '#fdd9d8',
      secondCircle: '#ffc5c3',
      iconBackground: '#F44336',
      borderColor: '#FCBEBF',
      iconColor: '#fff',
    },
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: Colors.dark.tint,
    background: Colors.dark.background,
    card: '#1C1C1E',
    text: Colors.dark.text,
    border: '#38383A',
    notification: '#FF453A',
    icon: Colors.dark.icon,
    tabIconDefault: Colors.dark.tabIconDefault,
    tabIconSelected: Colors.dark.tabIconSelected,
    success: '#4CAF50',
    error: '#F44336',
    link: '#2196F3',
    surface: '#1C1C1E',
    surfaceVariant: '#2C2C2E',
    openSource: '#740e17',
    openSourceBorder: '#ffd9dc',
    cardsTitle: '#f0353d',
    teamCard: {
      membersCard: {
        background: '#292929',
        border: '#594D4D',
        text: '#E6E6E6',
        dot: '#3B82F6',
      }
    },
    convincedCard: {
      background: '#ff6563',
      text: '#F2F2F2',
      border: '#ff9493',
    },
    StudentProjectCard: {
      background: '#4C3534',
      firstCircle: '#452D2C',
      secondCircle: '#452E2E',
      iconBackground: '#F04646',
      borderColor: '#F8ACAB',
      iconColor: '#F2F2F2',
    },
  },
};

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}; 