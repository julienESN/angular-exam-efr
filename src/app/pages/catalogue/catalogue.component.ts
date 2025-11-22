import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  error = '';
  searchTerm = '';
  selectedBrand = '';

  private destroy$ = new Subject<void>();

  get brands(): string[] {
    return [...new Set(this.products.map((p) => p.brand))].sort();
  }

  constructor(
    private productService: ProductService,
    protected cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProducts(): void {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Product[]) => {
          this.products = data;
          this.filteredProducts = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement des produits';
          this.loading = false;
          console.error(err);
        },
      });
  }

  onSearch(term: string): void {
    this.searchTerm = term.toLowerCase();
    this.applyFilters();
  }

  onBrandChange(brand: string): void {
    this.selectedBrand = brand;
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredProducts = this.products.filter((p) => {
      const matchesSearch =
        !this.searchTerm ||
        p.name.toLowerCase().includes(this.searchTerm) ||
        p.brand.toLowerCase().includes(this.searchTerm);

      const matchesBrand = !this.selectedBrand || p.brand === this.selectedBrand;

      return matchesSearch && matchesBrand;
    });
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
