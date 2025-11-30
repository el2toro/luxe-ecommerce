import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  imports: [RouterModule, MatIconModule]
})
export class SideMenuComponent implements OnInit {
@Output() close = new EventEmitter<void>();
@Input() isOpen = false;
  constructor() { }

  ngOnInit() {
  }

}
