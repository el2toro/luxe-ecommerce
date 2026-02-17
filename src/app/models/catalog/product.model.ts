export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  image: string;
  price: number;
  rating: number;
  isAvailable: boolean;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  productCategories?: any[]; 
}