import { User } from '@client/users';
import { OrderItem } from './orderItem.model';

export interface Order {
  _id?: string;
  id?: string;
  orderItems: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  status: number;
  country?: string;
  phone?: string;
  totalPrice?: string;
  user?: User;
  dateOrdered?: string;
}
