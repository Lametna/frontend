import { generateUsers, generateConversationsAndMessages, generateCommunities, generateNotifications } from './mock-generators';
import { generateGames } from './mock-games';
import { generateLeaderboard, generateChallenges, generateSeasons } from './mock-gaming-meta';

export type { Notification, Community, Conversation, Message } from './mock-generators';
export type { Game } from './mock-games';
export type { LeaderboardEntry, Challenge, Season } from './mock-gaming-meta';

export interface User {
  id: string;
  username: string;
  avatar: string;
  banner?: string;
  status: 'online' | 'offline' | 'in-game' | 'in-party';
  richPresence?: string;
  level: number;
  xp: number;
  coins: number;
  premiumCoins: number;
  bio: string;
  badges: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  dateUnlocked?: string;
  progress?: number;
  total?: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  type: 'avatar_frame' | 'banner' | 'profile_theme' | 'emoji_pack' | 'bundle';
  price: number;
  currency: 'coins' | 'premium';
  image: string;
  isFeatured?: boolean;
  discount?: number;
}



export interface Activity {
  id: string;
  userId: string;
  type: 'achievement' | 'played' | 'party';
  content: string;
  timestamp: string;
}

export const MOCK_USERS: User[] = [
  { id: '1', username: 'Ahmed_Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed', banner: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop', status: 'in-game', richPresence: 'Playing Tarneeb Masters', level: 42, xp: 8500, coins: 1250, premiumCoins: 300, bio: 'Cairo drift king. 🚗💨', badges: ['Beta Tester', 'Top 1%'] },
  { id: '2', username: 'Sara_99', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara', status: 'online', richPresence: 'Browsing Shop', level: 28, xp: 4200, coins: 500, premiumCoins: 0, bio: 'Just here for the vibes and coffee.', badges: ['Social Butterfly'] },
  { id: '3', username: 'Omar_AUC', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar', status: 'in-party', richPresence: 'In Party (3/4)', level: 55, xp: 12400, coins: 3400, premiumCoins: 1200, bio: 'Competitive Ludo player.', badges: ['Tournament Winner', 'VIP'] },
  { id: '4', username: 'Nour_x', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nour', status: 'offline', level: 12, xp: 1500, coins: 100, premiumCoins: 0, bio: 'Casual gamer.', badges: [] },
  { id: '5', username: 'Youssef_7', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef', status: 'online', level: 33, xp: 6700, coins: 890, premiumCoins: 50, bio: 'Football fan.', badges: ['1 Year MVP'] },
];



export const MOCK_ACTIVITY: Activity[] = [
  { id: 'a1', userId: '1', type: 'achievement', content: 'Unlocked "Drift King" in Cairo Nights Racing', timestamp: '10 mins ago' },
  { id: 'a2', userId: '3', type: 'played', content: 'Won a 4-player match in Ludo Royal', timestamp: '1 hour ago' },
  { id: 'a3', userId: '2', type: 'party', content: 'Created a new party "Weekend Vibes"', timestamp: '2 hours ago' },
];

export const MOCK_SHOP_ITEMS: ShopItem[] = [
  { id: 's1', name: 'Neon Nights Frame', description: 'Animated neon border for your avatar.', type: 'avatar_frame', price: 500, currency: 'coins', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=200&auto=format&fit=crop', isFeatured: true },
  { id: 's2', name: 'Golden VIP Banner', description: 'Show off your status.', type: 'banner', price: 150, currency: 'premium', image: 'https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=800&auto=format&fit=crop' },
  { id: 's3', name: 'Cairo Calligraphy Theme', description: 'Elegant dark theme with golden Arabic calligraphy accents.', type: 'profile_theme', price: 300, currency: 'premium', image: 'https://images.unsplash.com/photo-1584384950672-358b5b7f9202?q=80&w=800&auto=format&fit=crop', isFeatured: true, discount: 20 },
  { id: 's4', name: 'Coffee Cup Emoji Pack', description: 'Express yourself with Ahwa essentials.', type: 'emoji_pack', price: 200, currency: 'coins', image: 'https://images.unsplash.com/photo-1542282811-943ef1a6470b?q=80&w=200&auto=format&fit=crop' },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: 'ac1', title: 'First Blood', description: 'Win your first game.', icon: '🏆', rarity: 'common', dateUnlocked: '2025-10-01' },
  { id: 'ac2', title: 'Social Butterfly', description: 'Add 50 friends.', icon: '🦋', rarity: 'rare', progress: 42, total: 50 },
  { id: 'ac3', title: 'Drift King', description: 'Maintain a 10s drift in Cairo Nights.', icon: '🏎️', rarity: 'epic', dateUnlocked: '2026-01-15' },
  { id: 'ac4', title: 'Lametna Legend', description: 'Reach Level 100.', icon: '👑', rarity: 'legendary', progress: 42, total: 100 },
];

export const CURRENT_USER = MOCK_USERS[0];

// --- Generated Data Sets --- //
export const EXTENDED_USERS = [...MOCK_USERS, ...generateUsers(195)]; // Total 200 users
export const { conversations: MOCK_CONVERSATIONS, messages: MOCK_MESSAGES } = generateConversationsAndMessages(EXTENDED_USERS, 75);
export const MOCK_COMMUNITIES = generateCommunities(100);
export const MOCK_NOTIFICATIONS = generateNotifications(50, EXTENDED_USERS);

export const MOCK_GAMES = generateGames(100);
export const MOCK_LEADERBOARD = generateLeaderboard(EXTENDED_USERS, 50);
export const MOCK_DAILY_CHALLENGES = generateChallenges(10, 'daily');
export const MOCK_WEEKLY_CHALLENGES = generateChallenges(5, 'weekly');
export const MOCK_SEASONS = generateSeasons();

