import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { PedidosService } from '../services/pedidos.service';
import { ToastComponent } from '../../shared/toast/toast.component';

interface itemenv {
  productoId: number;
  cantidad: number;
}

@Component({
  selector: 'app-cart-modal',
  template: `
    <app-toast #toast></app-toast>
    <dialog id="cartModal" class="modal">
      <div class="modal-box xl:w-[60vw] lg:w-[70vw] md:w-[80vw] sm:w-[90vw]">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-bold text-lg">Carrito de Compras</h3>
        <ul class="py-4" *ngIf="cartItems.length > 0; else emptyCart">
          <li *ngFor="let item of cartItems; let i = index" class="grid grid-cols-3 gap-3 mb-3">
            <figure class="col-span-1">
              <img *ngIf="item.product.imagen !== ''" class="transition-all cursor-pointer" [src]="item.product.imagen"
                alt="Imagen del producto" />
              <img *ngIf="item.product.imagen == ''" class="transition-all cursor-pointer" src="/assets/no-image.png"
                alt="Imagen del producto" />
            </figure>
            <div class="col-span-2 flex w-full gap-2">
              <div class="w-full">
                <h4 class="font-bold">{{ item.product.nombre }}</h4>
                <p>{{ item.quantity }} Unidades</p>
                
              </div>
              <div>
                <div class="flex justify-end">
                  <button class="btn btn-sm btn-outline mr-2" (click)="decrementQuantity(i)">-</button>
                  <button class="btn btn-sm btn-outline" (click)="incrementQuantity(i)">+</button>
                </div>
                <div class="flex justify-end mt-2">
                  <button class="btn btn-error btn-sm" (click)="removeItem(i)">Eliminar</button>
                </div>
              </div>
            </div>
            <div class="col-span-3 flex justify-end mt-2">
              <p class="text-primary font-bold"> &#36;{{item.product.precio * item.quantity}} UYU</p>
            </div>
          </li>
          <div class="flex justify-end">
            <p class="text-primary font-bold text-lg">Total: &#36;{{total}} UYU</p>
          </div>
        </ul>
        <form [formGroup]="cartForm" *ngIf="cartItems.length > 0">
          <div class="form-control my-4">
            <label class="label">
              <span class="label-text">Fecha de Entrega</span>
            </label>
            <input type="date" class="input input-bordered" formControlName="fechaEntrega">
            <p *ngIf="cartForm.get('fechaEntrega')?.errors?.['required'] && cartForm.get('fechaEntrega')?.touched"
               class="text-red-500 text-xs mt-1">La fecha de entrega es requerida.</p>
            <p *ngIf="cartForm.get('fechaEntrega')?.errors?.['dateInvalid']"
               class="text-red-500 text-xs mt-1">La fecha debe ser al menos el dia siguiente al actual.</p>
          </div>
          <div class="flex justify-between items-center">
            <button class="btn btn-error" *ngIf="cartItems.length > 0" (click)="clearCart()">Vaciar Carrito</button>
            <button class="btn btn-success" *ngIf="cartItems.length > 0" (click)="comprar()">Comprar</button>
          </div>
        </form>

        <ng-template #emptyCart>
          <div class="my-7 prose lg:prose-xl">
            <h1>Parece que no tiene nada!</h1>
            <p>No seas tímido, compra algo!</p>
          </div>
        </ng-template>
        
      </div>
    </dialog>
  `,
  styles: [`
    dialog::backdrop {
      background-color: rgba(0, 0, 0, 0.8);
    }

    dialog {
      border-radius: 8px;
    }

    .modal-box {
      // max-width: 60vw;
      min-width: 320px;
    }
  `]
})
export class CartModalComponent implements OnInit {
  @ViewChild('toast') toast!: ToastComponent;
  cartForm: FormGroup;
  cartItems: any[] = [];
  total: number = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private pedidosService: PedidosService
  ) {
    this.cartForm = this.fb.group({
      fechaEntrega: ['', [Validators.required, this.dateValidator]]
    });
  }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(cartItems => {
      this.cartItems = cartItems;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.product.precio * item.quantity, 0);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.toast.showToast("Carrito vaciado!");
  }

  comprar(): void {
    if (this.cartForm.invalid) {
      this.toast.showToast("Por favor, complete correctamente la fecha de entrega.");
      return;
    }
    const productos: itemenv[] = this.cartItems.map(item => ({ productoId: item.product.id, cantidad: item.quantity }));
    const fechaEntrega = this.cartForm.get('fechaEntrega')?.value;
    console.log("Productos: ", productos);
    console.log("FechaEntrega: ", fechaEntrega);
    this.pedidosService.createPedido(productos, fechaEntrega).then(response => {
      console.log("Pedido creado: ", response);
      // this.toast.showToast("Pedido realizado con éxito!");
      this.cartService.clearCart();
      this.showThankYouMessage();
    }).catch(error => {
      console.error("Error al crear pedido: ", error);
      this.toast.showToast("Error al realizar el pedido. Inténtelo de nuevo.");
    });
  }

  incrementQuantity(index: number): void {
    const item = this.cartItems[index];
    this.cartService.updateCartItemQuantity(item.product.id, item.quantity + 1);
  }

  decrementQuantity(index: number): void {
    const item = this.cartItems[index];
    if (item.quantity > 1) {
      this.cartService.updateCartItemQuantity(item.product.id, item.quantity - 1);
    }
  }

  removeItem(index: number): void {
    const item = this.cartItems[index];
    this.cartService.removeFromCart(item.product.id);
  }

  dateValidator(control: AbstractControl): { [key: string]: any } | null {
    if (!control.value) {
      return null;
    }
    const selectedDate = new Date(control.value);
    const minDate = new Date();
    minDate.setDate(minDate.getDate());
    if (selectedDate < minDate) {
      return { 'dateInvalid': true };
    }
    return null;
  }

  showThankYouMessage(): void {
    const modal = document.getElementById('cartModal') as HTMLDialogElement;
    modal.close();
    setTimeout(() => {
      this.toast.showToast("¡Gracias por su compra! Su pedido ha sido realizado con éxito.");
    }, 1000);
  }
}
