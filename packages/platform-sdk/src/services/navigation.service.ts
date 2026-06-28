import { BaseService } from './base';

export class NavigationService extends BaseService {
  constructor() {
    super('NavigationService');
  }

  public navigateTo(path: string, options?: any): void {
    // This serves as an abstraction for React Router or any other router
    this.events.publish('navigation.navigate', { path, options });
  }

  public goBack(): void {
    this.events.publish('navigation.go_back', {});
  }
}

export const navigationService = new NavigationService();
