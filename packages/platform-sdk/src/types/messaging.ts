import { User } from './user';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'system';
  createdAt: string;
  readAt?: string;
  sender?: User;
}

export interface Conversation {
  id: string;
  type: 'direct' | 'group';
  name?: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}
