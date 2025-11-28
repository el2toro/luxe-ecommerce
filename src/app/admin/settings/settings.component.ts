import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [MatIconModule, CommonModule]
})
export class SettingsComponent implements OnInit {
darkMode = signal(true);
  constructor() { }

  ngOnInit() {
  }

  toggle(){
    this.darkMode.update(v => !v)
  }
}
