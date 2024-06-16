import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Producto } from '../../../shared/models/producto';

@Component({
  selector: 'app-cart-modal',
  template: `
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-bold text-lg">Carrito de Compras</h3>
        <ul class="py-4" *ngIf="cartItems.length > 0; else emptyCart">
          <li *ngFor="let item of cartItems" class="flex justify-between items-center">
            <img [src]="item.product.imagen" alt="{{ item.product.nombre }}" class="w-16 h-16 mr-4">
            <div>
              <h4 class="font-bold">{{ item.product.nombre }}</h4>
              <p>{{ item.product.descripcion }}</p>
              <p>{{ item.product.precio }} x {{ item.quantity }}</p>
            </div>
          </li>
        </ul>
        <ng-template #emptyCart>
          <div class="my-7 prose lg:prose-xl">
            <h1>Parece que no tiene nada!</h1>
            <p>No seas timido, compra algo!</p>
          </div>
        </ng-template>
        <button class="btn btn-error" *ngIf="cartItems.length > 0" (click)="clearCart()">Vaciar Carrito</button>
      </div>
    </dialog>
  `,
  styles: []
})
export class CartModalComponent implements OnInit {
  cartItems: any = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    console.log("cart: ", this.cartItems);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = this.cartService.getCart();
  }
}
