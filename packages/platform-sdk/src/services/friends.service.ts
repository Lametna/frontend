import { BaseService } from './base';
import { Friend } from '../types';

export class FriendsService extends BaseService {
  constructor() {
    super('FriendsService');
  }

  public async getFriends(): Promise<Friend[]> {
    const response = await this.api.get<Friend[]>('/friends');
    return response.data;
  }

  public async sendRequest(userId: string): Promise<Friend> {
    const response = await this.api.post<Friend>('/friends/request', { userId });
    this.events.publish('friend.request_sent', response.data);
    return response.data;
  }

  public async acceptRequest(friendId: string): Promise<Friend> {
    const response = await this.api.post<Friend>(`/friends/${friendId}/accept`);
    this.events.publish('friend.request_accepted', response.data);
    return response.data;
  }

  public async removeFriend(friendId: string): Promise<void> {
    await this.api.delete(`/friends/${friendId}`);
    this.events.publish('friend.removed', { friendId });
  }
}

export const friendsService = new FriendsService();
