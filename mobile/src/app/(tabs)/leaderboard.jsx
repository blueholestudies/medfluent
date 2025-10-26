import React, { useState } from "react";
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
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import { 
  Trophy,
  Medal,
  Crown,
  Star,
  Flame,
  Users,
  Calendar,
  TrendingUp
} from "lucide-react-native";
import { useAppTheme } from "@/utils/theme";
import FixedHeader from "@/components/FixedHeader";

export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedBoard, setSelectedBoard] = useState("global");
  const [showHeaderBorder, setShowHeaderBorder] = useState(false);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const periods = [
    { id: "week", name: "This Week", icon: Calendar },
    { id: "month", name: "This Month", icon: TrendingUp },
    { id: "all", name: "All Time", icon: Trophy },
  ];

  const boards = [
    { id: "global", name: "Global", icon: Trophy },
    { id: "class", name: "My Class", icon: Users },
    { id: "friends", name: "Friends", icon: Star },
  ];

  const leaderboardData = [
    {
      rank: 1,
      name: "Dr. Maria Rodriguez",
      avatar: "https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      xp: 2850,
      streak: 25,
      level: 12,
      specialty: "Emergency Medicine",
      isCurrentUser: false,
    },
    {
      rank: 2,
      name: "Dr. James Park",
      avatar: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      xp: 2650,
      streak: 18,
      level: 11,
      specialty: "Internal Medicine",
      isCurrentUser: false,
    },
    {
      rank: 3,
      name: "Dr. Sarah Chen",
      avatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      xp: 1580,
      streak: 12,
      level: 8,
      specialty: "Medical Student",
      isCurrentUser: true,
    },
    {
      rank: 4,
      name: "Dr. Ahmed Hassan",
      avatar: "https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      xp: 1420,
      streak: 9,
      level: 7,
      specialty: "Pediatrics",
      isCurrentUser: false,
    },
    {
      rank: 5,
      name: "Dr. Lisa Thompson",
      avatar: "https://images.pexels.com/photos/5452247/pexels-photo-5452247.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      xp: 1350,
      streak: 15,
      level: 7,
      specialty: "Surgery",
      isCurrentUser: false,
    },
  ];

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowHeaderBorder(offsetY > 10);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown color={colors.coins} size={24} />;
      case 2:
        return <Medal color="#C0C0C0" size={24} />;
      case 3:
        return <Medal color="#CD7F32" size={24} />;
      default:
        return (
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: colors.surfaceVariant,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Montserrat_600SemiBold",
                color: colors.primary,
              }}
            >
              {rank}
            </Text>
          </View>
        );
    }
  };

  const getRankBackgroundColor = (rank, isCurrentUser) => {
    if (isCurrentUser) {
      return colors.medicalLight;
    }
    
    switch (rank) {
      case 1:
        return colors.yellowLight;
      case 2:
        return colors.surfaceVariant;
      case 3:
        return colors.orangeLight;
      default:
        return colors.surface;
    }
  };

  const PeriodButton = ({ period }) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        backgroundColor: selectedPeriod === period.id ? colors.medical : colors.surfaceVariant,
        marginRight: 8,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={() => setSelectedPeriod(period.id)}
    >
      <period.icon 
        color={selectedPeriod === period.id ? "#FFFFFF" : colors.primary} 
        size={16} 
        style={{ marginRight: 6 }}
      />
      <Text
        style={{
          fontSize: 12,
          fontFamily: "Montserrat_600SemiBold",
          color: selectedPeriod === period.id ? "#FFFFFF" : colors.primary,
        }}
      >
        {period.name}
      </Text>
    </TouchableOpacity>
  );

  const BoardButton = ({ board }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: selectedBoard === board.id ? colors.medical : "transparent",
      }}
      onPress={() => setSelectedBoard(board.id)}
    >
      <board.icon 
        color={selectedBoard === board.id ? colors.medical : colors.secondary} 
        size={20}
        style={{ marginBottom: 4 }}
      />
      <Text
        style={{
          fontSize: 12,
          fontFamily: "Montserrat_600SemiBold",
          color: selectedBoard === board.id ? colors.medical : colors.secondary,
        }}
      >
        {board.name}
      </Text>
    </TouchableOpacity>
  );

  const LeaderboardItem = ({ user }) => (
    <View
      style={{
        backgroundColor: getRankBackgroundColor(user.rank, user.isCurrentUser),
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 20,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: user.isCurrentUser ? 2 : 1,
        borderColor: user.isCurrentUser ? colors.medical : colors.borderLight,
      }}
    >
      {/* Rank */}
      <View style={{ marginRight: 16 }}>
        {getRankIcon(user.rank)}
      </View>

      {/* Avatar */}
      <Image
        source={{ uri: user.avatar }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: 12,
          borderWidth: 2,
          borderColor: user.isCurrentUser ? colors.medical : colors.borderLight,
        }}
      />

      {/* User Info */}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Montserrat_600SemiBold",
              color: colors.primary,
              flex: 1,
            }}
          >
            {user.name}
          </Text>
          {user.isCurrentUser && (
            <View
              style={{
                backgroundColor: colors.medical,
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
                }}
              >
                YOU
              </Text>
            </View>
          )}
        </View>

        <Text
          style={{
            fontSize: 12,
            fontFamily: "Montserrat_500Medium",
            color: colors.secondary,
            marginBottom: 8,
          }}
        >
          {user.specialty} • Level {user.level}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginRight: 16 }}>
            <Star color={colors.xp} size={14} style={{ marginRight: 4 }} />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Montserrat_600SemiBold",
                color: colors.primary,
              }}
            >
              {user.xp.toLocaleString()}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Flame color={colors.streak} size={14} style={{ marginRight: 4 }} />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Montserrat_600SemiBold",
                color: colors.primary,
              }}
            >
              {user.streak}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderTopThree = () => {
    const topThree = leaderboardData.slice(0, 3);
    
    return (
      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 20,
            padding: 20,
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
              marginBottom: 20,
            }}
          >
            🏆 Top Performers
          </Text>

          <View style={{ flexDirection: "row", alignItems: "end", justifyContent: "center" }}>
            {/* 2nd Place */}
            <View style={{ alignItems: "center", marginHorizontal: 8 }}>
              <View
                style={{
                  backgroundColor: colors.surfaceVariant,
                  borderRadius: 40,
                  padding: 4,
                  marginBottom: 8,
                }}
              >
                <Image
                  source={{ uri: topThree[1].avatar }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                  }}
                />
              </View>
              <Medal color="#C0C0C0" size={20} style={{ marginBottom: 4 }} />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Montserrat_600SemiBold",
                  color: colors.primary,
                  textAlign: "center",
                }}
              >
                {topThree[1].name.split(' ')[1]}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Montserrat_500Medium",
                  color: colors.secondary,
                }}
              >
                {topThree[1].xp.toLocaleString()}
              </Text>
            </View>

            {/* 1st Place */}
            <View style={{ alignItems: "center", marginHorizontal: 8 }}>
              <View
                style={{
                  backgroundColor: colors.yellowLight,
                  borderRadius: 45,
                  padding: 4,
                  marginBottom: 8,
                }}
              >
                <Image
                  source={{ uri: topThree[0].avatar }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                  }}
                />
              </View>
              <Crown color={colors.coins} size={24} style={{ marginBottom: 4 }} />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Montserrat_600SemiBold",
                  color: colors.primary,
                  textAlign: "center",
                }}
              >
                {topThree[0].name.split(' ')[1]}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Montserrat_500Medium",
                  color: colors.secondary,
                }}
              >
                {topThree[0].xp.toLocaleString()}
              </Text>
            </View>

            {/* 3rd Place */}
            <View style={{ alignItems: "center", marginHorizontal: 8 }}>
              <View
                style={{
                  backgroundColor: colors.orangeLight,
                  borderRadius: 40,
                  padding: 4,
                  marginBottom: 8,
                }}
              >
                <Image
                  source={{ uri: topThree[2].avatar }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                  }}
                />
              </View>
              <Medal color="#CD7F32" size={20} style={{ marginBottom: 4 }} />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Montserrat_600SemiBold",
                  color: colors.primary,
                  textAlign: "center",
                }}
              >
                {topThree[2].name.split(' ')[1]}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Montserrat_500Medium",
                  color: colors.secondary,
                }}
              >
                {topThree[2].xp.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderFilters = () => (
    <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
      {/* Period Selection */}
      <View style={{ marginBottom: 16 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {periods.map((period) => (
            <PeriodButton key={period.id} period={period} />
          ))}
        </ScrollView>
      </View>

      {/* Board Selection */}
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          flexDirection: "row",
          borderWidth: 1,
          borderColor: colors.borderLight,
        }}
      >
        {boards.map((board) => (
          <BoardButton key={board.id} board={board} />
        ))}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <FixedHeader
        title="Leaderboard"
        subtitle="Compete with fellow medical students"
        showBorder={showHeaderBorder}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {renderTopThree()}
        {renderFilters()}

        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Montserrat_600SemiBold",
              color: colors.primary,
              marginHorizontal: 20,
              marginBottom: 16,
            }}
          >
            Full Rankings
          </Text>
          
          {leaderboardData.map((user) => (
            <LeaderboardItem key={user.rank} user={user} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}