import type { User } from './mock-data';


export interface LeaderboardEntry {
  id: string;
  userId: string;
  rank: number;
  score: number;
  trend: 'up' | 'down' | 'same';
  trendValue?: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  progress: number;
  target: number;
  xpReward: number;
  coinReward: number;
  isCompleted: boolean;
}

export interface Season {
  id: string;
  name: string;
  number: number;
  startDate: string;
  endDate: string;
  totalTiers: number;
  currentTier: number;
  xpPerTier: number;
  currentTierXP: number;
}

export function generateLeaderboard(users: User[], count: number): LeaderboardEntry[] {
  // Take random users and assign them ranks and scores
  const shuffledUsers = [...users].sort(() => 0.5 - Math.random()).slice(0, count);
  let currentScore = 50000 + Math.floor(Math.random() * 10000); // Start very high
  
  return shuffledUsers.map((user, i) => {
    const drop = Math.floor(Math.random() * 1000) + 100; // score drops for next rank
    currentScore -= drop;
    const trends: ('up' | 'down' | 'same')[] = ['up', 'down', 'same'];
    const trend = trends[Math.floor(Math.random() * trends.length)];
    
    return {
      id: `lb_${i}`,
      userId: user.id,
      rank: i + 1,
      score: currentScore,
      trend,
      trendValue: trend !== 'same' ? Math.floor(Math.random() * 5) + 1 : undefined,
    };
  });
}

export function generateChallenges(count: number, type: 'daily' | 'weekly'): Challenge[] {
  const actions = ['Win', 'Play', 'Score', 'Defeat', 'Assist in'];
  const targets = ['Matches', 'Points', 'Opponents', 'Games', 'Friends'];
  
  return Array.from({ length: count }).map((_, i) => {
    const target = type === 'daily' ? Math.floor(Math.random() * 10) + 5 : Math.floor(Math.random() * 50) + 20;
    const progress = Math.random() > 0.2 ? Math.floor(Math.random() * target) : target; // 20% chance completed
    const isCompleted = progress >= target;
    
    return {
      id: `chal_${type}_${i}`,
      title: `${actions[Math.floor(Math.random() * actions.length)]} ${target} ${targets[Math.floor(Math.random() * targets.length)]}`,
      description: `Complete this objective in any supported game mode.`,
      type,
      progress: isCompleted ? target : progress,
      target,
      xpReward: type === 'daily' ? 500 : 2500,
      coinReward: type === 'daily' ? 50 : 300,
      isCompleted,
    };
  });
}

export function generateSeasons(): Season[] {
  return [{
    id: 'season_2',
    name: 'Cairo Nights',
    number: 2,
    startDate: new Date(Date.now() - 30 * 86400000).toISOString(), // started 30 days ago
    endDate: new Date(Date.now() + 60 * 86400000).toISOString(), // ends in 60 days
    totalTiers: 100,
    currentTier: 34,
    xpPerTier: 10000,
    currentTierXP: 6500,
  }];
}
