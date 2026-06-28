export interface User {
  id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  userId: string;
  bio?: string;
  location?: string;
  socialLinks?: Record<string, string>;
  preferences: Record<string, any>;
}

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: string;
  user?: User; // Joined related user
}
