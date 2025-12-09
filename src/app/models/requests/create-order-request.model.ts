import { AddressModel } from '@models/address.model';
import { OrderItem } from '@models/order-item.model';

export interface CreateOrderRequestModel {
  customerId: string;
  shippingAddress: AddressModel;
  billingAddress: AddressModel;
  currency: string;
  customerNotes: string;
  orderItems: OrderItem[];
}
