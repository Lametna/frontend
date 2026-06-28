export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currencyId: string;
  imageUrl: string;
  type: 'cosmetic' | 'boost' | 'ticket';
  isAvailable: boolean;
}
