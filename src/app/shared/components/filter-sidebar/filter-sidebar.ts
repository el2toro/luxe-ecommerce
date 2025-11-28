import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filter-sidebar',
  imports: [MatIconModule, CommonModule],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.scss',
})
export class FilterSidebar {
price = 5000;
  brands = ['LUXE','NOIR','ATELIER','PRESTIGE','MAISON','SOLEIL'];
  close() { /* emit close event – we’ll hook it up in listing */ }
}
