import { BaseService } from './base';
import { Profile } from '../types';

export class ProfileService extends BaseService {
  constructor() {
    super('ProfileService');
  }

  public async getProfile(userId: string): Promise<Profile> {
    const response = await this.api.get<Profile>(`/profiles/${userId}`);
    return response.data;
  }

  public async updateProfile(userId: string, data: Partial<Profile>): Promise<Profile> {
    const response = await this.api.patch<Profile>(`/profiles/${userId}`, data);
    this.events.publish('profile.updated', response.data);
    return response.data;
  }
}

export const profileService = new ProfileService();
