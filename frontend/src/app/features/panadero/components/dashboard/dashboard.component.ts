import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  clienteTelefono: string;
  fecha: string;
  fechaEntrega: string;
  estado: string;
  cantProductos: number;
  productos: PedidoProducto[];
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
  orden: string = 'fechaAsc'; // Orden por defecto
  pedidoSeleccionado: PedidoData | null = null;
  mensajeModal: string = '';

  @ViewChild('modalConfirmarCambioEstado') modalConfirmarCambioEstado!: ElementRef<HTMLDialogElement>;

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
          clienteTelefono: pedido.cliente.telefono,
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
    let pedidos = this.pedidos;

    if (this.filtro !== 'todos') {
      pedidos = pedidos.filter(p => p.estado === this.filtro);
    }

    switch (this.orden) {
      case 'fechaAsc':
        pedidos.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        break;
      case 'fechaDesc':
        pedidos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        break;
      case 'fechaEntregaAsc':
        pedidos.sort((a, b) => new Date(a.fechaEntrega).getTime() - new Date(b.fechaEntrega).getTime());
        break;
      case 'fechaEntregaDesc':
        pedidos.sort((a, b) => new Date(b.fechaEntrega).getTime() - new Date(a.fechaEntrega).getTime());
        break;
    }

    this.pedidosFiltrados = pedidos;
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

  cambiarOrden(event: any) {
    this.orden = event.target.value;
    this.aplicarFiltros();
  }

  verDetalles(pedidoId: number) {
    console.log('Ver detalles del pedido:', pedidoId);
    this.router.navigate(['/panaderia/pedidos', pedidoId]);
  }

  openModalCambioEstado(pedido: PedidoData) {
    this.pedidoSeleccionado = pedido;
    const nuevoEstado = pedido.estado === 'pendiente' ? 'En preparación' : 'Listo para recoger';
    this.mensajeModal = `¿Estás seguro de que deseas cambiar el estado del pedido ${pedido.id} a "${nuevoEstado}"?`;
    this.modalConfirmarCambioEstado.nativeElement?.showModal();
  }

  closeModalCambioEstado() {
    this.pedidoSeleccionado = null;
    this.modalConfirmarCambioEstado.nativeElement?.close();
  }

  async confirmarCambioEstado() {
    if (this.pedidoSeleccionado) {
      const pedido = this.pedidoSeleccionado;
      if (pedido.estado === 'pendiente') {
        await this.pedidosService.cambiarEstadoEnPreparacion(pedido.id);
        pedido.estado = 'en preparación';
      } else if (pedido.estado === 'en preparación') {
        await this.pedidosService.cambiarEstadoListoParaRecoger(pedido.id);
        pedido.estado = 'listo para recoger';
      }
      this.aplicarFiltros();
    }
    this.closeModalCambioEstado();
  }

  calcularInsumos() {
    console.log("Calculando insumos necesarios...");
    // Lógica para calcular los insumos necesarios
  }
}
