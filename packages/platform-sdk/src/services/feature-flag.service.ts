import { BaseService } from './base';
import { FeatureFlag } from '../types';

export class FeatureFlagService extends BaseService {
  private flags: Map<string, FeatureFlag> = new Map();

  constructor() {
    super('FeatureFlagService');
  }

  public async fetchFlags(): Promise<void> {
    const response = await this.api.get<FeatureFlag[]>('/feature-flags');
    response.data.forEach(flag => {
      this.flags.set(flag.key, flag);
    });
    this.events.publish('flags.loaded', Array.from(this.flags.values()));
  }

  public isEnabled(key: string, defaultValue: boolean = false): boolean {
    const flag = this.flags.get(key);
    return flag ? flag.isEnabled : defaultValue;
  }

  public getValue(key: string): any {
    const flag = this.flags.get(key);
    return flag?.value;
  }
}

export const featureFlagService = new FeatureFlagService();
