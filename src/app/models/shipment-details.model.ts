import { AddressModel } from "./address.model";
import { ShipmentTrackingEventModel } from "./shipment-tracking-event.model";

export interface ShipmentDetailsModel {
  trackingNumber: string;
  carrier: string;
  serviceType: string;
  shippingCost: number;
  shippedDate: string;              // ISO date string
  estimatedDelivery: string | null; // nullable
  deliveredDate: string | null;     // nullable
  deliveryNotes: string;
  deliveryAddress: AddressModel;
  trackingEvents: ShipmentTrackingEventModel[];
}
