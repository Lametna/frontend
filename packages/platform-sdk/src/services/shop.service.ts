import { BaseService } from './base';
import { ShopItem } from '../types';

export class ShopService extends BaseService {
  constructor() {
    super('ShopService');
  }

  public async getItems(category?: string): Promise<ShopItem[]> {
    const response = await this.api.get<ShopItem[]>('/shop/items', { params: { category } });
    return response.data;
  }

  public async purchaseItem(itemId: string, quantity: number = 1): Promise<void> {
    await this.api.post(`/shop/items/${itemId}/purchase`, { quantity });
    this.events.publish('shop.purchase_completed', { itemId, quantity });
  }
}

export const shopService = new ShopService();
