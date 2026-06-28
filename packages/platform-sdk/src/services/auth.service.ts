import { BaseService } from './base';
import { User, ApiResponse } from '../types';
import { platformStorage } from '../storage';

export class AuthService extends BaseService {
  constructor() {
    super('AuthService');
  }

  public async login(credentials: Record<string, any>): Promise<User> {
    const response = await this.api.post<User>('/auth/login', credentials);
    platformStorage.local.set('auth_token', (response.data as any).token); // Replace with actual token path
    this.events.publish('auth.login', response.data);
    return response.data;
  }

  public async logout(): Promise<void> {
    await this.api.post('/auth/logout');
    platformStorage.local.remove('auth_token');
    this.events.publish('auth.logout', {});
    this.socket.disconnect();
  }

  public async getCurrentUser(): Promise<User> {
    const response = await this.api.get<User>('/auth/me');
    return response.data;
  }
}

export const authService = new AuthService();
