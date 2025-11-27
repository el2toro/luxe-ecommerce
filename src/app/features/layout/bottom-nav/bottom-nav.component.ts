import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  imports: [RouterModule, MatIconModule, CommonModule]
})
export class BottomNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
