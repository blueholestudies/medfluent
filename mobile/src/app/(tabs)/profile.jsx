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
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import { 
  Settings,
  Edit3,
  Award,
  TrendingUp,
  Calendar,
  Clock,
  Target,
  Flame,
  Star,
  Coins,
  Heart
} from "lucide-react-native";
import { router } from "expo-router";
import { useAppTheme } from "@/utils/theme";
import FixedHeader from "@/components/FixedHeader";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();
  const [showHeaderBorder, setShowHeaderBorder] = useState(false);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const stats = [
    { label: "Streak", value: "12", icon: Flame, color: colors.streak },
    { label: "Total XP", value: "1,580", icon: Star, color: colors.xp },
    { label: "Coins", value: "350", icon: Coins, color: colors.coins },
    { label: "Hearts", value: "4/5", icon: Heart, color: colors.hearts },
  ];

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🏥",
      earned: true,
      date: "Nov 15, 2024",
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: "🔥",
      earned: true,
      date: "Nov 20, 2024",
    },
    {
      id: 3,
      title: "ER Expert",
      description: "Complete Emergency Room unit",
      icon: "⚡",
      earned: false,
      progress: 85,
    },
    {
      id: 4,
      title: "Spanish Speaker",
      description: "Complete 100 speaking exercises",
      icon: "🗣️",
      earned: false,
      progress: 45,
    },
  ];

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowHeaderBorder(offsetY > 10);
  };

  const StatCard = ({ stat }) => (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 4,
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.borderLight,
      }}
    >
      <stat.icon color={stat.color} size={24} style={{ marginBottom: 8 }} />
      <Text
        style={{
          fontSize: 18,
          fontFamily: "Montserrat_600SemiBold",
          color: colors.primary,
          marginBottom: 4,
        }}
      >
        {stat.value}
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontFamily: "Montserrat_500Medium",
          color: colors.secondary,
          textAlign: "center",
        }}
      >
        {stat.label}
      </Text>
    </View>
  );

  const AchievementCard = ({ achievement }) => (
    <TouchableOpacity
      style={{
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 20,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.borderLight,
        opacity: achievement.earned ? 1 : 0.7,
      }}
    >
      <Text style={{ fontSize: 32, marginRight: 16 }}>{achievement.icon}</Text>
      
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Montserrat_600SemiBold",
            color: colors.primary,
            marginBottom: 4,
          }}
        >
          {achievement.title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Montserrat_400Regular",
            color: colors.secondary,
            marginBottom: achievement.earned ? 8 : 0,
          }}
        >
          {achievement.description}
        </Text>
        
        {achievement.earned && (
          <Text
            style={{
              fontSize: 10,
              fontFamily: "Montserrat_500Medium",
              color: colors.success,
            }}
          >
            Earned on {achievement.date}
          </Text>
        )}
        
        {!achievement.earned && achievement.progress && (
          <View style={{ marginTop: 8 }}>
            <View
              style={{
                height: 4,
                backgroundColor: colors.surfaceVariant,
                borderRadius: 2,
                marginBottom: 4,
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${achievement.progress}%`,
                  backgroundColor: colors.medical,
                  borderRadius: 2,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Montserrat_500Medium",
                color: colors.secondary,
              }}
            >
              {achievement.progress}% complete
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderAvatarSection = () => (
    <View
      style={{
        backgroundColor: colors.surface,
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.borderLight,
      }}
    >
      <View style={{ position: "relative", marginBottom: 16 }}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 4,
            borderColor: colors.medical,
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: colors.medical,
            borderRadius: 16,
            padding: 8,
            borderWidth: 2,
            borderColor: colors.surface,
          }}
          onPress={() => router.push("/avatar-editor")}
        >
          <Edit3 color="#FFFFFF" size={16} />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: 20,
          fontFamily: "Montserrat_600SemiBold",
          color: colors.primary,
          marginBottom: 4,
        }}
      >
        Dr. Sarah Chen
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Montserrat_500Medium",
          color: colors.secondary,
          marginBottom: 16,
        }}
      >
        Medical Student • Level 8
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: colors.medical,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 20,
        }}
        onPress={() => router.push("/avatar-editor")}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Montserrat_600SemiBold",
            color: "#FFFFFF",
          }}
        >
          Customize Avatar
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderStats = () => (
    <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 18,
          fontFamily: "Montserrat_600SemiBold",
          color: colors.primary,
          marginBottom: 16,
        }}
      >
        Your Stats
      </Text>
      
      <View style={{ flexDirection: "row", marginHorizontal: -4 }}>
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </View>
    </View>
  );

  const renderAchievements = () => (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Montserrat_600SemiBold",
            color: colors.primary,
          }}
        >
          Recent Achievements
        </Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/achievements")}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Montserrat_500Medium",
              color: colors.medical,
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>
      
      {achievements.slice(0, 3).map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </View>
  );

  const renderQuickActions = () => (
    <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 18,
          fontFamily: "Montserrat_600SemiBold",
          color: colors.primary,
          marginBottom: 16,
        }}
      >
        Quick Actions
      </Text>

      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: colors.borderLight,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.borderLight,
          }}
          onPress={() => router.push("/settings")}
        >
          <Settings color={colors.primary} size={20} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Montserrat_500Medium",
              color: colors.primary,
              marginLeft: 12,
            }}
          >
            Settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.borderLight,
          }}
          onPress={() => router.push("/progress")}
        >
          <TrendingUp color={colors.primary} size={20} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Montserrat_500Medium",
              color: colors.primary,
              marginLeft: 12,
            }}
          >
            Progress Report
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
          onPress={() => router.push("/(tabs)/shop")}
        >
          <Award color={colors.primary} size={20} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Montserrat_500Medium",
              color: colors.primary,
              marginLeft: 12,
            }}
          >
            Shop & Rewards
          </Text>
        </TouchableOpacity>
      </View>
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
      onPress={() => router.push("/settings")}
    >
      <Settings color={colors.primary} size={18} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <FixedHeader
        title="Profile"
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
        {renderAvatarSection()}
        {renderStats()}
        {renderAchievements()}
        {renderQuickActions()}
      </ScrollView>
    </View>
  );
}