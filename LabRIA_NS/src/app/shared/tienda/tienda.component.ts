import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})
export class TiendaComponent implements OnInit {
  itemCount: number = 0;
  productos: any[] = [];

  constructor(
    private cartService: CartService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(cartItems => {
      this.itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    });
    this.productoService.getProductosDisponibles().then((response: any) => {
      this.productos = response;
    });
  }


  updateItemCount(): void {
    this.itemCount = this.cartService.getCartItemCount();
  }

  openCartModal(): void {
    (document.getElementById('cartModal') as HTMLDialogElement).showModal();
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product, 1);
    this.updateItemCount();
  }
}