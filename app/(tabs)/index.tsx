import { Image, StyleSheet, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const color = useColorScheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ThemedText>
      <Button
          title="Découvrir votre menu"
          size="large"
          color={Colors[color ?? 'light'].tint}
          textColor={Colors[color ?? 'light'].background}
          onPress={() => navigation.navigate('restaurants')}
          icon="arrow.right"
        />
        <Button
          title="Voir les restaurants"
          size="large"
          color={Colors[color ?? 'light'].background}
          textColor={Colors[color ?? 'light'].text}
          onPress={() => navigation.navigate('restaurants')}
          icon="fork.knife"
          border={Colors[color ?? 'light'].text}
        />
      </ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
