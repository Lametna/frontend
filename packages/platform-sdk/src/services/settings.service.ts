import { BaseService } from './base';
import { Settings } from '../types';

export class SettingsService extends BaseService {
  constructor() {
    super('SettingsService');
  }

  public async getSettings(): Promise<Settings> {
    const response = await this.api.get<Settings>('/settings');
    return response.data;
  }

  public async updateSettings(settings: Partial<Settings>): Promise<Settings> {
    const response = await this.api.patch<Settings>('/settings', settings);
    this.events.publish('settings.updated', response.data);
    return response.data;
  }
}

export const settingsService = new SettingsService();
