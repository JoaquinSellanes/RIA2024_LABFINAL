import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InsumosService } from '../../services/insumos.service';
import { ProductoService } from '../../services/producto.service';
import { UsuariosService } from '../../services/usuarios.service';
import { PedidosService } from '../../services/pedidos.service';
import * as echarts from 'echarts';

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  loaded: boolean = false;

  pedidos: Pedido[] = [];
  usuarios: Usuario[] = [];
  productos: Producto[] = [];
  insumos: Insumo[] = [];

  totalPedidos: number = 0;
  totalUsuarios: number = 0;
  totalProductosActivos: number = 0;

  constructor(
    private insumosService: InsumosService,
    private productoService: ProductoService,
    private usuariosService: UsuariosService,
    private pedidosService: PedidosService
  ) { }

  async ngOnInit() {
    console.log('DashboardComponent ngOnInit');
    try {
      this.insumos = await this.insumosService.getInsumos() as Insumo[];
      // console.log('insumos', this.insumos);

      this.productos = await this.productoService.getProductos() as Producto[];
      // console.log('productos', this.productos);

      this.usuarios = await this.usuariosService.getUsuarios() as Usuario[];
      // console.log('usuarios', this.usuarios);

      this.pedidos = await this.pedidosService.getPedidos() as Pedido[];
      // console.log('pedidos', this.pedidos);

      this.totalPedidos = this.pedidos.length;
      this.totalUsuarios = this.usuarios.length;
      this.totalProductosActivos = this.productos.filter(p => p.isActive).length;

      this.loaded = true;
      this.initializeCharts();
    } catch (error) {
      console.error('Error fetching data in DashboardComponent', error);
    }
  }

  ngAfterViewInit() {
    if (this.loaded) {
      this.initializeCharts();
    }
  }

  getColorScheme() {
    return ['#172026', '#5FCDD9', '#027373', '#04BFAD', '#04BF9D'];
  }

  initializeCharts() {
    const colorScheme = this.getColorScheme();

    const chartPedidosDom = document.getElementById('chartPedidos');
    if (chartPedidosDom) {
      const myChart = echarts.init(chartPedidosDom);
      const option = {
        title: {
          text: 'Estados de los pedidos'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Pedidos',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            padAngle: 5,
            itemStyle: {
              borderRadius: 10,
              color: (params: { dataIndex: number; }) => colorScheme[params.dataIndex % colorScheme.length]
            },
            data: [
              { value: this.pedidos.filter(p => p.estado === 'pendiente').length, name: 'Pendiente' },
              { value: this.pedidos.filter(p => p.estado === 'listo para recoger').length, name: 'Listo para recoger' },
              { value: this.pedidos.filter(p => p.estado === 'en preparación').length, name: 'En preparación' }
            ]
          }
        ]
      };
      myChart.setOption(option);
    }


    const chartProductosDom = document.getElementById('chartProductos');
    if (chartProductosDom) {
      const myChart = echarts.init(chartProductosDom);
      const option = {
        color: colorScheme,
        title: {
          text: 'Productos por disponibilidad'
        },
        tooltip: {},
        xAxis: {
          data: ['Activos', 'Inactivos']
        },
        yAxis: {},
        series: [{
          name: 'Productos',
          type: 'bar',
          data: [
            this.productos.filter(p => p.isActive).length,
            this.productos.filter(p => !p.isActive).length
          ],
          itemStyle: {
            color: (params: { dataIndex: number; }) => colorScheme[params.dataIndex % colorScheme.length]
          }
        }]
      };
      myChart.setOption(option);
    }

    const chartUsuariosDom = document.getElementById('chartUsuarios');
    if (chartUsuariosDom) {
      const myChart = echarts.init(chartUsuariosDom);
      const option = {
        title: {
          text: 'Tipos de usuarios'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Usuarios',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            padAngle: 5,
            itemStyle: {
              borderRadius: 10,
              color: (params: { dataIndex: number; }) => colorScheme[params.dataIndex % colorScheme.length]
            },
            data: [
              { value: this.usuarios.filter(u => u.role === 'ADMIN').length, name: 'Admin' },
              { value: this.usuarios.filter(u => u.role === 'PANADERO').length, name: 'Panadero' },
              { value: this.usuarios.filter(u => u.role === 'CLIENTE').length, name: 'Cliente' }
            ]
          }
        ]
      };
      myChart.setOption(option);
    }

    const chartVentasDom = document.getElementById('chartVentas');
    if (chartVentasDom) {
      const myChart = echarts.init(chartVentasDom);
      const option = {
        color: colorScheme,
        title: {
          text: 'Ventas por producto'
        },
        tooltip: {},
        xAxis: {
          data: this.productos.map(p => p.nombre)
        },
        yAxis: {},
        series: [{
          name: 'Ventas',
          type: 'bar',
          data: this.productos.map(p => p.precio * this.pedidos.filter(pe => pe.productos.some(pr => pr.producto.id === p.id)).reduce((acc, pe) => acc + pe.productos.filter(pr => pr.producto.id === p.id).reduce((acc2, pr) => acc2 + pr.cantidad, 0), 0)),
          itemStyle: {
            color: (params: { dataIndex: number; }) => colorScheme[params.dataIndex % colorScheme.length]
          }
        }]
      };
      myChart.setOption(option);
    }

    const chartClientesDom = document.getElementById('chartClientes');
    if (chartClientesDom) {
      const myChart = echarts.init(chartClientesDom);
      const option = {
        color: colorScheme,
        title: {
          text: 'Pedidos por cliente'
        },
        tooltip: {},
        xAxis: {
          data: this.usuarios.filter(u => u.role === 'CLIENTE').map(u => u.email)
        },
        yAxis: {},
        series: [{
          name: 'Pedidos',
          type: 'bar',
          data: this.usuarios.filter(u => u.role === 'CLIENTE').map(u => this.pedidos.filter(p => p.cliente.id === u.id).length),
          itemStyle: {
            color: (params: { dataIndex: number; }) => colorScheme[params.dataIndex % colorScheme.length]
          }
        }]
      };
      myChart.setOption(option);
    }

    const chartLineDom = document.getElementById('chartLine');
    if (chartLineDom) {
      const myChart = echarts.init(chartLineDom);
      const option = {
        color: colorScheme,
        title: {
          text: 'Ventas acumuladas'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.pedidos.map(p => p.fecha)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: 'Ventas',
          type: 'line',
          data: this.pedidos.map(p => p.productos.reduce((acc, pr) => acc + pr.cantidad * pr.producto.precio, 0)),
          itemStyle: {
            color: (params: { dataIndex: number; }) => colorScheme[params.dataIndex % colorScheme.length]
          }
        }]
      };
      myChart.setOption(option);
    }

  }
}
