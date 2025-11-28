import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface FilterState {
  price: [number, number];
  selectedSizes: string[];
  selectedColors: string[];
  selectedBrands: string[];
  sortBy: 'newest' | 'price-low' | 'price-high' | 'popular';
}

@Component({
  selector: 'app-filter-panel',
  imports: [FormsModule, MatIconModule, CommonModule],
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.scss',
})
export class FilterPanel {
  filters = signal<FilterState>({
    price: [0, 8000],
    selectedSizes: [],
    selectedColors: [],
    selectedBrands: [],
    sortBy: 'newest',
  });

  sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Gold', hex: '#d4af37' },
    { name: 'Silver', hex: '#c0c0c0' },
    { name: 'Red', hex: '#c41e3a' },
    { name: 'Navy', hex: '#1c2526' },
  ];
  brands = ['ATELIER NOIR', 'LUXE', 'MAISON', 'PRESTIGE', 'SOLEIL', 'NOIR', 'HERITAGE'];
  brandSearch = '';

  filteredBrands = computed(() =>
    this.brands.filter((b) => b.toLowerCase().includes(this.brandSearch.toLowerCase()))
  );

  activeCount = computed(() => {
    const f = this.filters();
    return (
      f.selectedSizes.length +
      f.selectedColors.length +
      f.selectedBrands.length +
      (f.price[1] < 10000 ? 1 : 0)
    );
  });

  toggleSize(size: string) {
    this.filters.update((f) => ({
      ...f,
      selectedSizes: f.selectedSizes.includes(size)
        ? f.selectedSizes.filter((s) => s !== size)
        : [...f.selectedSizes, size],
    }));
  }

  toggleColor(color: string) {
    this.filters.update((f) => ({
      ...f,
      selectedColors: f.selectedColors.includes(color)
        ? f.selectedColors.filter((c) => c !== color)
        : [...f.selectedColors, color],
    }));
  }

  toggleBrand(brand: string) {
    this.filters.update((f) => ({
      ...f,
      selectedBrands: f.selectedBrands.includes(brand)
        ? f.selectedBrands.filter((b) => b !== brand)
        : [...f.selectedBrands, brand],
    }));
  }

  clearAll() {
    this.filters.set({
      price: [0, 10000],
      selectedSizes: [],
      selectedColors: [],
      selectedBrands: [],
      sortBy: 'newest',
    });
  }

  apply() {
    console.log('Filters applied:', this.filters());
    this.close();
  }

  close() {
    document.body.classList.remove('filters-open');
  }
}
