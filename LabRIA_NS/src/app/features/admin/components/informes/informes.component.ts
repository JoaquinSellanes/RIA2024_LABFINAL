import { Component, OnInit } from '@angular/core';
import { InsumosService } from '../../services/insumos.service';
import { ProductoService } from '../../services/producto.service';
import { UsuariosService } from '../../services/usuarios.service';
import { PedidosService } from '../../services/pedidos.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  ingredientes: { nombre: string; cantidad: number }[];
  isActive: boolean;
}

interface Pedido {
  id: number;
  productos: {
    cantidad: number;
    producto: Producto;
    ingredientesNecesarios: { nombre: string; cantidad: number }[];
  }[];
  estado: string;
  fecha: string;
  cliente: { id: number; email: string };
}

interface Usuario {
  id: number;
  email: string;
  role: string;
}

interface Insumo {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {
  usuarios: Usuario[] = [];
  insumos: Insumo[] = [];
  productos: Producto[] = [];
  pedidos: Pedido[] = [];

  dataProductos: any[] = [];
  dataPedidos: any[] = [];

  constructor(
    private insumosService: InsumosService,
    private productoService: ProductoService,
    private usuariosService: UsuariosService,
    private pedidosService: PedidosService
  ) { }

  async ngOnInit() {
    try {
      this.insumos = await this.insumosService.getInsumos() as Insumo[];
      this.productos = await this.productoService.getProductos() as Producto[];
      this.usuarios = await this.usuariosService.getUsuarios() as Usuario[];
      this.pedidos = await this.pedidosService.getPedidos() as Pedido[];

      for (let producto of this.productos) {
        const ingredientes = producto.ingredientes.map(ingrediente => `${ingrediente.nombre} (${ingrediente.cantidad})`);
        let state = producto.isActive ? 'Activo' : 'Inactivo';
        this.dataProductos.push({
          id: producto.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          isActive: state,
        });
      }

      for (let pedido of this.pedidos) {
        let productos = pedido.productos.map(producto => producto.producto.nombre);
        this.dataPedidos.push({
          id: pedido.id,
          productos: productos,
          estado: pedido.estado,
          fecha: pedido.fecha,
          cliente: pedido.cliente.email,
        });
      }

      console.log('Insumos:', this.insumos);
      console.log('Productos:', this.productos);
      console.log('Usuarios:', this.usuarios);
      console.log('Pedidos:', this.pedidos);
    } catch (error) {
      console.error('Error fetching data in InformesComponent', error);
    }
  }

  exportUsuarios() {
    this.generateReport(this.usuarios, 'Usuarios');
  }

  exportInsumos() {
    this.generateReport(this.insumos, 'Insumos');
  }

  exportProductos() {
    this.generateReport(this.dataProductos, 'Productos');
  }

  exportPedidos() {
    this.generateReport(this.dataPedidos, 'Pedidos');
  }

  private async generateReport(data: any[], fileName: string) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(fileName);

    worksheet.columns = this.generateHeaders(data);

    data.forEach((item, index) => {
      const row = worksheet.addRow(item);

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

    this.applyHeaderStyles(worksheet);

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `${fileName}Report.xlsx`);
  }

  private generateHeaders(data: any[]): any[] {
    const headers: any[] = [];
    if (data.length > 0) {
      const firstRow = data[0];
      for (const key in firstRow) {
        if (firstRow.hasOwnProperty(key)) {
          headers.push({ header: key.charAt(0).toUpperCase() + key.slice(1), key: key, width: 20 });
        }
      }
    }
    return headers;
  }

  private applyHeaderStyles(worksheet: ExcelJS.Worksheet) {
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1E88E5' }
      };
    });
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
  }
}
