import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
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
  ArrowLeft,
  Heart,
  Star,
  Coins,
  Volume2,
  Check,
  X,
  RotateCcw,
  ChevronRight
} from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAppTheme } from "@/utils/theme";
import { useGameStore } from "@/store/gameStore";
import { getLessonById } from "@/data/medicalContent";

const { width } = Dimensions.get("window");

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { colors, tokens, isDark } = useAppTheme();
  const { hearts, completeLessonWithRewards, loseHeart } = useGameStore();
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  // Find the lesson - simple approach for demo
  const [lesson, setLesson] = useState(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Find lesson in units (simplified for demo)
    for (let unitId = 1; unitId <= 3; unitId++) {
      const foundLesson = getLessonById(unitId, lessonId);
      if (foundLesson) {
        setLesson(foundLesson);
        break;
      }
    }
  }, [lessonId]);

  if (!fontsLoaded || !lesson) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.text, fontFamily: "Inter_500Medium" }}>Loading...</Text>
      </View>
    );
  }

  const currentItem = lesson.content.items?.[currentItemIndex];
  const totalItems = lesson.content.items?.length || 0;
  const progressPercentage = totalItems > 0 ? ((currentItemIndex + 1) / totalItems) * 100 : 0;

  const handleAnswerSelect = (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    
    // Check if answer is correct based on lesson type
    let correct = false;
    if (lesson.type === "vocabulary") {
      correct = true; // Vocabulary lessons are always "correct" for practice
    } else if (lesson.type === "phrase_drill" && currentItem.answer_es) {
      correct = answer.toLowerCase().trim() === currentItem.answer_es.toLowerCase().trim() ||
               currentItem.acceptable?.some(acc => acc.toLowerCase().trim() === answer.toLowerCase().trim());
    } else if (lesson.type === "dialogue" && currentItem.options) {
      const selectedOption = currentItem.options.find(opt => opt.response === answer);
      correct = selectedOption?.correct || false;
    }
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (!correct && hearts > 0) {
      loseHeart();
    }
  };

  const handleNext = () => {
    if (currentItemIndex < totalItems - 1) {
      setCurrentItemIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setProgress(progressPercentage);
    } else {
      // Lesson complete
      completeLessonWithRewards(lessonId, lesson.xpReward, Math.floor(lesson.xpReward / 3));
      router.push({
        pathname: "/lesson-complete",
        params: {
          lessonId,
          xpEarned: lesson.xpReward,
          coinsEarned: Math.floor(lesson.xpReward / 3)
        }
      });
    }
  };

  const renderHeader = () => (
    <View
      style={{
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: insets.top + 10,
        paddingBottom: 15,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.muted,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowLeft color={colors.text} size={20} />
        </TouchableOpacity>

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

      {/* Progress Bar */}
      <View
        style={{
          height: 8,
          backgroundColor: colors.muted,
          borderRadius: 4,
          marginBottom: 12,
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${progressPercentage}%`,
            backgroundColor: colors.primary,
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
        {currentItemIndex + 1} of {totalItems}
      </Text>
    </View>
  );

  const renderVocabularyItem = () => {
    if (!currentItem) return null;
    
    return (
      <View style={{ flex: 1, padding: 20 }}>
        {/* Dr. Corazón */}
        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <Image
            source={{
              uri: "https://raw.createusercontent.com/40506f7b-6baa-4a92-a0a7-574cec14e0d0/",
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginBottom: 16,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter_500Medium",
              color: colors.textMuted,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Translate this phrase:
          </Text>
        </View>

        {/* English phrase */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: tokens.radii.lg,
            padding: 24,
            marginBottom: 32,
            ...tokens.shadow.sm
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Inter_600SemiBold",
              color: colors.text,
              textAlign: "center",
            }}
          >
            {currentItem.english}
          </Text>
        </View>

        {/* Spanish answer */}
        <TouchableOpacity
          style={{
            backgroundColor: selectedAnswer ? colors.primary : colors.surface,
            borderRadius: tokens.radii.lg,
            padding: 20,
            marginBottom: 16,
            ...tokens.shadow.sm
          }}
          onPress={() => handleAnswerSelect(currentItem.spanish)}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Inter_600SemiBold",
              color: selectedAnswer ? "#FFFFFF" : colors.text,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            {currentItem.spanish}
          </Text>
          {currentItem.pronunciation && (
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter_400Regular",
                color: selectedAnswer ? "#FFFFFF" : colors.textMuted,
                textAlign: "center",
              }}
            >
              {currentItem.pronunciation}
            </Text>
          )}
        </TouchableOpacity>

        {/* Audio button */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.secondary,
            borderRadius: tokens.radii.lg,
            padding: 16,
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Volume2 color="#FFFFFF" size={20} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter_600SemiBold",
              color: "#FFFFFF",
              marginTop: 4,
            }}
          >
            Listen
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPhraseDrill = () => {
    if (!currentItem) return null;
    
    return (
      <View style={{ flex: 1, padding: 20 }}>
        {/* Question */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: tokens.radii.lg,
            padding: 24,
            marginBottom: 32,
            ...tokens.shadow.sm
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Inter_600SemiBold",
              color: colors.text,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            How do you say:
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Inter_500Medium",
              color: colors.textMuted,
              textAlign: "center",
            }}
          >
            {currentItem.prompt_en}
          </Text>
        </View>

        {/* Answer option */}
        <TouchableOpacity
          style={{
            backgroundColor: selectedAnswer ? colors.primary : colors.surface,
            borderRadius: tokens.radii.lg,
            padding: 20,
            marginBottom: 16,
            ...tokens.shadow.sm
          }}
          onPress={() => handleAnswerSelect(currentItem.answer_es)}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Inter_600SemiBold",
              color: selectedAnswer ? "#FFFFFF" : colors.text,
              textAlign: "center",
            }}
          >
            {currentItem.answer_es}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderResultFeedback = () => {
    if (!showResult) return null;

    return (
      <View
        style={{
          backgroundColor: isCorrect ? colors.success : colors.error,
          paddingHorizontal: 20,
          paddingVertical: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            {isCorrect ? (
              <Check color="#FFFFFF" size={24} />
            ) : (
              <X color="#FFFFFF" size={24} />
            )}
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter_600SemiBold",
                color: "#FFFFFF",
                marginLeft: 12,
              }}
            >
              {isCorrect ? "Correct!" : "Not quite right"}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: tokens.radii.lg,
              paddingHorizontal: 24,
              paddingVertical: 12,
            }}
            onPress={handleNext}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter_600SemiBold",
                color: "#FFFFFF",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      {renderHeader()}

      <View style={{ flex: 1 }}>
        {lesson.type === "vocabulary" && renderVocabularyItem()}
        {lesson.type === "phrase_drill" && renderPhraseDrill()}
      </View>

      {renderResultFeedback()}
    </View>
  );
}