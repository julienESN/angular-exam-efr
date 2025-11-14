import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  loading = true;
  quantity = 1;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(id).subscribe({
      next: (prod: Product) => {
        this.product = prod;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  addToCart() {
    alert('Fonction ajout au panier à implémenter (front only).');
  }
}
