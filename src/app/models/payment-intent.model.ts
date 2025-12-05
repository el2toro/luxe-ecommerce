export class PaymentIntentModel {
  items = <PaymentIntentItem[]>[];
}

export class PaymentIntentItem {
  quantity!: number;
  priceData!: PriceData;
}

export class PriceData {
  currency!: string;
  productData!: ProductData;
  unitAmount!: number;
}

export class ProductData {
  name!: string;
  images = <string[]>[];
}
