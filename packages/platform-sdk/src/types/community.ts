export interface Community {
  id: string;
  name: string;
  description: string;
  avatarUrl?: string;
  bannerUrl?: string;
  membersCount: number;
  isPrivate: boolean;
  createdAt: string;
}

export interface CommunityMember {
  communityId: string;
  userId: string;
  role: 'owner' | 'admin' | 'moderator' | 'member';
  joinedAt: string;
}
