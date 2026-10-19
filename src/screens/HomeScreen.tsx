import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { colors, spacing, radius } from "../styles/theme";

type HomeScreenProps = {
  onStart: () => void;
};

export default function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Trivia de Multiplicaciones</Text>
          <Text style={styles.subtitle}>
            10 preguntas • 1 respuesta correcta
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={onStart}
          activeOpacity={0.85}
        >
          <Text style={styles.startButtonText}>Jugar</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Solo Android • Minimalista</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.md,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: "center",
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  startButtonText: {
    color: colors.primaryText,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  footer: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
});
