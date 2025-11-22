import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'catalogue',
    component: CatalogueComponent,
    canActivate: [authGuard],
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'panier',
    component: CartComponent,
    canActivate: [authGuard],
  },
  {
    path: 'paiement',
    loadComponent: () => import('./pages/payment/payment.component').then(m => m.PaymentComponent),
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
