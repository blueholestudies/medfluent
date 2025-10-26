import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
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
  ArrowLeft,
  Play,
  Lock,
  CheckCircle,
  Star,
  Clock,
  BookOpen,
  Users,
  Mic
} from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAppTheme } from "@/utils/theme";
import { useGameStore } from "@/store/gameStore";
import { getUnitById } from "@/data/medicalContent";

export default function UnitScreen() {
  const { unitId } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { colors, tokens, isDark } = useAppTheme();
  const { completedLessons } = useGameStore();
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const unit = getUnitById(parseInt(unitId));
  
  if (!unit) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.text, fontFamily: "Inter_500Medium" }}>Unit not found</Text>
      </View>
    );
  }

  const lessons = unit.lessons || [];
  const completedInUnit = lessons.filter(lesson => 
    completedLessons.includes(lesson.id)
  ).length;

  const renderHeader = () => (
    <View
      style={{
        backgroundColor: unit.lightColor || colors.surface,
        paddingHorizontal: 20,
        paddingTop: insets.top + 10,
        paddingBottom: 30,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowLeft color={colors.text} size={20} />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center" }}>
        {/* Unit Icon */}
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: unit.color,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 32 }}>{unit.icon}</Text>
        </View>

        <Text
          style={{
            fontSize: 24,
            fontFamily: "Inter_600SemiBold",
            color: colors.text,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          {unit.name}
        </Text>
        
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Inter_400Regular",
            color: colors.textMuted,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          {unit.description}
        </Text>

        {/* Progress indicator */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckCircle color={colors.success} size={16} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter_500Medium",
              color: colors.text,
              marginLeft: 8,
            }}
          >
            {completedInUnit}/{lessons.length} lessons completed
          </Text>
        </View>
      </View>
    </View>
  );

  const LessonCard = ({ lesson, index }) => {
    const isCompleted = completedLessons.includes(lesson.id);
    const isUnlocked = index === 0 || completedLessons.includes(lessons[index - 1]?.id);
    
    const getTypeIcon = () => {
      switch (lesson.type) {
        case "vocabulary":
          return <BookOpen color="#FFFFFF" size={20} />;
        case "phrase_drill":
          return <Users color="#FFFFFF" size={20} />;
        case "dialogue":
          return <Mic color="#FFFFFF" size={20} />;
        default:
          return <Play color="#FFFFFF" size={20} />;
      }
    };

    const getTypeColor = () => {
      switch (lesson.type) {
        case "vocabulary":
          return colors.primary;
        case "phrase_drill":
          return colors.success;
        case "dialogue":
          return colors.secondary;
        default:
          return colors.accent;
      }
    };

    return (
      <TouchableOpacity
        style={{
          backgroundColor: colors.surface,
          borderRadius: tokens.radii.lg,
          padding: 20,
          marginHorizontal: 20,
          marginBottom: 16,
          opacity: isUnlocked ? 1 : 0.6,
          ...tokens.shadow.sm
        }}
        onPress={() => {
          if (isUnlocked) {
            router.push(`/lesson/${lesson.id}`);
          }
        }}
        disabled={!isUnlocked}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Lesson icon */}
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: isCompleted ? colors.success : 
                             isUnlocked ? getTypeColor() : colors.textMuted,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            {isCompleted ? (
              <CheckCircle color="#FFFFFF" size={24} />
            ) : isUnlocked ? (
              getTypeIcon()
            ) : (
              <Lock color="#FFFFFF" size={24} />
            )}
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter_600SemiBold",
                color: colors.text,
                marginBottom: 4,
              }}
            >
              {lesson.title}
            </Text>
            
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_500Medium",
                  color: getTypeColor(),
                  textTransform: "capitalize",
                }}
              >
                {lesson.type.replace("_", " ")}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_400Regular",
                  color: colors.textMuted,
                  marginLeft: 8,
                }}
              >
                • {lesson.xpReward} XP
              </Text>
            </View>

            {lesson.content.objective && (
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Inter_400Regular",
                  color: colors.textMuted,
                }}
              >
                {lesson.content.objective[0]}
              </Text>
            )}
          </View>

          {/* Estimated time */}
          <View style={{ alignItems: "center" }}>
            <Clock color={colors.textMuted} size={16} />
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Inter_400Regular",
                color: colors.textMuted,
                marginTop: 2,
              }}
            >
              3 min
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      {renderHeader()}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Dr. Corazón encouragement */}
        <View 
          style={{
            backgroundColor: colors.surface,
            borderRadius: tokens.radii.lg,
            padding: 16,
            marginHorizontal: 20,
            marginBottom: 20,
            ...tokens.shadow.sm
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://raw.createusercontent.com/40506f7b-6baa-4a92-a0a7-574cec14e0d0/",
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 12,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Inter_500Medium",
                  color: colors.text,
                  marginBottom: 4,
                }}
              >
                Dr. Corazón says:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_400Regular",
                  color: colors.textMuted,
                }}
              >
                Ready to master {unit.name.toLowerCase()}? Let's learn some essential medical Spanish! 🏥
              </Text>
            </View>
          </View>
        </View>

        {/* Lessons list */}
        <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Inter_600SemiBold",
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Lessons
          </Text>
        </View>

        {lessons.map((lesson, index) => (
          <LessonCard key={lesson.id} lesson={lesson} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}