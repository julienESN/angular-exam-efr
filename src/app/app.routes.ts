import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
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
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
