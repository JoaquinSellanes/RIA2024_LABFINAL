import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  pedidosFiltrados: PedidoData[] = [];
  error: boolean = false;
  modalOpen: boolean = false;
  pedidoSeleccionado: PedidoData | null = null;
  paginaActual: number = 1;
  totalPaginas: number = 1;
  pedidosPorPagina: number = 10;

  filtrosForm: FormGroup;

  constructor(private pedidosService: PedidosService, private fb: FormBuilder) {
    this.filtrosForm = this.fb.group({
      estado: [''],
      fechaInicio: [''],
      fechaFin: [''],
      fechaFiltro: ['fecha']
    });
  }

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

      this.aplicarFiltros();

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
    this.pedidosPaginados = this.pedidosFiltrados.slice(inicio, fin);
  }

  aplicarFiltros() {
    const filtros = this.filtrosForm.value;
    const fechaInicio = filtros.fechaInicio;
    const fechaFin = filtros.fechaFin;
    const estado = filtros.estado;
    const fechaFiltro = filtros.fechaFiltro;

    let pedidosFiltrados = this.pedidos;

    if (estado) {
      pedidosFiltrados = pedidosFiltrados.filter(pedido => pedido.estado === estado);
    }

    if (fechaInicio || fechaFin) {
      pedidosFiltrados = pedidosFiltrados.filter(pedido => {
        const fecha = new Date(fechaFiltro === 'fecha' ? pedido.fecha : pedido.fechaEntrega);
        if (fechaInicio && fechaFin) {
          return fecha >= new Date(fechaInicio) && fecha <= new Date(fechaFin);
        }
        if (fechaInicio) {
          return fecha >= new Date(fechaInicio);
        }
        if (fechaFin) {
          return fecha <= new Date(fechaFin);
        }
        return true;
      });
    }

    this.pedidosFiltrados = pedidosFiltrados;
    this.totalPaginas = Math.ceil(this.pedidosFiltrados.length / this.pedidosPorPagina);
    this.paginaActual = 1;
    this.cambiarPagina(this.paginaActual);
  }

  limpiarFiltros() {
    this.filtrosForm.reset({ estado: '', fechaInicio: '', fechaFin: '', fechaFiltro: 'fecha' });
    this.pedidosFiltrados = this.pedidos;
    this.totalPaginas = Math.ceil(this.pedidosFiltrados.length / this.pedidosPorPagina);
    this.cambiarPagina(this.paginaActual);
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
