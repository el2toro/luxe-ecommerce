import { Component } from '@angular/core';
import { BottomNavComponent } from "../../layout/bottom-nav/bottom-nav.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-account.page',
  imports: [BottomNavComponent, HeaderComponent, MatIconModule],
  templateUrl: './account.page.html',
  styleUrl: './account.page.scss',
})
export class AccountPage {

}
