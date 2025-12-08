import { AddressModel } from "@models/address.model";
import { OrderStatusHistoryModel } from "@models/orde-status-history.model";
import { OrderItemDetailsModel } from "@models/order-item-details.model";
import { PaymentDetailsModel } from "@models/payment-details.model";
import { ShipmentDetailsModel } from "@models/shipment-details.model";

export interface CreateOrderResponseModel {
  id: string;
  orderNumber: string;
  customerId: string;
  customerEmail: string | null;
  customerName: string | null;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  currency: string;
  orderDate: string;
  paidDate: string | null;
  shippedDate: string | null;
  deliveredDate: string | null;
  createdAt: string;
  updatedAt: string;

  shippingAddress: AddressModel;
  billingAddress: AddressModel;

  orderItems: OrderItemDetailsModel[];
  statusHistory: OrderStatusHistoryModel[];

  payment: PaymentDetailsModel | null;
  shipment: ShipmentDetailsModel | null;
}
