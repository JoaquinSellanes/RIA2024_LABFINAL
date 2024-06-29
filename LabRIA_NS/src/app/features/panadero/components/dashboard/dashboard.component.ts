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
  filtro: string = 'pendiente'; // Selección por defecto

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