import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/app/components/ui/ThemedText";
import { useTheme } from "@/contexts/ThemeContext";
import { School, UtensilsCrossed } from "lucide-react-native";

export default function StudentProjectCard({
  title,
  description,
  buttonText,
  onPress,
}: {
  title: string;
  description: string;
  buttonText: string;
  onPress: () => void;
}) {
  const theme = useTheme();
  const [containerWidth, setContainerWidth] = React.useState(0);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.mainContent}>
        <ThemedText style={[styles.title, { color: theme.colors.cardsTitle }]}>
          {title}
        </ThemedText>
        <ThemedText style={[styles.description, { color: theme.colors.text }]}>
          {description}
        </ThemedText>
        <ThemedText
          onPress={onPress}
          style={[styles.button, { color: theme.colors.text }]}
        >
          {buttonText}
        </ThemedText>
      </View>
      <View
        style={styles.illustration}
        onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
      >
        <View style={styles.circleMiddle} />
        <View style={styles.circleInner} />
        {containerWidth > 0 && Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * 2 * Math.PI - Math.PI / 2;
          const centerX = containerWidth / 2;
          const centerY = 140;
          const radius = 120;
          const x = centerX + radius * Math.cos(angle) - 28;
          const y = centerY + radius * Math.sin(angle) - 28;
          return (
            <View
              key={i}
              style={[
                styles.iconCircle,
                { left: x, top: y }
              ]}
            >
              <UtensilsCrossed color="#fff" size={28} />
            </View>
          );
        })}
        {containerWidth > 0 && (
          <View
            style={[
              styles.centerIcon,
              {
                left: containerWidth / 2 - 48,
                top: 140 - 48,
              },
            ]}
          >
            <School color="#fff" size={48} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    width: "100%",
    overflow: "hidden",
  },
  mainContent: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  illustration: {
    width: "100%",
    height: 280,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 8,
    position: "relative",
    borderRadius: 20,
    backgroundColor: "#fdeaea",
    overflow: 'hidden',
  },
  circleMiddle: {
    position: "absolute",
    width: 300,
    height: 310,
    borderRadius: 170,
    backgroundColor: "#fdd9d8",
    left: '50%',
    top: '50%',
    transform: [{ translateX: -150 }, { translateY: -155 }],
  },
  circleInner: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#ffc5c3",
    left: '50%',
    top: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
  iconCircle: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F44336",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#F44336",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  centerIcon: {
    position: "absolute",
    left: 92,
    top: 92,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#F44336",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#F44336",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 2,
  },
});
