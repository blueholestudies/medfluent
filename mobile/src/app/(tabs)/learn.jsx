import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { 
  Flame, 
  Star, 
  Coins, 
  Heart,
  MapPin,
  Lock,
  CheckCircle,
  Users,
  Stethoscope,
  Activity,
  UserCheck,
  Play,
  BookOpen,
  Mic
} from "lucide-react-native";
import { router } from "expo-router";
import { useAppTheme } from "@/utils/theme";
import { useGameStore } from "@/store/gameStore";
import { medicalUnits, getAllUnits } from "@/data/medicalContent";

const { width } = Dimensions.get("window");

export default function LearnScreen() {
  const insets = useSafeAreaInsets();
  const { colors, tokens, isDark } = useAppTheme();
  const { xp, coins, hearts, streak, user, unlockedUnits, completedLessons, dailyGoals } = useGameStore();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const allUnits = getAllUnits();

  const renderHeader = () => (
    <View
      style={{
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: insets.top + 10,
        paddingBottom: 15,
      }}
    >
      {/* Dr. Corazón Mascot & User Info */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/profile")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          {/* Dr. Corazón Mascot */}
          <Image
            source={{
              uri: "https://raw.createusercontent.com/40506f7b-6baa-4a92-a0a7-574cec14e0d0/",
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              borderWidth: 3,
              borderColor: colors.primary,
            }}
          />
          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Inter_600SemiBold",
                color: colors.text,
              }}
            >
              {user.username}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Inter_500Medium",
                color: colors.textMuted,
              }}
            >
              Medical Student
            </Text>
          </View>
        </TouchableOpacity>
        
        {/* Notification/Settings */}
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.muted,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Users color={colors.text} size={20} />
        </TouchableOpacity>
      </View>

      {/* Stats Row */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Flame color={colors.streak} size={20} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Inter_600SemiBold",
              color: colors.text,
              marginLeft: 6,
            }}
          >
            {streak}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Star color={colors.xp} size={20} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Inter_600SemiBold",
              color: colors.text,
              marginLeft: 6,
            }}
          >
            {xp}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Coins color={colors.coins} size={20} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Inter_600SemiBold",
              color: colors.text,
              marginLeft: 6,
            }}
          >
            {coins}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Heart color={colors.hearts} size={20} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Inter_600SemiBold",
              color: colors.text,
              marginLeft: 6,
            }}
          >
            {hearts}
          </Text>
        </View>
      </View>

      {/* Daily Goals Progress */}
      <View 
        style={{
          backgroundColor: colors.surface,
          borderRadius: tokens.radii.md,
          padding: 16,
          marginTop: 20,
          ...tokens.shadow.sm
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Inter_600SemiBold",
            color: colors.text,
            marginBottom: 12,
          }}
        >
          Daily Goals
        </Text>
        
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 4 }}>XP</Text>
            <View
              style={{
                height: 6,
                backgroundColor: colors.muted,
                borderRadius: 3,
                width: "100%",
                marginBottom: 4
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${(dailyGoals.xpCurrent / dailyGoals.xpTarget) * 100}%`,
                  backgroundColor: colors.xp,
                  borderRadius: 3,
                }}
              />
            </View>
            <Text style={{ fontSize: 10, color: colors.textMuted }}>
              {dailyGoals.xpCurrent}/{dailyGoals.xpTarget}
            </Text>
          </View>
          
          <View style={{ alignItems: "center", flex: 1, marginHorizontal: 8 }}>
            <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 4 }}>Lessons</Text>
            <View
              style={{
                height: 6,
                backgroundColor: colors.muted,
                borderRadius: 3,
                width: "100%",
                marginBottom: 4
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${(dailyGoals.lessonsCurrent / dailyGoals.lessonsTarget) * 100}%`,
                  backgroundColor: colors.primary,
                  borderRadius: 3,
                }}
              />
            </View>
            <Text style={{ fontSize: 10, color: colors.textMuted }}>
              {dailyGoals.lessonsCurrent}/{dailyGoals.lessonsTarget}
            </Text>
          </View>
          
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 4 }}>Speaking</Text>
            <View
              style={{
                height: 6,
                backgroundColor: colors.muted,
                borderRadius: 3,
                width: "100%",
                marginBottom: 4
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${(dailyGoals.speakingCurrent / dailyGoals.speakingTarget) * 100}%`,
                  backgroundColor: colors.secondary,
                  borderRadius: 3,
                }}
              />
            </View>
            <Text style={{ fontSize: 10, color: colors.textMuted }}>
              {dailyGoals.speakingCurrent}/{dailyGoals.speakingTarget}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 18,
          fontFamily: "Inter_600SemiBold",
          color: colors.text,
          marginBottom: 16,
        }}
      >
        Quick Practice
      </Text>
      
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: colors.primary,
            borderRadius: tokens.radii.lg,
            padding: 16,
            alignItems: "center",
            marginRight: 8,
            ...tokens.shadow.sm
          }}
          onPress={() => router.push("/practice/vocabulary")}
        >
          <BookOpen color="#FFFFFF" size={20} style={{ marginBottom: 4 }} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter_600SemiBold",
              color: "#FFFFFF",
            }}
          >
            Vocabulary
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: colors.success,
            borderRadius: tokens.radii.lg,
            padding: 16,
            alignItems: "center",
            marginHorizontal: 4,
            ...tokens.shadow.sm
          }}
          onPress={() => router.push("/practice/phrases")}
        >
          <Users color="#FFFFFF" size={20} style={{ marginBottom: 4 }} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter_600SemiBold",
              color: "#FFFFFF",
            }}
          >
            Phrases
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: colors.secondary,
            borderRadius: tokens.radii.lg,
            padding: 16,
            alignItems: "center",
            marginLeft: 8,
            ...tokens.shadow.sm
          }}
          onPress={() => router.push("/practice/speaking")}
        >
          <Mic color="#FFFFFF" size={20} style={{ marginBottom: 4 }} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter_600SemiBold",
              color: "#FFFFFF",
            }}
          >
            Speaking
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const UnitCard = ({ unit }) => {
    const isUnlocked = unit.locked ? false : unlockedUnits.includes(unit.id);
    const unitLessons = unit.lessons || [];
    const completedInUnit = unitLessons.filter(lesson => 
      completedLessons.includes(lesson.id)
    ).length;
    const progress = unitLessons.length > 0 ? (completedInUnit / unitLessons.length) * 100 : 0;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: unit.lightColor || colors.surface,
          borderRadius: tokens.radii.xl,
          padding: 20,
          marginHorizontal: 20,
          marginBottom: 16,
          opacity: isUnlocked ? 1 : 0.6,
          ...tokens.shadow.sm
        }}
        onPress={() => {
          if (isUnlocked && !unit.locked) {
            router.push(`/unit/${unit.id}`);
          }
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: unit.color,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            {isUnlocked && !unit.locked ? (
              <Text style={{ fontSize: 24 }}>{unit.icon}</Text>
            ) : (
              <Lock color="#FFFFFF" size={24} />
            )}
          </View>
          
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Inter_600SemiBold",
                color: colors.text,
                marginBottom: 4,
              }}
            >
              {unit.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Inter_400Regular",
                color: colors.textMuted,
              }}
            >
              {unit.description}
            </Text>
          </View>

          {isUnlocked && !unit.locked && completedInUnit === unitLessons.length && unitLessons.length > 0 && (
            <CheckCircle color={colors.success} size={24} />
          )}
        </View>

        {/* Progress Bar */}
        {!unit.locked && (
          <>
            <View
              style={{
                height: 8,
                backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                borderRadius: 4,
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  backgroundColor: unit.color,
                  borderRadius: 4,
                }}
              />
            </View>

            <Text
              style={{
                fontSize: 12,
                fontFamily: "Inter_500Medium",
                color: colors.textMuted,
                textAlign: "center",
              }}
            >
              {Math.round(progress)}% complete • {completedInUnit}/{unitLessons.length} lessons
            </Text>
          </>
        )}
        
        {unit.locked && (
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Inter_500Medium",
              color: colors.textMuted,
              textAlign: "center",
            }}
          >
            Complete previous units to unlock
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      {renderHeader()}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {renderQuickActions()}

        <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Inter_600SemiBold",
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Medical Spanish Units
          </Text>
        </View>

        {allUnits.map((unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </ScrollView>
    </View>
  );
}