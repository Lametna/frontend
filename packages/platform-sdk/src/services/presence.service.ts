import { BaseService } from './base';
import { User } from '../types';

export class PresenceService extends BaseService {
  constructor() {
    super('PresenceService');
  }

  public async setStatus(status: User['status']): Promise<void> {
    await this.api.put('/presence/status', { status });
    this.events.publish('presence.status_updated', { status });
    this.socket.emit('presence:update', { status });
  }

  public subscribeToUser(userId: string): void {
    this.socket.emit('presence:subscribe', { userId });
  }

  public unsubscribeFromUser(userId: string): void {
    this.socket.emit('presence:unsubscribe', { userId });
  }
}

export const presenceService = new PresenceService();
