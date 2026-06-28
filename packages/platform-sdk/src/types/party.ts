import { User } from './user';

export interface PartyMember {
  userId: string;
  role: 'leader' | 'member';
  joinedAt: string;
  isReady: boolean;
  user?: User;
}

export interface Party {
  id: string;
  leaderId: string;
  members: PartyMember[];
  maxMembers: number;
  gameId?: string;
  status: 'open' | 'closed' | 'in-game';
  createdAt: string;
}
