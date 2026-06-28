import { BaseService } from './base';
import { Party } from '../types';

export class PartyService extends BaseService {
  constructor() {
    super('PartyService');
  }

  public async createParty(maxMembers: number = 4): Promise<Party> {
    const response = await this.api.post<Party>('/parties', { maxMembers });
    this.events.publish('party.created', response.data);
    return response.data;
  }

  public async joinParty(partyId: string): Promise<Party> {
    const response = await this.api.post<Party>(`/parties/${partyId}/join`);
    this.events.publish('party.joined', response.data);
    this.socket.emit('party:join', { partyId });
    return response.data;
  }

  public async leaveParty(partyId: string): Promise<void> {
    await this.api.post(`/parties/${partyId}/leave`);
    this.events.publish('party.left', { partyId });
    this.socket.emit('party:leave', { partyId });
  }

  public async kickMember(partyId: string, userId: string): Promise<void> {
    await this.api.delete(`/parties/${partyId}/members/${userId}`);
    this.events.publish('party.member_kicked', { partyId, userId });
  }

  public async setReadyStatus(partyId: string, isReady: boolean): Promise<void> {
    await this.api.put(`/parties/${partyId}/ready`, { isReady });
    this.socket.emit('party:ready', { partyId, isReady });
  }
}

export const partyService = new PartyService();
