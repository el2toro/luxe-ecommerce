import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GlobeComponent } from "../globe/globe.component";

@Component({
  selector: 'app-dashboard.page',
  imports: [MatIconModule, CommonModule, GlobeComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage {
revenue = signal('1,284,920');
  ordersToday = signal(248);
  conversionRate = signal(4.79);
  arSessions = signal(18420);
  aov = signal(5180);
  returningRate = signal(68.4);
  abandonRate = signal(31.6);
  liveUsers = signal(842);

  currentTime = signal(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));

  revenueData = [
    { value: 38, revenue: 38 }, { value: 52, revenue: 52 }, { value: 72, revenue: 72 },
    { value: 89, revenue: 89 }, { value: 104, revenue: 100 }, { value: 96, revenue: 92 }
  ];

  sessionLine = computed(() => (this.liveUsers() / 1000) * 100);

  topProducts = signal([
    { name: 'Diamond Tennis Bracelet', sales: 142, revenue: 2627, growth: 48, image: 'https://images.unsplash.com/photo-1605100804761-9a47a9e49c5c?w=600' },
    { name: 'Cashmere Wool Coat', sales: 89, revenue: 427, growth: 31, image: 'https://images.unsplash.com/photo-1543508282-6313a1d3e1d4?w=600' },
  ]);

  recentOrders = signal([
    { customer: 'Alexander Voss', id: '249871', total: 12840, time: '2 min ago' },
    { customer: 'Emma Laurent', id: '249870', total: 18500, time: '8 min ago' },
  ]);

  liveDots = [{ x: 18, y: 35 }, { x: 48, y: 28 }, { x: 82, y: 38 }];

  constructor() {
    // Live clock
  //   setInterval(() => {
  //     this.currentTime.set(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
  //   }, 1000);

  //   // Simulate live users
  //   setInterval(() => {
  //     this.liveUsers.update(n => n + Math.floor(Math.random() * 20 - 10));
  //   }, 5000);
   }

  chartData = [
  { label: '1',  revenue: 38, revenuePercent: 38 },
  { label: '5',  revenue: 52, revenuePercent: 52 },
  { label: '10', revenue: 48, revenuePercent: 48 },
  { label: '15', revenue: 72, revenuePercent: 72 },
  { label: '20', revenue: 89, revenuePercent: 89 },
  { label: '25', revenue: 104, revenuePercent: 100 },
  { label: '30', revenue: 96, revenuePercent: 92 },
];

sessionData = [12, 18, 22, 28, 35, 48, 42]; // in thousands

sessionPoints = computed(() => {
  const max = Math.max(...this.sessionData);
  return this.sessionData
    .map((val, i) => {
      const x = (i / (this.sessionData.length - 1)) * 100;
      const y = 100 - (val / max) * 100;
      return `${x},${y}`;
    })
    .join(' ');
});

  liveMarkers = [
  { city: 'Paris', x: 48, y: 28, active: true },
  { city: 'New York', x: 22, y: 38, active: true },
  { city: 'Dubai', x: 68, y: 52, active: true },
  { city: 'Tokyo', x: 88, y: 42, active: true },
  { city: 'London', x: 44, y: 24, active: true },
  { city: 'Monaco', x: 50, y: 30, active: true },
];

topCountries = [
  { flag: 'United States', name: 'US', city: 'New York', visitors: 3592, percent: 42.6 },
  { flag: 'France', name: 'FR', city: 'Paris', visitors: 1534, percent: 18.2 },
  { flag: 'United Arab Emirates', name: 'UAE', city: 'Dubai', visitors: 1046, percent: 12.4 },
  { flag: 'Japan', name: 'JP', city: 'Tokyo', visitors: 892, percent: 10.6 },
  { flag: 'United Kingdom', name: 'UK', city: 'London', visitors: 672, percent: 8.0 },
];
}
