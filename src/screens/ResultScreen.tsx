import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { colors, spacing, radius } from "../styles/theme";

type ResultScreenProps = {
  score: number;
  total: number;
  onRestart: () => void;
};

export default function ResultScreen({
  score,
  total,
  onRestart,
}: ResultScreenProps) {
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Resultado</Text>

          <View style={styles.scoreBox}>
            <Text style={styles.scoreNumber}>
              {score} / {total}
            </Text>
            <Text style={styles.percentage}>{percentage}% de acierto</Text>
          </View>

          <Text style={styles.message}>
            {score === total
              ? "¡Perfecto!"
              : score >= Math.ceil(total * 0.7)
                ? "¡Muy bien!"
                : score >= Math.ceil(total * 0.5)
                  ? "¡Bien hecho!"
                  : "Puedes mejorar"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.restartButton}
          onPress={onRestart}
          activeOpacity={0.85}
        >
          <Text style={styles.restartButtonText}>Jugar de nuevo</Text>
        </TouchableOpacity>
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
    padding: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xl,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
  },
  scoreBox: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    minWidth: "80%",
  },
  scoreNumber: {
    fontSize: 56,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
  },
  percentage: {
    fontSize: 16,
    color: colors.textMuted,
    fontWeight: "600",
    textAlign: "center",
  },
  message: {
    fontSize: 18,
    color: colors.text,
    fontWeight: "600",
    textAlign: "center",
  },
  restartButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  restartButtonText: {
    color: colors.primaryText,
    fontSize: 18,
    fontWeight: "700",
  },
});
