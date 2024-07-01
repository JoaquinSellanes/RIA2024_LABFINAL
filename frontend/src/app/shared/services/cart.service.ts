import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  product: any;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'shoppingCart';
  private cartItems: CartItem[] = [];
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const cart = localStorage.getItem(this.storageKey);
    this.cartItems = cart ? JSON.parse(cart) : [];
    this.cartSubject.next(this.cartItems);
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  getCart(): CartItem[] {
    return this.cartItems;
  }

  addToCart(product: any, quantity: number): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.product.id === product.id);

    if (index !== -1) {
      this.cartItems[index].quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }

    this.updateCart();
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.updateCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  updateCartItemQuantity(productId: number, quantity: number): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.product.id === productId);
    if (index !== -1) {
      this.cartItems[index].quantity = quantity;
      this.updateCart();
    }
  }

  private updateCart(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }
}
