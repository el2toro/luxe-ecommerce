import { Component, inject, OnInit } from '@angular/core';
import { CheckoutStore } from '../../../../core/store/checkout.store';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrderRequestModel } from '@models/requests/create-order-request.model';
import { OrderItem } from '@models/order-item.model';
import { OrderingService } from '@core/services/ordering.service';
import { AddressModel } from '@models/address.model';
import { CartService } from '@core/services/cart.service';
import { CartModel } from '@models/cart.model';
import { Product } from '@models/catalog/product.model';
import { CatalogService } from '@core/services/catalog.service';
import { CartItemModel } from '@models/cart-item.model';

@Component({
  selector: 'app-shipping',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './shipping.html',
  styleUrl: './shipping.scss',
})

export class Shipping implements OnInit{
  private formBuilder = inject(FormBuilder);
  private orderingService = inject(OrderingService);
  private cartService = inject(CartService);
  private currentCart!: CartModel;
  private currentCartProducts = < Product[]>[];
  private catalogService = inject(CatalogService);
  form!: FormGroup;
  checkout = inject(CheckoutStore);
  canNext = false;
  shipping: any; 

  ngOnInit(): void {
    this.cartService.currentCart$.subscribe(cart => {
      this.currentCart = cart;
      this.getProductsById(cart.cartItems);
    });
  
    this.buildForm();
  }

  continueToPayment(){
    this.placeOrder();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      customerFullName: [''],
      street: [''],
      city: [''],
      country: [''],
      zipCode: [''],
      phoneNumber: ['']
    });
  }

  placeOrder() : void{
    const createOrderRequest = this.mapToOrderRequest();

    this.orderingService.placeOrder(createOrderRequest).subscribe({
      next: (orderDetails) => {
        this.checkout.nextStep();
      }
    });
  }

  mapToOrderRequest(): CreateOrderRequestModel{
    return {
      shippingAddress: this.mapAddress(),
      billingAddress: this.mapAddress(),
      currency: 'eur',
      customerId: this.currentCart.customerId,
      customerNotes: 'Please deliver between 09:00 AM - 03:00 PM',
      orderItems: this.getOrderItems()
    };
  }

  mapAddress() : AddressModel{
    const formData = {...this.form.value};
   let address = new AddressModel();
   address.country = 'United State';
   address.city = formData.city;
   address.state = 'US';
   address.street = formData.street;
   address.zipCode = formData.zipCode;

   return address;
  }

  getOrderItems() : OrderItem[]{
    return this.currentCartProducts.map(product => {
      return {
        productId: product.id,
        productName: product.name,
        productImageUrl: product.image,
        productSku: product.sku,
        unitPrice: product?.price || 0,
        quantity: product?.quantity || 0,
        discount: 0
      };
    });
  }

  //TODO: Move this logic to cart store or service (it is duplicated in cart drawer)
   getProductsById(cartItems: CartItemModel[]) {
      const productIds = cartItems.map((item: any) => item.productId) as string[];
      this.catalogService.getProductsById(productIds).subscribe({
        next: (products) => {
  
          products.map(product => {
            const cartItem = cartItems.find(item => item.productId === product.id);
            if (cartItem) {
              product.quantity = cartItem.quantity;
            }
          });
  
          this.currentCartProducts = products
        }
      });
    }
}
