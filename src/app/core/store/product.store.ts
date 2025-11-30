// src/app/core/store/cart.store.ts
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  size: string;
  color: string;
  wishlisted: boolean
}

interface ProductState {
  items: Product[];
}

@Injectable({ providedIn: 'root' })
export class ProductStore extends ComponentStore<ProductState> {
  constructor() {
    super({ items: []});
  }

  readonly removeItem = this.updater((state, id: number) => ({
    ...state,
    items: state.items.filter(i => i.id !== id)
  }));

  // Selectors
  readonly items$ = this.select(state => this.products);
  readonly totalItems$ = this.select(state => state.items.length);

  getProductById(productId: number) : Product{
    return this.products.filter(product => product.id === productId)[0];
  }

    products: Product[] = [
  {
    id: 1,
    brand: 'MAISON LUXE',
    name: 'Silk Draped Dress',
    price: 1850,
    image: 'https://media.istockphoto.com/id/1657460312/photo/beautiful-sensual-woman.webp?a=1&b=1&s=612x612&w=0&k=20&c=EOMsylemusxo5_bBUzjHml9_c88_OdAX87f8bsRI35M=?w=600',
    size: 'M',
    color: 'Emerald',
    wishlisted: false
  },
  {
    id: 2,
    brand: 'ATELIER NOIR',
    name: 'Tailored Blazer',
    price: 1280,
    oldPrice: 1600,
    image: 'https://images.unsplash.com/photo-1660119602205-3aa5be623a3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwVGFpbG9yZWQlMjBCbGF6ZXJ8ZW58MHx8MHx8fDI%3D?w=600',
    size: 'L',
    color: 'Black',
    wishlisted: true
  },
  {
    id: 3,
    brand: 'PRESTIGE',
    name: 'Leather Tote',
    price: 2450,
    image: 'https://images.unsplash.com/photo-1751219476343-7522296fe0eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGx1eHVyeSUyMExlYXRoZXIlMjBUb3RlfGVufDB8fDB8fHwy?w=600',
    size: 'One Size',
    color: 'Brown',
    wishlisted: false
  },
  {
    id: 4,
    brand: 'SOLEIL',
    name: 'Aviator Frames',
    price: 680,
    image: 'https://images.unsplash.com/photo-1762706334838-ea8425b43116?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwc3VuJTIwJTIwZ2xhc3N8ZW58MHx8MHx8fDI%3D?w=600',
    size: 'One Size',
    color: 'Gold',
    wishlisted: false
  },
  {
    id: 5,
    brand: 'LUMIÈRE',
    name: 'Satin Evening Gown',
    price: 3200,
    image: 'https://media.istockphoto.com/id/1687978338/photo/fashion-woman-in-yellow-silk-dress-flowing-on-wind-dark-skinned-model-with-afro-hairstyle-in.webp?a=1&b=1&s=612x612&w=0&k=20&c=5OIl2qZhish18HzqanU60MxTjuaYgqRNcID2kp3DeOc=?w=600',
    size: 'S',
    color: 'Champagne',
    wishlisted: false
  },
  {
    id: 6,
    brand: 'URBAN COUTURE',
    name: 'Minimalist Sneakers',
    price: 540,
    image: 'https://media.istockphoto.com/id/1360175983/photo/pair-of-stylish-black-shoes-on-grey-stone-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=NkUUCFsT9klM0sifdXZjldH2q0PXNYNTiq0vvP-A5Gc=?w=600',
    size: '42',
    color: 'White',
    wishlisted: true
  },
  {
    id: 7,
    brand: 'VERDE',
    name: 'Structured Handbag',
    price: 1980,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600',
    size: 'One Size',
    color: 'Olive',
    wishlisted: false
  },
  {
    id: 8,
    brand: 'NOCTURNE',
    name: 'Cashmere Coat',
    price: 2750,
    oldPrice: 3100,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600',
    size: 'M',
    color: 'Charcoal',
    wishlisted: false
  },
  {
    id: 9,
    brand: 'STELLAR',
    name: 'Gold Hoop Earrings',
    price: 420,
    image: 'https://images.unsplash.com/photo-1520961690634-2c6b1695d70c?w=600',
    size: 'One Size',
    color: 'Gold',
    wishlisted: false
  },
  {
    id: 10,
    brand: 'FORME',
    name: 'Tailored Trousers',
    price: 720,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    size: 'M',
    color: 'Navy',
    wishlisted: true
  },
  {
    id: 11,
    brand: 'ALTA MODA',
    name: 'Premium Knit Sweater',
    price: 860,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600',
    size: 'L',
    color: 'Cream',
    wishlisted: false
  },
  {
    id: 12,
    brand: 'ROYALE',
    name: 'Diamond Stud Bracelet',
    price: 5400,
    image: 'https://images.unsplash.com/photo-1611599537761-de6f1b5f6f73?w=600',
    size: 'One Size',
    color: 'Silver',
    wishlisted: false
  },
  {
    id: 13,
    brand: 'CARRÉ',
    name: 'Classic Loafers',
    price: 1150,
    image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=600',
    size: '43',
    color: 'Black',
    wishlisted: false
  },
  {
    id: 14,
    brand: 'ETHER',
    name: 'Silk Scarf',
    price: 320,
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600',
    size: 'One Size',
    color: 'Rose',
    wishlisted: true
  }
];
}