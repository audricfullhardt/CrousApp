import React from "react";
import { View } from "react-native";

// Fallback Android + Web
export default function TabBarBackground() {
  return <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "transparent" }} />;
}

export function useBottomTabOverflow() {
  return 0;
}
