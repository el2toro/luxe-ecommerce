import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: 'published' | 'draft';
  images: string[];
}

@Component({
  selector: 'app-products-list.page',
  imports: [RouterModule, CommonModule, MatButtonModule],
  templateUrl: './products-list.page.html',
  styleUrl: './products-list.page.scss',
})
export class ProductsListPage {
products = signal<Product[]>([
    { id: 1, name: 'Cashmere Wool Coat', price: 4800, stock: 8, status: 'published', images: ['https://images.unsplash.com/photo-1543508282-6313a1d3e1d4?w=600'] },
    { id: 2, name: 'Diamond Tennis Bracelet', price: 18500, stock: 1, status: 'published', images: ['https://images.unsplash.com/photo-1605100804761-9a47a9e49c5c?w=600'] },
    // ... more
  ]);

  delete(id: number) {
    this.products.update(p => p.filter(x => x.id !== id));
  }
}
