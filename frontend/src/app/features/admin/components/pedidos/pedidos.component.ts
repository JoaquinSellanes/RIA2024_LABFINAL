import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ToastComponent } from '../../../../shared/toast/toast.component';

interface PedidoData {
  id: number;
  cliente: ClienteData;
  fecha: string;
  fechaEntrega: string;
  estado: string;
  cantProductos: number;
  productos: ProductoData[];
}

interface ClienteData {
  id: number;
  email: string;
  telefono: string;
}

interface ProductoData {
  cantidad: number;
  producto: {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
    ingredientes: Ingrediente[];
    isActive: boolean;
  };
  ingredientesNecesarios: Ingrediente[];
}

interface Ingrediente {
  nombre: string;
  cantidad: number;
}

interface InsumoNecesario {
  nombre: string;
  cantidad: number;
}

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  loaded: boolean = false;
  pedidos: PedidoData[] = [];
  pedidosPaginados: PedidoData[] = [];
  pedidosFiltrados: PedidoData[] = [];
  error: boolean = false;
  paginaActual: number = 1;
  elementosPorPagina: number = 10;
  totalPaginas: number = 1;
  mostrarInsumosTabla: boolean = false;
  insumosNecesarios: InsumoNecesario[] = [];
  correos: string[] = [];
  filteredCorreos: string[] = [];

  filtrosForm: FormGroup;

  @ViewChild('toast') toast!: ToastComponent;

  constructor(
    private pedidosService: PedidosService,
    private fb: FormBuilder
  ) {
    this.filtrosForm = this.fb.group({
      estado: [''],
      fechaInicio: [''],
      fechaFin: [''],
      correo: ['']
    });
  }

  async ngOnInit() {
    await this.cargarPedidos();
    this.aplicarFiltros();
  }

  async reiniciarPedidos() {
    try {
      const response = await this.pedidosService.getPedidos();
      this.pedidos = response.map((pedido: PedidoData) => ({
        ...pedido,
        cantProductos: pedido.productos.length,
      }));
    } catch (error) {
      console.error('Error fetching pedidos', error);
      this.error = true;
    }
  }

  async cargarPedidos() {
    try {
      const response = await this.pedidosService.getPedidos();
      this.pedidos = response.map((pedido: PedidoData) => ({
        ...pedido,
        cantProductos: pedido.productos.length,
      }));
      this.correos = [...new Set(this.pedidos.map(pedido => pedido.cliente.email))];
      this.totalPaginas = Math.ceil(this.pedidos.length / this.elementosPorPagina);
      this.actualizarPagina();
      this.error = false;
      this.loaded = true;
    } catch (error) {
      console.error('Error fetching pedidos', error);
      this.error = true;
    }
  }

  aplicarFiltros() {
    console.log('Aplicando filtros');
    this.mostrarInsumosTabla = false;

    const filtros = this.filtrosForm.value;
    const fechaInicio = filtros.fechaInicio;
    const fechaFin = filtros.fechaFin;
    const estado = filtros.estado;
    const correo = filtros.correo;

    if (fechaInicio && fechaFin && new Date(fechaInicio) > new Date(fechaFin)) {
      this.toast.showToast('La fecha de inicio no puede ser mayor que la fecha de fin', 'alert alert-error');
      return;
    }

    this.pedidosFiltrados = this.pedidos;

    if (estado) {
      this.pedidosFiltrados = this.pedidosFiltrados.filter(pedido => pedido.estado === estado);
    }

    if (fechaInicio) {
      this.pedidosFiltrados = this.pedidosFiltrados.filter(pedido => new Date(pedido.fechaEntrega) >= new Date(fechaInicio));
    }

    if (fechaFin) {
      this.pedidosFiltrados = this.pedidosFiltrados.filter(pedido => new Date(pedido.fechaEntrega) <= new Date(fechaFin));
    }

    if (correo) {
      this.pedidosFiltrados = this.pedidosFiltrados.filter(pedido => pedido.cliente.email.includes(correo));
    }

    this.totalPaginas = Math.ceil(this.pedidosFiltrados.length / this.elementosPorPagina);
    this.paginaActual = 1;
    this.actualizarPagina();
    this.error = false;
    this.loaded = true;
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina > 0 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.actualizarPagina();
    }
  }

  actualizarPagina() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.pedidosPaginados = this.pedidosFiltrados.slice(inicio, fin);
  }


  mostrarInsumos() {
    this.obtenerInsumosNecesarios();
  }

  limpiarFiltros() {
    this.filtrosForm.reset({
      estado: '',
      fechaInicio: '',
      fechaFin: '',
      correo: ''
    });
    this.pedidosFiltrados = this.pedidos;
    this.totalPaginas = Math.ceil(this.pedidos.length / this.elementosPorPagina);
    this.paginaActual = 1;
    this.actualizarPagina();
    this.filteredCorreos = [];
  }


  async obtenerInsumosNecesarios() {
    try {
      if (this.pedidosFiltrados.length === 0) {
        this.pedidosFiltrados = this.pedidos;
      }
      const pedidoIds = this.pedidosFiltrados.map(pedido => pedido.id);
      console.log('Pedido IDs', pedidoIds);
      const response = await this.pedidosService.getIngredientes(pedidoIds);
      this.insumosNecesarios = response;
      this.mostrarInsumosTabla = true;
    } catch (error) {
      console.error('Error fetching insumos necesarios', error);
    }
  }

  async exportInsumosNecesarios() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('InsumosNecesarios');

    worksheet.columns = [
      { header: 'Nombre', key: 'nombre', width: 30 },
      { header: 'Cantidad Total', key: 'cantidad', width: 20 }
    ];

    this.insumosNecesarios.forEach((insumo, index) => {
      const row = worksheet.addRow(insumo);

      if (index % 2 === 0) {
        row.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE3F2FD' }
          };
        });
      }
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1E88E5' }
      };
    });
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'InsumosNecesariosReport.xlsx');
  }

  calcularPrecioTotal(pedido: PedidoData): number {
    return pedido.productos.reduce((total, producto) => total + producto.cantidad * producto.producto.precio, 0);
  }

  filtrarCorreos(event: Event) {
    const input = event.target as HTMLInputElement;
    const correo = input.value.trim().toLowerCase();

    if (correo === '') {
      this.filteredCorreos = this.correos;
    } else {
      this.filteredCorreos = this.correos.filter(c => c.toLowerCase().includes(correo));
    }
  }

  seleccionarCorreo(correo: string) {
    const control = this.filtrosForm.get('correo');
    if (control) {
      control.setValue(correo);
    }
    this.filteredCorreos = [];
    this.aplicarFiltros();
  }

  cambiarEstado(pedido: PedidoData, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const nuevoEstado = selectElement.value;
    if (nuevoEstado === pedido.estado || nuevoEstado === '') {
      return;
    } else {
      pedido.estado = nuevoEstado;
      console.log('Nuevo estado', nuevoEstado);
      this.pedidosService.cambiarEstadoPedido(pedido.id, nuevoEstado)
        .then(response => {
          console.log('Estado cambiado', response);
        })
        .catch(error => {
          console.error('Error cambiando estado', error);
        });
    }
  }
}
