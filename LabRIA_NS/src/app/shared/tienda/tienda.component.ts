import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  contadorItems: number = 0;
  productos: any[] = [];
  productosFiltrados: any[] = [];
  filtrosForm: FormGroup;
  paginaActual: number = 1;
  itemsPorPagina: number = 10;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private productoService: ProductoService
  ) {
    this.filtrosForm = this.fb.group({
      filtroNombre: '',
      filtroPrecio: null
    });
  }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(cartItems => {
      this.contadorItems = cartItems.reduce((count, item) => count + item.quantity, 0);
    });
    this.productoService.getProductosDisponibles().then((response: any) => {
      this.productos = response;
      this.aplicarFiltros();
    });
  }

  aplicarFiltros(): void {
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.filtrosForm.get('filtroNombre')!.value.toLowerCase()) &&
      (producto.precio <= this.filtrosForm.get('filtroPrecio')!.value || this.filtrosForm.get('filtroPrecio')!.value == 0 || this.filtrosForm.get('filtroPrecio')!.value == null) &&
      producto.isActive
    );
    this.paginaActual = 1;
  }

  limpiarFiltros(): void {
    this.filtrosForm.reset({ filtroNombre: '', filtroPrecio: null });
    this.aplicarFiltros();
  }

  obtenerTotalPaginas(): number {
    return Math.ceil(this.productosFiltrados.length / this.itemsPorPagina);
  }

  proximaPagina(): void {
    if (this.paginaActual < this.obtenerTotalPaginas()) {
      this.paginaActual++;
    }
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  agregarAlCarrito(producto: any): void {
    this.cartService.addToCart(producto, 1);
    this.contadorItems = this.cartService.getCartItemCount();
  }
}
