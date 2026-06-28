export interface Game {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  maxPlayers: number;
  status: 'active' | 'maintenance' | 'coming-soon';
}

export interface Achievement {
  id: string;
  gameId?: string;
  title: string;
  description: string;
  iconUrl: string;
  points: number;
  isHidden: boolean;
}

export interface Leaderboard {
  id: string;
  gameId: string;
  period: 'daily' | 'weekly' | 'all-time';
  entries: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  userId: string;
  score: number;
  rank: number;
  updatedAt: string;
}

export interface Currency {
  id: string;
  name: string;
  code: string;
  symbol: string;
  amount: number;
}

export interface InventoryItem {
  id: string;
  userId: string;
  itemId: string;
  quantity: number;
  acquiredAt: string;
}
