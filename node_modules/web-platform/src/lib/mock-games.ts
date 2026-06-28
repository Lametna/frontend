export interface Game {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  bannerImage: string;
  category: string;
  tags: string[];
  playerCount: { min: number; max: number };
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  estimatedDuration: number; // in minutes
  rating: number; // 0-5
  popularity: number; // For trending sort
  releaseDate: string;
  isNew: boolean;
  isTrending: boolean;
  developer: string;
  version: string;
  heroVideo?: string;
  activePlayers: number;
}

const CATEGORIES = ['Card Games', 'Board Games', 'Party Games', 'Quiz & Trivia', 'Word Games', 'Memory Games', 'Social Games', 'Strategy'];
const TAGS = ['Co-op', 'Competitive', 'Fast-paced', 'Brain Teaser', 'Family Friendly', 'Voice Enabled', 'Ranked', 'Casual', 'Classic', 'Multiplayer'];
const DIFFICULTIES: Game['difficulty'][] = ['Easy', 'Medium', 'Hard', 'Expert'];
const DEV_NAMES = ['Lametna Studios', 'Cairo Night Games', 'MENA Interactive', 'Desert Fox Games'];

const GAME_TITLES = [
  'Tarneeb Masters', 'Ludo Royale', 'Dominoes Legends', 'Baloot Pro', 'Trix Complex', 'Word Chase', 
  'Quiz Arena', 'Draw & Guess', 'Spyfall (Arabic)', 'Mafia Nights', 'Memory Match', 'Chess Connect',
  'Checkers King', 'Backgammon Elite', 'Rummy Gold', 'Okey 101', 'Hearts Deluxe', 'Spades Pro',
  'Uno Rush', 'Crazy Eights', 'Bingo Night', 'Slots of Cairo', 'Riddle Me This', 'Trivia Crackdown',
  'Hangman 3D', 'Scrabble MENA', 'Bidaai', 'Camel Race', 'Oud Hero', 'Dabke Dance Off'
];

export function generateGames(count: number): Game[] {
  const games: Game[] = [];
  
  for (let i = 0; i < count; i++) {
    const titleBase = GAME_TITLES[i % GAME_TITLES.length];
    const suffix = i >= GAME_TITLES.length ? ` ${Math.floor(i / GAME_TITLES.length) + 1}` : '';
    const title = `${titleBase}${suffix}`;
    
    // Pick 2-4 random tags
    const numTags = Math.floor(Math.random() * 3) + 2;
    const gameTags = [...TAGS].sort(() => 0.5 - Math.random()).slice(0, numTags);
    
    games.push({
      id: `game_${i}`,
      title,
      description: `Experience the thrill of ${title}. Play with friends, join tournaments, and climb the leaderboards in this highly addictive ${gameTags[0].toLowerCase()} game.`,
      coverImage: `https://images.unsplash.com/photo-${1600000000 + i}?auto=format&fit=crop&q=80&w=400&h=600`, // Portrait cover
      bannerImage: `https://images.unsplash.com/photo-${1600000000 + i}?auto=format&fit=crop&q=80&w=1920&h=600`, // Wide banner
      category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      tags: gameTags,
      playerCount: {
        min: Math.floor(Math.random() * 2) + 1, // 1 to 2
        max: Math.floor(Math.random() * 6) + 4  // 4 to 9
      },
      difficulty: DIFFICULTIES[Math.floor(Math.random() * DIFFICULTIES.length)],
      estimatedDuration: Math.floor(Math.random() * 30) + 5, // 5 to 35 mins
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5 to 5.0
      popularity: Math.floor(Math.random() * 100000),
      releaseDate: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      isNew: Math.random() > 0.8,
      isTrending: Math.random() > 0.85,
      developer: DEV_NAMES[Math.floor(Math.random() * DEV_NAMES.length)],
      version: `1.${Math.floor(Math.random() * 20)}.${Math.floor(Math.random() * 10)}`,
      heroVideo: i === 0 ? 'https://cdn.coverr.co/videos/coverr-playing-cards-4261/1080p.mp4' : undefined,
      activePlayers: Math.floor(Math.random() * 50000) + 1000,
    });
  }
  
  return games;
}
