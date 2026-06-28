import { BaseService } from './base';

export class LiveOpsService extends BaseService {
  constructor() {
    super('LiveOpsService');
  }

  public async getActiveEvents(): Promise<any[]> {
    const response = await this.api.get<any[]>('/liveops/events/active');
    return response.data;
  }

  public async getDailyRewards(): Promise<any> {
    const response = await this.api.get<any>('/liveops/rewards/daily');
    return response.data;
  }

  public async claimDailyReward(): Promise<void> {
    await this.api.post('/liveops/rewards/daily/claim');
    this.events.publish('liveops.reward_claimed', { type: 'daily' });
  }
}

export const liveOpsService = new LiveOpsService();
