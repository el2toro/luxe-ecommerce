// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupPage } from './features/auth/signup.page/signup.page';
import { ForgotPage } from './features/auth/forgot.page/forgot.page';
import { HomeComponent } from './features/home/home.component';
import { Listing } from './features/products/listing/listing';
import { Detail } from './features/products/detail/detail';
import { Checkout } from './features/checkout/checkout';
import { OrderSuccess } from './features/order-success/order-success';
import { WishlistPage } from './features/wishlist/wishlist.page/wishlist.page';
import { AccountPage } from './features/account/account.page/account.page';
import { OrdersPage } from './features/account/orders.page/orders.page';
import { AddressesPage } from './features/account/addresses.page/addresses.page';
import { CategoriesPage } from './features/categories/categories.page/categories.page';
import { AuthStore } from './core/auth/auth.store';
import { inject } from '@angular/core';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { DashboardPage } from './admin/dashboard/dashboard.page/dashboard.page';
import { ProductsListPage } from './admin/products/products-list.page/products-list.page';
import { ProductFormPage } from './admin/products/product-form.page/product-form.page';
import { OrdersListPage } from './admin/orders/orders-list.page/orders-list.page';
import { AnalyticsPage } from './admin/analytics/analytics.page/analytics.page';
import { CustomersPage } from './admin/customers/customers.page/customers.page';
import { MarketingComponent } from './admin/marketing/marketing.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { VipLoungeComponent } from './admin/vip-lounge/vip-lounge.component';
import { ArTryonComponent } from './features/ar-tryon/ar-tryon.component';
import { ShopComponent } from './features/shop/shop.component';
import { CheckoutSuccessComponent } from './features/checkout/checkout-success/checkout-success.component';
import { CheckoutFailedComponent } from './features/checkout/checkout-failed/checkout-failed.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupPage },
  { path: 'forgot', component: ForgotPage },
  { path: 'shop', component: ShopComponent },
  { path: 'categories', component: CategoriesPage },
  { path: 'ar-tryon', component: ArTryonComponent },
  { path: 'category/:slug', component: Listing },
  { path: 'product/:id', component: Detail },
  { path: 'checkout', component: Checkout },
  { path: 'checkout/success', component: OrderSuccess },
  { path: 'checkout/failed', component: CheckoutFailedComponent },

  { path: 'order/:id', component: OrderSuccess },
  { path: 'wishlist', component: WishlistPage },
  { path: 'account', component: AccountPage },
  { path: 'account/orders', component: OrdersPage },
  { path: 'account/addresses', component: AddressesPage },
  {
    path: 'admin',
    canMatch: [() => inject(AuthStore).isElite()],
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardPage },
      { path: 'products', component: ProductsListPage },
      { path: 'products/new', component: ProductFormPage },
      { path: 'products/:id', component: ProductFormPage },
      { path: 'orders', component: OrdersListPage },
      { path: 'analytics', component: AnalyticsPage },
      { path: 'customers', component: CustomersPage },
      { path: 'marketing', component: MarketingComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'vip-lounge', component: VipLoungeComponent },
    ],
  },
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
