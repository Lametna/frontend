import { BaseService } from './base';

export class AnalyticsService extends BaseService {
  constructor() {
    super('AnalyticsService');
  }

  public trackEvent(eventName: string, properties?: Record<string, any>): void {
    // We queue these or send them immediately
    this.api.post('/analytics/track', { event: eventName, properties }).catch(err => {
      this.logger.error('Failed to track event', err);
    });
    this.events.publish('analytics.tracked', { eventName, properties });
  }

  public trackPageView(pageUrl: string): void {
    this.trackEvent('page_view', { url: pageUrl });
  }
}

export const analyticsService = new AnalyticsService();
