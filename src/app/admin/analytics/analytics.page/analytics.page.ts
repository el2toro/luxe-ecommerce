import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-analytics.page',
  imports: [MatIconModule, CommonModule],
  templateUrl: './analytics.page.html',
  styleUrl: './analytics.page.scss',
})
export class AnalyticsPage {
revenue = signal(1284920);
  sessions = signal(124820);
  conversionRate = signal(4.79);
  arSessions = signal(18420);

  revenueData = [
    { label: '1', value: 38, height: 38 },
    { label: '5', value: 52, height: 52 },
    { label: '10', value: 48, height: 48 },
    { label: '15', value: 72, height: 72 },
    { label: '20', value: 89, height: 89 },
    { label: '25', value: 104, height: 100 },
    { label: '30', value: 96, height: 92 },
  ];

  topProducts = signal([
    { name: 'Diamond Tennis Bracelet', sales: 142, revenue: 2627, growth: 48, image: 'https://images.unsplash.com/photo-1605100804761-9a47a9e49c5c?w=600' },
    { name: 'Cashmere Wool Coat', sales: 89, revenue: 427, growth: 31, image: 'https://images.unsplash.com/photo-1543508282-6313a1d3e1d4?w=600' },
  ]);

  trafficSources = [
    { name: 'Instagram', icon: 'photo_camera', percent: 42 },
    { name: 'Direct', icon: 'language', percent: 28 },
    { name: 'Google', icon: 'search', percent: 18 },
    { name: 'Email', icon: 'mail', percent: 12 },
  ];

  formatNumber(num: number): string {
    return num.toLocaleString();
  }
}
