import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { Router } from '@angular/router';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
}

interface Ingrediente {
  nombre: string;
  cantidad: number;
}

interface PedidoProducto {
  cantidad: number;
  ingredientesNecesarios: Ingrediente[];
  producto: Producto;
}

interface PedidoData {
  id: number;
  cliente: string;
  fecha: string;
  fechaEntrega: string;
  estado: string;
  cantProductos: number;
  productos: PedidoProducto[]; // Definimos correctamente la estructura de productos
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class panaderoDashboardComponent implements OnInit {
  pedidos: PedidoData[] = [];
  pedidosFiltrados: PedidoData[] = [];
  pedidosPaginados: PedidoData[] = [];
  filtro: string = 'pendiente'; // Selección por defecto
  paginaActual: number = 1;
  elementosPorPagina: number = 16;
  totalPaginas: number = 1;

  constructor(
    private pedidosService: PedidosService,
    private router: Router 
  ) { }

  async ngOnInit() {
    try {
      const response = await this.pedidosService.getPedidos();
      this.pedidos = response.map(pedido => {
        return {
          id: pedido.id,
          cliente: pedido.cliente.email,
          fecha: pedido.fecha,
          fechaEntrega: pedido.fechaEntrega,
          estado: pedido.estado,
          productos: pedido.productos,
          cantProductos: pedido.productos.length
        };
      });
      this.aplicarFiltros();
      console.log("Pedidos", this.pedidos);
    } catch (error) {
      console.error("Error fetching pedidos:", error);
    }
  }

  aplicarFiltros() {
    if (this.filtro === 'todos') {
      this.pedidosFiltrados = this.pedidos;
    } else {
      this.pedidosFiltrados = this.pedidos.filter(p => p.estado === this.filtro);
    }
    this.paginaActual = 1;
    this.totalPaginas = Math.ceil(this.pedidosFiltrados.length / this.elementosPorPagina);
    this.actualizarPagina();
  }

  actualizarPagina() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.pedidosPaginados = this.pedidosFiltrados.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina > 0 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.actualizarPagina();
    }
  }

  cambiarFiltro(filtro: string) {
    this.filtro = filtro;
    this.aplicarFiltros();
  }

  verDetalles(pedidoId: number) {
    console.log('Ver detalles del pedido:', pedidoId);
    this.router.navigate(['/panaderia/pedidos', pedidoId]);
  }
}