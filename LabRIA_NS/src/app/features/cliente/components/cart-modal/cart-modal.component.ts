import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { PedidosService } from '../../services/pedidos.service';

interface itemenv {
  productoId: number;
  cantidad: number;
}

@Component({
  selector: 'app-cart-modal',
  template: `
    <dialog id="cartModal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-bold text-lg">Carrito de Compras</h3>
        <ul class="py-4" *ngIf="cartItems.length > 0; else emptyCart">
          <li *ngFor="let item of cartItems" class="grid grid-cols-3 gap-3 mb-3">
            <figure class="col-span-1">
              <img *ngIf="item.product.imagen !== ''" class="transition-all cursor-pointer" [src]="item.product.imagen"
                alt="Imagen del producto" />
              <img *ngIf="item.product.imagen == ''" class="transition-all cursor-pointer" src="/assets/no-image.png"
                alt="Imagen del producto" />
            </figure>
            <div class="col-span-2">
              <h4 class="font-bold">{{ item.product.nombre }}</h4>
              <!-- <p>{{ item.product.descripcion }}</p> -->
              <!-- <p>{{ item.product.precio }} x {{ item.quantity }}</p> -->
              <p>{{ item.quantity }} Unidades</p>
              <div class="flex justify-end">
                <p class="text-primary font-bold"> &#36;{{item.product.precio * item.quantity}} UYU</p>
              </div>
            </div>
          </li>
          <div class="flex justify-end">
            <p class="text-primary font-bold text-lg">Total: &#36;{{total}} UYU</p>
          </div>
        </ul>
        <ng-template #emptyCart>
          <div class="my-7 prose lg:prose-xl">
            <h1>Parece que no tiene nada!</h1>
            <p>No seas timido, compra algo!</p>
          </div>
        </ng-template>
        <div class="flex justify-between items-center">
          <button class="btn btn-error" *ngIf="cartItems.length > 0" (click)="clearCart()">Vaciar Carrito</button>
          <button class="btn btn-success" *ngIf="cartItems.length > 0" (click)="comprar()">Comprar</button>
        </div>
      </div>
    </dialog>
  `,
  styles: []
})
export class CartModalComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private pedidosService: PedidosService
  ) { }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(cartItems => {
      this.cartItems = cartItems;
    });

    for (const item of this.cartItems) {
      this.total += item.product.precio * item.quantity;
    }

    console.log("cart items: ", this.cartItems);

  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  comprar(): void {
    const productos: itemenv[] = this.cartItems.map(item => ({ productoId: item.product.id, cantidad: item.quantity }));
    this.pedidosService.createPedido(productos).then(response => {
      console.log("Pedido creado: ", response);
      this.clearCart();
    });
  }
}
