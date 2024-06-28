import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ToastComponent } from '../../../../shared/toast/toast.component';

interface PedidoData {
  id: number;
  cliente: string;
  fecha: string;
  estado: string;
  cantProductos: number;
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
  error: boolean = false;
  paginaActual: number = 1;
  elementosPorPagina: number = 10;
  totalPaginas: number = 1;
  mostrarInsumosTabla: boolean = false;
  insumosNecesarios: InsumoNecesario[] = [];

  filtrosForm: FormGroup;

  @ViewChild('toast') toast!: ToastComponent;

  constructor(
    private pedidosService: PedidosService,
    private fb: FormBuilder
  ) {
    this.filtrosForm = this.fb.group({
      estado: [''],
      fechaInicio: [''],
      fechaFin: ['']
    });
  }

  async ngOnInit() {
    await this.cargarPedidos();
  }

  async cargarPedidos() {
    try {
      const response = await this.pedidosService.getPedidos();
      this.pedidos = response.map(pedido => ({
        id: pedido.id,
        cliente: pedido.cliente.email,
        fecha: pedido.fecha,
        estado: pedido.estado,
        cantProductos: pedido.productos.length
      }));
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

    if (fechaInicio && fechaFin && new Date(fechaInicio) > new Date(fechaFin)) {
      this.toast.showToast('La fecha de inicio no puede ser mayor que la fecha de fin', 'alert alert-error');
      return;
    }

    this.pedidosService.getPedidosFiltrados(fechaInicio, fechaFin, estado)
      .then(response => {
        this.pedidos = response.map(pedido => ({
          id: pedido.id,
          cliente: pedido.cliente.email,
          fecha: pedido.fecha,
          estado: pedido.estado,
          cantProductos: pedido.productos.length
        }));
        this.totalPaginas = Math.ceil(this.pedidos.length / this.elementosPorPagina);
        this.paginaActual = 1;
        this.actualizarPagina();
        this.error = false;
        this.loaded = true;
      })
      .catch(error => {
        console.error('Error fetching pedidos', error);
        this.error = true;
      });
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
    this.pedidosPaginados = this.pedidos.slice(inicio, fin);
  }

  mostrarInsumos() {
    this.obtenerInsumosNecesarios();
  }

  limpiarFiltros() {
    this.filtrosForm.reset();
    this.aplicarFiltros();
  }

  async obtenerInsumosNecesarios() {
    try {
      const pedidoIds = this.pedidos.map(pedido => pedido.id);
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
}
