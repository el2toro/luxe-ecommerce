// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupPage } from './features/auth/signup.page/signup.page';
import { ForgotPage } from './features/auth/forgot.page/forgot.page';
import { HomeComponent } from './features/home/home.component';
import { ArPage } from './features/ar/ar.page/ar.page';
import { Listing } from './features/products/listing/listing';
import { Detail } from './features/products/detail/detail';
import { Checkout } from './features/checkout/checkout';
import { OrderSuccess } from './features/order-success/order-success';
import { WishlistPage } from './features/wishlist/wishlist.page/wishlist.page';
import { AccountPage } from './features/account/account.page/account.page';
import { OrdersPage } from './features/account/orders.page/orders.page';
import { AddressesPage } from './features/account/addresses.page/addresses.page';
import { CategoriesPage } from './features/categories/categories.page/categories.page';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupPage },
  { path: 'forgot', component: ForgotPage },
  { path: 'categories', component: CategoriesPage },
  { path: 'ar', component: ArPage },
  { path: 'category/:slug', component: Listing },
  { path: 'product/:id', component: Detail },
  { path: 'checkout', component: Checkout },
  { path: 'order/:id', component: OrderSuccess },
  { path: 'wishlist', component: WishlistPage },
  { path: 'account', component: AccountPage },
  { path: 'account/orders', component: OrdersPage },
  { path: 'account/addresses', component: AddressesPage },
  { path: '**', redirectTo: '' },
];

// {
//   path: 'account',
//   canMatch: [authGuard],
//   loadComponent: () => import('./features/account/account.page').then(m => m.AccountPage)
// },
// {
//   path: 'checkout',
//   canMatch: [authGuard],
//   loadComponent: () => import('./features/checkout/checkout.page').then(m => m.CheckoutPage)
// }
