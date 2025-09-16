import React from "react";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

export default function TabBarBackground() {
  return <BlurView intensity={80} style={StyleSheet.absoluteFill} />;
}

export function useBottomTabOverflow() {
  return 0;
}
