import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss'],
  imports: [CommonModule, MatIconModule]
})
export class MarketingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  campaigns = signal([
    { name: 'Paris Fashion Week', channel: 'Instagram', impressions: 2840000, clicks: 184200, conversions: 842, roi: 8.4, ctr: 6.5, active: true },
    { name: 'Dubai VIP Launch', channel: 'Email + SMS', impressions: 124000, clicks: 42800, conversions: 428, roi: 12.8, ctr: 34.5, active: true },
    { name: 'AR Try-On Campaign', channel: 'TikTok', impressions: 5200000, clicks: 728000, conversions: 1240, roi: 6.2, ctr: 14.0, active: false },
  ]);

  performanceData = [
    { revenue: 84, height: 84 },
    { revenue: 92, height: 92 },
    { revenue: 108, height: 100 },
    { revenue: 96, height: 88 },
  ];
}
