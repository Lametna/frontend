import { BaseService } from './base';
import { Conversation, Message } from '../types';

export class MessagingService extends BaseService {
  constructor() {
    super('MessagingService');
  }

  public async getConversations(): Promise<Conversation[]> {
    const response = await this.api.get<Conversation[]>('/conversations');
    return response.data;
  }

  public async getMessages(conversationId: string, limit = 50, offset = 0): Promise<Message[]> {
    const response = await this.api.get<Message[]>(`/conversations/${conversationId}/messages`, {
      params: { limit, offset }
    });
    return response.data;
  }

  public async sendMessage(conversationId: string, content: string, type: Message['type'] = 'text'): Promise<Message> {
    const response = await this.api.post<Message>(`/conversations/${conversationId}/messages`, { content, type });
    this.events.publish('message.sent', response.data);
    this.socket.emit('message:send', { conversationId, content, type });
    return response.data;
  }

  public markAsRead(conversationId: string, messageId: string): void {
    this.api.post(`/conversations/${conversationId}/messages/${messageId}/read`);
    this.socket.emit('message:read', { conversationId, messageId });
  }
}

export const messagingService = new MessagingService();
