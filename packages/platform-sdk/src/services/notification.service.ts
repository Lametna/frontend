import { BaseService } from './base';
import { Notification } from '../types';

export class NotificationService extends BaseService {
  constructor() {
    super('NotificationService');
  }

  public async getNotifications(limit = 20, offset = 0): Promise<Notification[]> {
    const response = await this.api.get<Notification[]>('/notifications', { params: { limit, offset } });
    return response.data;
  }

  public async markAsRead(notificationId: string): Promise<void> {
    await this.api.post(`/notifications/${notificationId}/read`);
    this.events.publish('notification.read', { notificationId });
  }

  public async markAllAsRead(): Promise<void> {
    await this.api.post('/notifications/read-all');
    this.events.publish('notification.read_all', {});
  }
}

export const notificationService = new NotificationService();
