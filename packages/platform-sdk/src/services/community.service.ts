import { BaseService } from './base';
import { Community } from '../types';

export class CommunityService extends BaseService {
  constructor() {
    super('CommunityService');
  }

  public async getCommunities(): Promise<Community[]> {
    const response = await this.api.get<Community[]>('/communities');
    return response.data;
  }

  public async joinCommunity(communityId: string): Promise<void> {
    await this.api.post(`/communities/${communityId}/join`);
    this.events.publish('community.joined', { communityId });
  }

  public async leaveCommunity(communityId: string): Promise<void> {
    await this.api.post(`/communities/${communityId}/leave`);
    this.events.publish('community.left', { communityId });
  }
}

export const communityService = new CommunityService();
