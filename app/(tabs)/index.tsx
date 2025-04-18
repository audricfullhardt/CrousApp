import { Image, StyleSheet, Platform, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/ui/Button";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  restaurants: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const color = useColorScheme();
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo.webp")}
          style={styles.logo}
        />
        <ThemedText style={styles.appName}>CROUStillant</ThemedText>
      </View>
      <View style={styles.openSource}>
        <ThemedText style={styles.openSourceText}>
          Ce projet est 100% open source !
        </ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.title}>
          Vos repas, simples et accessibles
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          CROUStillant vous permet de consulter les menus des restaurants CROUS
          de France et d'outre-mer.
        </ThemedText>
        <View style={styles.buttonsContainer}>
          <Button
            title="Découvrir votre menu"
            size="large"
            color={Colors[color ?? "light"].tint}
            textColor={Colors[color ?? "light"].background}
            onPress={() => navigation.navigate("restaurants")}
            icon="arrow.right"
          />
          <Button
            title="Voir les restaurants"
            size="large"
            color={Colors[color ?? "light"].background}
            textColor={Colors[color ?? "light"].text}
            onPress={() => navigation.navigate("restaurants")}
            icon="fork.knife"
            border={Colors[color ?? "light"].text}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  buttonsContainer: {
    width: "80%",
    gap: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  openSource: {
    padding: 20,
    alignItems: "center",
  },
  openSourceText: {
    fontSize: 12,
    paddingHorizontal: 20,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 20,
    color: "red",
  },
});
