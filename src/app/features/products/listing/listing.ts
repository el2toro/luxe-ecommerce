import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { FilterSidebar } from '../../../shared/components/filter-sidebar/filter-sidebar';
import { BottomNavComponent } from '../../layout/bottom-nav/bottom-nav.component';
import { CommonModule } from '@angular/common';
import { FilterPanel } from '../filters/filter-panel/filter-panel';
import { MatIconModule } from '@angular/material/icon';
import { ProductStore } from '../../../core/store/product.store';

@Component({
  selector: 'app-listing',
  imports: [
    HeaderComponent,
    ProductCard,
    FilterSidebar,
    BottomNavComponent,
    CommonModule,
    FilterPanel,
    MatIconModule,
  ],
  templateUrl: './listing.html',
  styleUrl: './listing.scss',
})
export class Listing implements OnInit {
  private productStore = inject(ProductStore);

  get filtersAreOpened(): boolean {
    return document.body.classList.contains('filters-open');
  }

  get products() {
    return this.productStore.items$;
  }

  ngOnInit(): void {
    this.products.subscribe({next: (data) => console.log(data)})
  }

  filtersOpen = false;
  openFilters() {
    this.filtersOpen = true;
  }
}
