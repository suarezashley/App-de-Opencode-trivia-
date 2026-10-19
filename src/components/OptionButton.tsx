import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { colors, radius, spacing } from "../styles/theme";

type OptionButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  isSelected?: boolean;
};

export default function OptionButton({
  label,
  onPress,
  disabled = false,
  isCorrect = false,
  isWrong = false,
  isSelected = false,
}: OptionButtonProps) {
  const getBackgroundColor = () => {
    if (isCorrect) return colors.success;
    if (isWrong) return colors.danger;
    if (isSelected && !disabled) return colors.primary;
    return colors.surface;
  };

  const getBorderColor = () => {
    if (isCorrect) return colors.success;
    if (isWrong) return colors.danger;
    if (isSelected && !disabled) return colors.primary;
    return colors.border;
  };

  const getTextColor = () => {
    if (isCorrect || isWrong) return "#FFFFFF";
    return colors.text;
  };

  const buttonStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    borderColor: getBorderColor(),
    borderWidth: 1.5,
    opacity: disabled && !isCorrect && !isWrong ? 0.5 : 1,
  };

  return (
    <Pressable
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: "rgba(255,255,255,0.08)" }}
    >
      <Text style={[styles.label, { color: getTextColor() }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minHeight: 64,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    justifyContent: "center",
    alignItems: "center",
    margin: spacing.xs,
  },
  label: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
});
