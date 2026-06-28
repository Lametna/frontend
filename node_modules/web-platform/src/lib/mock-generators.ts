import type { User } from './mock-data';

const FIRST_NAMES = ['Ahmed', 'Sara', 'Omar', 'Nour', 'Youssef', 'Mariam', 'Ali', 'Hana', 'Karim', 'Laila', 'Mahmoud', 'Salma', 'Tariq', 'Farah', 'Ziad', 'Malak', 'Amir', 'Habiba', 'Hassan', 'Jana'];
const LAST_NAMES = ['Z', '99', 'AUC', 'x', '7', 'Gamer', 'Pro', 'Drift', 'King', 'Queen', 'Star', 'M', 'K', 'V', 'Elite', 'S', 'N', 'D', 'R', 'T'];
const PRESENCE_TEMPLATES = [
  'Playing Tarneeb Masters', 'Browsing Shop', 'In Party (3/4)', 'AFK', 'Watching Cairo Nights', 
  'Looking for a match', 'Ranked grinding', 'Just chatting', 'Customizing profile', 'Away'
];
const BIO_TEMPLATES = [
  'Casual gamer.', 'Competitive player.', 'Here for the vibes.', 'Add me for Ludo!', 
  'Cairo drift king. 🚗💨', 'Coffee and gaming ☕', 'Always in a party.', 'Streaming sometimes.',
  'Let us play!', 'GGs only.'
];

export function generateUsers(count: number): User[] {
  return Array.from({ length: count }).map((_, i) => {
    const fn = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const ln = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const statuses: User['status'][] = ['online', 'offline', 'in-game', 'in-party'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: `usr_${i + 6}`, // Offset by 5 hardcoded
      username: `${fn}_${ln}${Math.floor(Math.random() * 100)}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fn}${i}`,
      status,
      richPresence: status !== 'offline' && Math.random() > 0.3 ? PRESENCE_TEMPLATES[Math.floor(Math.random() * PRESENCE_TEMPLATES.length)] : undefined,
      level: Math.floor(Math.random() * 100) + 1,
      xp: Math.floor(Math.random() * 20000),
      coins: Math.floor(Math.random() * 5000),
      premiumCoins: Math.floor(Math.random() * 1000),
      bio: BIO_TEMPLATES[Math.floor(Math.random() * BIO_TEMPLATES.length)],
      badges: Math.random() > 0.5 ? ['Beta Tester'] : [],
    };
  });
}

export interface Message {
  id: string;
  senderId: string;
  conversationId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'image' | 'voice' | 'system';
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessageId?: string;
  updatedAt: string;
  unreadCount: number;
}

export function generateConversationsAndMessages(users: User[], convoCount: number) {
  const conversations: Conversation[] = [];
  const messages: Message[] = [];
  let msgCounter = 0;

  for (let i = 0; i < convoCount; i++) {
    const convoId = `conv_${i}`;
    const targetUser = users[Math.floor(Math.random() * users.length)];
    const participantIds = ['1', targetUser.id]; // Always involve CURRENT_USER ('1')
    
    const msgCount = Math.floor(Math.random() * 20) + 5; // 5 to 25 messages per convo
    
    for (let j = 0; j < msgCount; j++) {
      const isMe = Math.random() > 0.5;
      const senderId = isMe ? '1' : targetUser.id;
      
      messages.push({
        id: `msg_${msgCounter++}`,
        senderId,
        conversationId: convoId,
        text: `This is a generated message ${j} to simulate realistic chat flow.`,
        timestamp: new Date(Date.now() - (msgCount - j) * 3600000).toISOString(),
        isRead: isMe ? true : Math.random() > 0.3,
        type: 'text'
      });
    }

    conversations.push({
      id: convoId,
      participants: participantIds,
      lastMessageId: `msg_${msgCounter - 1}`,
      updatedAt: new Date().toISOString(),
      unreadCount: Math.floor(Math.random() * 3),
    });
  }

  return { conversations, messages };
}

export interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  memberCount: number;
  category: string;
  isJoined: boolean;
  trending: boolean;
}

export function generateCommunities(count: number): Community[] {
  const categories = ['Competitive', 'Casual', 'Racing', 'Card Games', 'Social', 'Local'];
  const prefixes = ['Cairo', 'Alex', 'Giza', 'MENA', 'Arab', 'Elite', 'Pro', 'Chill'];
  const suffixes = ['Gamers', 'Club', 'Masters', 'Squad', 'Legends', 'Syndicate'];

  return Array.from({ length: count }).map((_, i) => {
    return {
      id: `comm_${i}`,
      name: `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`,
      description: 'A great place to hang out, play games, and meet new people.',
      image: `https://images.unsplash.com/photo-${1550000000 + i}?q=80&w=200&auto=format&fit=crop`,
      memberCount: Math.floor(Math.random() * 10000) + 10,
      category: categories[Math.floor(Math.random() * categories.length)],
      isJoined: Math.random() > 0.8,
      trending: Math.random() > 0.9,
    };
  });
}

export interface Notification {
  id: string;
  type: 'social' | 'party' | 'message' | 'achievement' | 'system';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actorId?: string;
}

export function generateNotifications(count: number, users: User[]): Notification[] {
  const types: Notification['type'][] = ['social', 'party', 'achievement', 'system'];
  return Array.from({ length: count }).map((_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const actor = users[Math.floor(Math.random() * users.length)];
    
    let title = '';
    let description = '';
    
    switch(type) {
      case 'social':
        title = 'New Friend Request';
        description = `${actor.username} wants to be your friend.`;
        break;
      case 'party':
        title = 'Party Invite';
        description = `${actor.username} invited you to play Ludo.`;
        break;
      case 'achievement':
        title = 'Achievement Unlocked';
        description = `You unlocked "Weekend Warrior"!`;
        break;
      case 'system':
        title = 'System Update';
        description = 'Season 2 is starting soon. Check out the new rewards.';
        break;
    }

    return {
      id: `notif_${i}`,
      type,
      title,
      description,
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(), // Up to 7 days old
      isRead: Math.random() > 0.4,
      actorId: type === 'social' || type === 'party' ? actor.id : undefined,
    };
  });
}
