import { BaseService } from './base';
import { InventoryItem, Currency } from '../types';

export class InventoryService extends BaseService {
  constructor() {
    super('InventoryService');
  }

  public async getInventory(): Promise<InventoryItem[]> {
    const response = await this.api.get<InventoryItem[]>('/inventory');
    return response.data;
  }

  public async getCurrencies(): Promise<Currency[]> {
    const response = await this.api.get<Currency[]>('/inventory/currencies');
    return response.data;
  }

  public async useItem(itemId: string): Promise<void> {
    await this.api.post(`/inventory/items/${itemId}/use`);
    this.events.publish('inventory.item_used', { itemId });
  }
}

export const inventoryService = new InventoryService();
