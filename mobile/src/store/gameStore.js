import { create } from 'zustand';

// MedFluent game state store
export const useGameStore = create((set, get) => ({
  // User stats
  user: {
    id: null,
    username: "Dr. Sarah",
    avatar: {
      base: "female_1",
      skinTone: "medium",
      hair: "brown_wavy",
      scrubs: "teal_basic",
      scrubCap: "none",
      badge: "student",
      stethoscope: "basic_black"
    }
  },

  // Gamification
  xp: 1250,
  coins: 485,
  hearts: 5,
  streak: 8,
  level: 12,
  maxHearts: 5,
  
  // Daily goals
  dailyGoals: {
    xpTarget: 100,
    xpCurrent: 65,
    lessonsTarget: 3,
    lessonsCurrent: 2,
    speakingTarget: 1,
    speakingCurrent: 0
  },

  // Progress
  currentUnit: 1,
  unlockedUnits: [1, 2],
  completedLessons: ["u1l1", "u1l2", "u1l3", "u1l4", "u1l5", "u2l1", "u2l2"],
  
  // Inventory & cosmetics
  inventory: {
    scrubs: ["teal_basic", "blue_scrubs", "pink_scrubs"],
    scrubCaps: ["blue_cap"],
    badges: ["student", "intern"],
    stethoscopes: ["basic_black"]
  },
  
  // Shop items
  shopItems: [
    {
      id: "navy_scrubs",
      type: "scrubs",
      name: "Navy Professional Scrubs",
      description: "Classic navy scrubs for a professional look",
      price: 200,
      rarity: "common",
      owned: false
    },
    {
      id: "rainbow_cap",
      type: "scrubCaps", 
      name: "Rainbow Scrub Cap",
      description: "Show your pride with this colorful cap",
      price: 150,
      rarity: "rare",
      owned: false
    },
    {
      id: "gold_stethoscope",
      type: "stethoscopes",
      name: "Golden Stethoscope",
      description: "A premium golden stethoscope",
      price: 500,
      rarity: "epic",
      owned: false
    }
  ],

  // Actions
  addXP: (amount) => set(state => ({ 
    xp: state.xp + amount,
    dailyGoals: {
      ...state.dailyGoals,
      xpCurrent: Math.min(state.dailyGoals.xpCurrent + amount, state.dailyGoals.xpTarget)
    }
  })),
  
  addCoins: (amount) => set(state => ({ coins: state.coins + amount })),
  
  spendCoins: (amount) => set(state => {
    if (state.coins >= amount) {
      return { coins: state.coins - amount };
    }
    return state;
  }),
  
  loseHeart: () => set(state => ({
    hearts: Math.max(0, state.hearts - 1)
  })),
  
  gainHeart: () => set(state => ({
    hearts: Math.min(state.maxHearts, state.hearts + 1)
  })),
  
  incrementStreak: () => set(state => ({ streak: state.streak + 1 })),
  
  resetStreak: () => set(() => ({ streak: 0 })),
  
  completeLesson: (lessonId) => set(state => {
    if (!state.completedLessons.includes(lessonId)) {
      return {
        completedLessons: [...state.completedLessons, lessonId],
        dailyGoals: {
          ...state.dailyGoals,
          lessonsCurrent: Math.min(
            state.dailyGoals.lessonsCurrent + 1,
            state.dailyGoals.lessonsTarget
          )
        }
      };
    }
    return state;
  }),
  
  unlockUnit: (unitId) => set(state => ({
    unlockedUnits: [...new Set([...state.unlockedUnits, unitId])]
  })),
  
  updateAvatar: (avatarUpdates) => set(state => ({
    user: {
      ...state.user,
      avatar: { ...state.user.avatar, ...avatarUpdates }
    }
  })),
  
  purchaseItem: (itemId) => set(state => {
    const item = state.shopItems.find(i => i.id === itemId);
    if (item && state.coins >= item.price && !item.owned) {
      return {
        coins: state.coins - item.price,
        inventory: {
          ...state.inventory,
          [item.type]: [...state.inventory[item.type], itemId]
        },
        shopItems: state.shopItems.map(i => 
          i.id === itemId ? { ...i, owned: true } : i
        )
      };
    }
    return state;
  }),

  // Lesson completion with rewards
  completeLessonWithRewards: (lessonId, xpReward = 15, coinReward = 5) => {
    const state = get();
    set({
      xp: state.xp + xpReward,
      coins: state.coins + coinReward,
      completedLessons: state.completedLessons.includes(lessonId) 
        ? state.completedLessons 
        : [...state.completedLessons, lessonId],
      dailyGoals: {
        ...state.dailyGoals,
        xpCurrent: Math.min(
          state.dailyGoals.xpCurrent + xpReward,
          state.dailyGoals.xpTarget
        ),
        lessonsCurrent: state.completedLessons.includes(lessonId)
          ? state.dailyGoals.lessonsCurrent
          : Math.min(
              state.dailyGoals.lessonsCurrent + 1,
              state.dailyGoals.lessonsTarget
            )
      }
    });
  }
}));