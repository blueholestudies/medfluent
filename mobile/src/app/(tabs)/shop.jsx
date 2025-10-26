import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
  ShoppingBag,
  Coins,
  Star,
  Crown,
  Sparkles,
  CheckCircle,
  ArrowLeft,
} from "lucide-react-native";
import { router } from "expo-router";
import { useAppTheme } from "@/utils/theme";
import { useGameStore } from "@/store/gameStore";

export default function ShopScreen() {
  const insets = useSafeAreaInsets();
  const { colors, tokens, isDark } = useAppTheme();
  const { coins, shopItems, purchaseItem, inventory } = useGameStore();
  const [selectedCategory, setSelectedCategory] = useState("scrubs");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const categories = [
    { id: "scrubs", name: "Scrubs", icon: "👔" },
    { id: "scrubCaps", name: "Scrub Caps", icon: "🧢" },
    { id: "accessories", name: "Accessories", icon: "✨" },
    { id: "badges", name: "Badges", icon: "🏆" },
  ];

  const rarityColors = {
    common: colors.textMuted,
    rare: colors.info,
    epic: colors.accent,
    legendary: colors.warning,
  };

  const rarityIcons = {
    common: Star,
    rare: Sparkles,
    epic: Crown,
    legendary: Crown,
  };

  const filteredItems = shopItems.filter(
    (item) => item.type === selectedCategory,
  );

  const renderHeader = () => (
    <View
      style={{
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: insets.top + 10,
        paddingBottom: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
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

        <Text
          style={{
            fontSize: 20,
            fontFamily: "Inter_600SemiBold",
            color: colors.text,
          }}
        >
          MedFluent Shop
        </Text>

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
      </View>

      {/* Dr. Corazón with speech bubble */}
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: tokens.radii.lg,
          padding: 16,
          marginBottom: 20,
          ...tokens.shadow.sm,
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
              Customize your medical avatar with stylish scrubs and accessories!
              👔✨
            </Text>
          </View>
        </View>
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
          <TouchableOpacity
            key={category.id}
            style={{
              backgroundColor:
                selectedCategory === category.id
                  ? colors.primary
                  : colors.surface,
              borderRadius: tokens.radii.lg,
              paddingHorizontal: 16,
              paddingVertical: 12,
              marginRight: 12,
              flexDirection: "row",
              alignItems: "center",
              ...tokens.shadow.sm,
            }}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={{ fontSize: 16, marginRight: 8 }}>
              {category.icon}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter_600SemiBold",
                color:
                  selectedCategory === category.id ? "#FFFFFF" : colors.text,
              }}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const ShopItemCard = ({ item }) => {
    const RarityIcon = rarityIcons[item.rarity];
    const isOwned = item.owned;
    const canAfford = coins >= item.price;

    return (
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: tokens.radii.lg,
          padding: 16,
          marginHorizontal: 20,
          marginBottom: 16,
          ...tokens.shadow.sm,
          borderWidth:
            item.rarity === "legendary" || item.rarity === "epic" ? 2 : 0,
          borderColor: rarityColors[item.rarity],
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          {/* Item Preview */}
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: tokens.radii.md,
              backgroundColor: colors.muted,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <Text style={{ fontSize: 24 }}>
              {item.type === "scrubs"
                ? "👔"
                : item.type === "scrubCaps"
                  ? "🧢"
                  : item.type === "badges"
                    ? "🏆"
                    : "✨"}
            </Text>
          </View>

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
                  fontFamily: "Inter_600SemiBold",
                  color: colors.text,
                  flex: 1,
                }}
              >
                {item.name}
              </Text>
              <RarityIcon color={rarityColors[item.rarity]} size={16} />
            </View>

            <Text
              style={{
                fontSize: 12,
                fontFamily: "Inter_400Regular",
                color: colors.textMuted,
                marginBottom: 8,
              }}
            >
              {item.description}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Coins color={colors.coins} size={16} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_600SemiBold",
                    color: colors.text,
                    marginLeft: 4,
                  }}
                >
                  {item.price}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: isOwned
                    ? colors.success
                    : canAfford
                      ? colors.primary
                      : colors.muted,
                  borderRadius: tokens.radii.sm,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
                onPress={() => {
                  if (!isOwned && canAfford) {
                    purchaseItem(item.id);
                  }
                }}
                disabled={isOwned || !canAfford}
              >
                {isOwned ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <CheckCircle color="#FFFFFF" size={16} />
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_600SemiBold",
                        color: "#FFFFFF",
                        marginLeft: 4,
                      }}
                    >
                      Owned
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter_600SemiBold",
                      color: "#FFFFFF",
                    }}
                  >
                    {canAfford ? "Buy" : "Need more coins"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
        {renderCategories()}

        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ShopItemCard key={item.id} item={item} />
          ))
        ) : (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <ShoppingBag color={colors.textMuted} size={48} />
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter_500Medium",
                color: colors.textMuted,
                marginTop: 16,
              }}
            >
              Coming soon!
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Inter_400Regular",
                color: colors.textMuted,
                marginTop: 4,
                textAlign: "center",
              }}
            >
              More items will be added to this category
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
