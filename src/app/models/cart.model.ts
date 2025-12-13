import { CartItemModel } from "./cart-item.model";

export interface CartModel{
    id: string;
    customerId: string;
    cartItems: CartItemModel[];
    subtotal: number;
    total: number;
}