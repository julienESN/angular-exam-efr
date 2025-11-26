import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSignal = signal<CartItem[]>([]);

  readonly cartItems = this.cartItemsSignal.asReadonly();

  readonly itemCount = computed(() =>
    this.cartItemsSignal().reduce((acc, item) => acc + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this.cartItemsSignal().reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    )
  );

  addToCart(product: Product, quantity: number = 1) {
    this.cartItemsSignal.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...items, { product, quantity }];
    });
  }

  removeFromCart(productId: number) {
    this.cartItemsSignal.update((items) =>
      items.filter((item) => item.product.id !== productId)
    );
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartItemsSignal.update((items) =>
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  clearCart() {
    this.cartItemsSignal.set([]);
  }
}
