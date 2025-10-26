import { useColorScheme } from "react-native";

// Design tokens for MedFluent
const tokens = {
  colors: {
    brand: {
      primary: "#1DB5BE",
      primaryDark: "#0C8C94",
      secondary: "#FF7A59",
      accent: "#6E6CFF",
    },
    feedback: {
      success: "#2FBF71",
      warning: "#FFC857",
      error: "#FF5A5F",
      info: "#4CB7FF",
    },
    ui: {
      bg: "#F7F9FB",
      card: "#FFFFFF",
      muted: "#EEF2F6",
      border: "#E3E8EF",
      text: "#1E293B",
      textMuted: "#5B6472",
    },
    // Dark mode variants
    uiDark: {
      bg: "#0F172A",
      card: "#1E293B",
      muted: "#334155",
      border: "#475569",
      text: "#F1F5F9",
      textMuted: "#94A3B8",
    },
  },
  radii: {
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  shadow: {
    sm: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    md: {
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 8,
    },
  },
};

export const useAppTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return {
    isDark,
    tokens,
    colors: {
      // Brand colors (consistent across themes)
      primary: tokens.colors.brand.primary,
      primaryDark: tokens.colors.brand.primaryDark,
      secondary: tokens.colors.brand.secondary,
      accent: tokens.colors.brand.accent,

      // Feedback colors
      success: tokens.colors.feedback.success,
      warning: tokens.colors.feedback.warning,
      error: tokens.colors.feedback.error,
      info: tokens.colors.feedback.info,

      // UI colors (theme-dependent)
      background: isDark ? tokens.colors.uiDark.bg : tokens.colors.ui.bg,
      surface: isDark ? tokens.colors.uiDark.card : tokens.colors.ui.card,
      muted: isDark ? tokens.colors.uiDark.muted : tokens.colors.ui.muted,
      border: isDark ? tokens.colors.uiDark.border : tokens.colors.ui.border,
      text: isDark ? tokens.colors.uiDark.text : tokens.colors.ui.text,
      textMuted: isDark
        ? tokens.colors.uiDark.textMuted
        : tokens.colors.ui.textMuted,

      // Gamification colors
      xp: tokens.colors.brand.accent, // Indigo for XP
      coins: tokens.colors.feedback.warning, // Golden yellow
      hearts: tokens.colors.brand.secondary, // Coral for hearts/streaks
      streak: tokens.colors.brand.secondary,

      // Unit colors for medical departments
      emergency: "#FF5A5F",
      emergencyLight: isDark ? "#4A1F20" : "#FFE8E9",
      clinic: "#1DB5BE",
      clinicLight: isDark ? "#1A3D40" : "#E0F7F8",
      pediatrics: "#FF7A59",
      pediatricsLight: isDark ? "#4A2A1F" : "#FFE9E3",
      surgery: "#6E6CFF",
      surgeryLight: isDark ? "#2A2A4A" : "#E8E8FF",
    },
  };
};
