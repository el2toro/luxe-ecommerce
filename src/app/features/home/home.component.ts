import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CartStore } from '../../core/store/cart.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent, MatIconModule, CommonModule],
})
export class HomeComponent implements OnInit {
  private cart = inject(CartStore);
  forYou = [
    {
      img: 'https://images.unsplash.com/photo-1737219239069-89d33174d7ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdpcmwlMjAlMjBsdXh1cnklMjBmYXNoaW9ufGVufDB8fDB8fHwy?w=400',
      sale: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1743877428895-fd3aabd06528?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhlcyUyMG1lbnxlbnwwfHwwfHx8Mg%3D%3D?w=400',
      sale: true,
    },
  ];
  brands = ['LUXE', 'NOIR', 'ATELIER', 'PRESTIGE', 'MAISON', 'SOLEIL'];
  categories = [
    {
      name: 'Women',
      items: '2,450',
      img: 'https://images.unsplash.com/photo-1746730921374-ab56549262f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w400',
    },
    {
      name: 'Men',
      items: '1,820',
      img: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=400',
    },
    {
      name: 'Accessories',
      items: '980',
      img: 'https://images.unsplash.com/photo-1662289032144-3ed681fdd260?q=80&w=1091&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400',
    },
    {
      name: 'Shoes',
      items: '1,240',
      img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    },
  ];
  constructor() {}
  // === REAL COUNTDOWN LOGIC (NEVER BREAKS) ===
  nextDropDate = new Date('2025-12-06'); // Dubai time — change to your drop

  // Live values bound to template
  days = '00';
  hours = '00';
  minutes = '00';
  seconds = '00';

  ngOnInit() {
    setInterval(() => this.startRealCountdown(), 1000);
  }

  private startRealCountdown() {
    const now = new Date().getTime();
    const target = this.nextDropDate.getTime();
    let distance = target - now;

    if (distance <= 0) {
      // DROP IS LIVE!
      this.days = this.hours = this.minutes = this.seconds = '00';
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    this.days = d.toString().padStart(2, '0');
    this.hours = h.toString().padStart(2, '0');
    this.minutes = m.toString().padStart(2, '0');
    this.seconds = s.toString().padStart(2, '0');
  }
}
