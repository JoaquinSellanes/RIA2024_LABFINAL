import { Injectable } from '@angular/core';
import { Producto } from '../../shared/models/producto';

interface CartItem {
  product: Producto;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'shoppingCart';

  constructor() { }

  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(product: Producto, quantity: number): void {
    const cart = this.getCart();
    const index = cart.findIndex(cartItem => cartItem.product.id === product.id);

    if (index !== -1) {
      cart[index].quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  removeFromCart(productId: number): void {
    let cart = this.getCart();
    cart = cart.filter(item => item.product.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  getCartItemCount(): number {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
}
