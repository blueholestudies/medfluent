import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import {
  Trophy,
  Award,
  Target,
  Clock,
  TrendingUp,
  Filter,
  CheckCircle,
  Lock,
} from "lucide-react-native";
import { useAppTheme } from "@/utils/theme";
import FixedHeader from "@/components/FixedHeader";

const { width } = Dimensions.get("window");

export default function AchievementsScreen() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showHeaderBorder, setShowHeaderBorder] = useState(false);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const categories = [
    { id: "all", name: "All", icon: Trophy },
    { id: "learning", name: "Learning", icon: Target },
    { id: "streak", name: "Streaks", icon: TrendingUp },
    { id: "completion", name: "Completion", icon: CheckCircle },
  ];

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson in Clinical Spanish",
      icon: "🏥",
      category: "learning",
      earned: true,
      dateEarned: "Nov 15, 2024",
      rarity: "common",
      xpReward: 50,
      coinReward: 25,
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Maintain a 7-day learning streak",
      icon: "🔥",
      category: "streak",
      earned: true,
      dateEarned: "Nov 20, 2024",
      rarity: "rare",
      xpReward: 100,
      coinReward: 50,
    },
    {
      id: 3,
      title: "ER Expert",
      description: "Complete all lessons in Emergency Room unit",
      icon: "⚡",
      category: "completion",
      earned: false,
      progress: 85,
      maxProgress: 100,
      rarity: "epic",
      xpReward: 250,
      coinReward: 100,
    },
    {
      id: 4,
      title: "Spanish Speaker",
      description: "Complete 100 speaking exercises with perfect score",
      icon: "🗣️",
      category: "learning",
      earned: false,
      progress: 45,
      maxProgress: 100,
      rarity: "epic",
      xpReward: 200,
      coinReward: 75,
    },
    {
      id: 5,
      title: "Vocabulary Master",
      description: "Learn 500 new medical terms in Spanish",
      icon: "📚",
      category: "learning",
      earned: false,
      progress: 287,
      maxProgress: 500,
      rarity: "rare",
      xpReward: 150,
      coinReward: 60,
    },
    {
      id: 6,
      title: "Streak Legend",
      description: "Maintain a 30-day learning streak",
      icon: "⭐",
      category: "streak",
      earned: false,
      progress: 12,
      maxProgress: 30,
      rarity: "legendary",
      xpReward: 500,
      coinReward: 200,
    },
    {
      id: 7,
      title: "Perfect Patient",
      description: "Complete 10 patient dialogue scenarios with 100% accuracy",
      icon: "👩‍⚕️",
      category: "completion",
      earned: true,
      dateEarned: "Nov 18, 2024",
      rarity: "rare",
      xpReward: 125,
      coinReward: 55,
    },
    {
      id: 8,
      title: "Medical Pioneer",
      description: "Complete all available hospital units",
      icon: "🏆",
      category: "completion",
      earned: false,
      progress: 2,
      maxProgress: 4,
      rarity: "legendary",
      xpReward: 1000,
      coinReward: 400,
    },
  ];

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowHeaderBorder(offsetY > 10);
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return colors.secondary;
      case "rare":
        return colors.medical;
      case "epic":
        return colors.warning;
      case "legendary":
        return colors.emergency;
      default:
        return colors.secondary;
    }
  };

  const getRarityBackground = (rarity) => {
    switch (rarity) {
      case "common":
        return colors.surfaceVariant;
      case "rare":
        return colors.medicalLight;
      case "epic":
        return colors.warningLight;
      case "legendary":
        return colors.emergencyLight;
      default:
        return colors.surfaceVariant;
    }
  };

  const filteredAchievements =
    selectedCategory === "all"
      ? achievements
      : achievements.filter(
          (achievement) => achievement.category === selectedCategory,
        );

  const earnedCount = achievements.filter((a) => a.earned).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((earnedCount / totalCount) * 100);

  const CategoryButton = ({ category }) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 16,
        backgroundColor:
          selectedCategory === category.id
            ? colors.medical
            : colors.surfaceVariant,
        marginRight: 8,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={() => setSelectedCategory(category.id)}
    >
      <category.icon
        color={selectedCategory === category.id ? "#FFFFFF" : colors.primary}
        size={16}
        style={{ marginRight: 6 }}
      />
      <Text
        style={{
          fontSize: 12,
          fontFamily: "Montserrat_600SemiBold",
          color: selectedCategory === category.id ? "#FFFFFF" : colors.primary,
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const AchievementCard = ({ achievement }) => (
    <TouchableOpacity
      style={{
        backgroundColor: achievement.earned
          ? getRarityBackground(achievement.rarity)
          : colors.surface,
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 20,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: achievement.earned
          ? getRarityColor(achievement.rarity)
          : colors.borderLight,
        opacity: achievement.earned ? 1 : 0.8,
      }}
    >
      {/* Icon */}
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: achievement.earned
            ? getRarityColor(achievement.rarity)
            : colors.surfaceVariant,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 16,
        }}
      >
        {achievement.earned ? (
          <Text style={{ fontSize: 24 }}>{achievement.icon}</Text>
        ) : (
          <Lock color={colors.placeholder} size={24} />
        )}
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Montserrat_600SemiBold",
              color: colors.primary,
              flex: 1,
            }}
          >
            {achievement.title}
          </Text>

          <View
            style={{
              backgroundColor: getRarityColor(achievement.rarity),
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Montserrat_600SemiBold",
                color: "#FFFFFF",
                textTransform: "uppercase",
              }}
            >
              {achievement.rarity}
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 12,
            fontFamily: "Montserrat_400Regular",
            color: colors.secondary,
            marginBottom: achievement.earned ? 8 : 12,
            lineHeight: 16,
          }}
        >
          {achievement.description}
        </Text>

        {/* Progress or Date */}
        {achievement.earned ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Montserrat_500Medium",
                color: colors.success,
              }}
            >
              Earned on {achievement.dateEarned}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Montserrat_600SemiBold",
                  color: colors.xp,
                  marginRight: 8,
                }}
              >
                +{achievement.xpReward} XP
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Montserrat_600SemiBold",
                  color: colors.coins,
                }}
              >
                +{achievement.coinReward} coins
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 6,
                  backgroundColor: colors.surfaceVariant,
                  borderRadius: 3,
                  marginRight: 8,
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                    backgroundColor: getRarityColor(achievement.rarity),
                    borderRadius: 3,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Montserrat_600SemiBold",
                  color: colors.secondary,
                }}
              >
                {achievement.progress}/{achievement.maxProgress}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Montserrat_500Medium",
                  color: colors.secondary,
                }}
              >
                {Math.round(
                  (achievement.progress / achievement.maxProgress) * 100,
                )}
                % complete
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "Montserrat_600SemiBold",
                    color: colors.xp,
                    marginRight: 8,
                  }}
                >
                  +{achievement.xpReward} XP
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "Montserrat_600SemiBold",
                    color: colors.coins,
                  }}
                >
                  +{achievement.coinReward} coins
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderStats = () => (
    <View
      style={{
        backgroundColor: colors.surface,
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.borderLight,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: "Montserrat_600SemiBold",
          color: colors.primary,
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        🏆 Achievement Progress
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Montserrat_600SemiBold",
              color: colors.primary,
            }}
          >
            {earnedCount}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Montserrat_500Medium",
              color: colors.secondary,
            }}
          >
            Earned
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Montserrat_600SemiBold",
              color: colors.primary,
            }}
          >
            {totalCount - earnedCount}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Montserrat_500Medium",
              color: colors.secondary,
            }}
          >
            Remaining
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Montserrat_600SemiBold",
              color: colors.primary,
            }}
          >
            {completionPercentage}%
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Montserrat_500Medium",
              color: colors.secondary,
            }}
          >
            Complete
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View
        style={{
          height: 8,
          backgroundColor: colors.surfaceVariant,
          borderRadius: 4,
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${completionPercentage}%`,
            backgroundColor: colors.medical,
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  );

  const renderCategories = () => (
    <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {categories.map((category) => (
          <CategoryButton key={category.id} category={category} />
        ))}
      </ScrollView>
    </View>
  );

  const headerRightComponent = (
    <TouchableOpacity
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.surfaceVariant,
        borderWidth: 1,
        borderColor: colors.borderLight,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Filter color={colors.primary} size={18} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <FixedHeader
        title="Achievements"
        subtitle={`${earnedCount} of ${totalCount} unlocked`}
        showBorder={showHeaderBorder}
        rightComponent={headerRightComponent}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {renderStats()}
        {renderCategories()}

        <View style={{ marginBottom: 20 }}>
          {filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
