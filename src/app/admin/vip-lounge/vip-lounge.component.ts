import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-vip-lounge',
  templateUrl: './vip-lounge.component.html',
  styleUrls: ['./vip-lounge.component.scss'],
  imports: [MatIconModule, CommonModule],
})
export class VipLoungeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  
  topVIPs = signal([
    {
      name: 'Sheikh Khalid Al Maktoum',
      location: 'Dubai',
      spent: 128,
      orders: 84,
      tier: 'Royal',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
      name: 'Princess Victoria de Monaco',
      location: 'Monaco',
      spent: 96,
      orders: 62,
      tier: 'Royal',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      name: 'Oliver Rothschild',
      location: 'Geneva',
      spent: 84,
      orders: 58,
      tier: 'Imperial',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
    {
      name: 'Isabella Moretti',
      location: 'Milan',
      spent: 91,
      orders: 63,
      tier: 'Imperial',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    },
  ]);
}
