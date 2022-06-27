import { Product } from './product.model';

export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  productId?: string;
  quantity?: number;
}

export interface CartItemDetails {
  product: Product;
  quantity: number;
}
