import { Component } from '@angular/core';
import { BottomNavComponent } from "../../layout/bottom-nav/bottom-nav.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories.page',
  imports: [BottomNavComponent, HeaderComponent, RouterModule],
  templateUrl: './categories.page.html',
  styleUrl: './categories.page.scss',
})
export class CategoriesPage {

}
