import { Product } from "@client/products";

export interface OrderItem {
  product: Product;
  quantity: number;
}
