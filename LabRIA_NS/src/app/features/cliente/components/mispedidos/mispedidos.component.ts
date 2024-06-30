import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';

interface PedidoData {
  id: number;
  cliente: string;
  fecha: string;
  fechaEntrega: string;
  estado: string;
  cantProductos: number;
  precioTotal: number;
  productos: any[];
}

@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.component.html',
  styleUrl: './mispedidos.component.scss'
})
export class MispedidosComponent implements OnInit {
  loaded: boolean = false;
  pedidos: PedidoData[] = [];
  pedidosPaginados: PedidoData[] = [];
  error: boolean = false;
  modalOpen: boolean = false;
  pedidoSeleccionado: PedidoData | null = null;
  paginaActual: number = 1;
  totalPaginas: number = 1;
  pedidosPorPagina: number = 10;

  constructor(private pedidosService: PedidosService) { }

  async ngOnInit() {
    try {
      const response = await this.pedidosService.getMisPedidos();
      this.pedidos = response.map((pedido: any) => {
        const precioTotal = pedido.productos.reduce((total: number, item: any) => total + (item.cantidad * item.producto.precio), 0);
        return {
          id: pedido.id,
          cliente: pedido.cliente.email,
          fecha: pedido.fecha,
          fechaEntrega: pedido.fechaEntrega,
          estado: pedido.estado,
          cantProductos: pedido.productos.length,
          precioTotal: precioTotal,
          productos: pedido.productos
        }
      });

      this.totalPaginas = Math.ceil(this.pedidos.length / this.pedidosPorPagina);
      this.cambiarPagina(this.paginaActual);

      this.error = false;
      this.loaded = true;
    } catch (error) {
      console.error('Error fetching pedidos', error);
      this.error = true;
    }
  }

  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    const inicio = (pagina - 1) * this.pedidosPorPagina;
    const fin = inicio + this.pedidosPorPagina;
    this.pedidosPaginados = this.pedidos.slice(inicio, fin);
  }

  verPedido(pedido: PedidoData) {
    this.pedidoSeleccionado = pedido;
    this.modalOpen = true;
  }

  cerrarModal() {
    this.modalOpen = false;
    this.pedidoSeleccionado = null;
  }

  getIngredientes(ingredientes: any[]): string {
    return ingredientes.map(ing => ing.nombre.replace(/ *\([^)]*\) */g, '')).join(', ');
  }
}
