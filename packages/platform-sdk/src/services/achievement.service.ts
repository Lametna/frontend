import { BaseService } from './base';
import { Achievement } from '../types';

export class AchievementService extends BaseService {
  constructor() {
    super('AchievementService');
  }

  public async getAchievements(gameId?: string): Promise<Achievement[]> {
    const response = await this.api.get<Achievement[]>('/achievements', { params: { gameId } });
    return response.data;
  }

  public async unlockAchievement(achievementId: string): Promise<void> {
    await this.api.post(`/achievements/${achievementId}/unlock`);
    this.events.publish('achievement.unlocked', { achievementId });
  }
}

export const achievementService = new AchievementService();
