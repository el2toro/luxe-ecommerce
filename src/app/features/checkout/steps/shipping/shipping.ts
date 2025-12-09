import { Component, inject, OnInit } from '@angular/core';
import { CheckoutStore } from '../../../../core/store/checkout.store';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrderRequestModel } from '@models/requests/create-order-request.model';
import { OrderItem } from '@models/order-item.model';
import { OrderingService } from '@core/services/ordering.service';
import { AddressModel } from '@models/address.model';

@Component({
  selector: 'app-shipping',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './shipping.html',
  styleUrl: './shipping.scss',
})
export class Shipping implements OnInit{
  private formBuilder = inject(FormBuilder);
  private orderingService = inject(OrderingService);
  form!: FormGroup;
  checkout = inject(CheckoutStore);
  canNext = false;
  shipping: any; 

  ngOnInit(): void {
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
      customerId: 'c56a4180-65aa-42ec-a945-5fd21dec0538',
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
    return [
      {
      "productId": "f1a2d3b4-c567-4a7b-8b9a-2d3f8e5c7f2d",
      "productName": "new product 2",
      "productImageUrl": "product1.jpg",
      "productSku": "UFG56",
      "unitPrice": 59.99,
      "quantity": 1,
      "discount": 10.0
    },
    {
      "productId": "e8b5c97b-ef7d-4f13-9e9e-5c3bfb8c6c2f",
      "productName": "new product",
      "productImageUrl": "product2.jpg",
      "productSku": "UFG56",
      "unitPrice": 89.99,
      "quantity": 2,
      "discount": 5.0
    }
    ]
  }
}
