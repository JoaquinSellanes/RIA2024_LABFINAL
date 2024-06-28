import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ToastComponent } from '../../../../shared/toast/toast.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  loaded: boolean = false;
  productos: any[] = [];
  productosPaginados: any[] = [];
  paginaActual: number = 1;
  elementosPorPagina: number = 16;
  totalPaginas: number = 1;
  filtro: string = 'todos';

  @ViewChild('toast') toast!: ToastComponent;

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) { }

  async ngOnInit() {
    try {
      this.productos = await this.productoService.getProductos();
      this.aplicarFiltros();
      this.loaded = true;
    } catch (error) {
      console.error('Error fetching products in component', error);
    }
  }

  aplicarFiltros() {
    let productosFiltrados = this.productos;

    if (this.filtro === 'activos') {
      productosFiltrados = this.productos.filter(p => p.isActive);
    } else if (this.filtro === 'inactivos') {
      productosFiltrados = this.productos.filter(p => !p.isActive);
    }

    this.totalPaginas = Math.ceil(productosFiltrados.length / this.elementosPorPagina);
    this.actualizarPagina(productosFiltrados);
  }

  actualizarPagina(productosFiltrados: any[]) {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.productosPaginados = productosFiltrados.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina > 0 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.aplicarFiltros();
    }
  }

  cambiarFiltro(filtro: string) {
    this.filtro = filtro;
    this.paginaActual = 1;
    this.aplicarFiltros();
  }

  cambiarEstado(producto: any) {
    this.productos.map((p: any) => {
      if (p.id === producto.id) {
        p.isActive = !p.isActive;

        if (p.isActive) {
          this.productoService.activarProducto(p.id);
          this.toast.showToast(`Producto ${p.nombre} Activado, Este ahora se listara a los clientes`, 'alert alert-info');
          this.aplicarFiltros();
        } else {
          this.productoService.desactivarProducto(p.id);
          this.toast.showToast(`Producto ${p.nombre} Desactivado, Este ahora no sera visto por los clientes`, 'alert alert-info');
          this.aplicarFiltros();
        }
        console.log('Producto actualizado', p.isActive);
      }
    });

  }

  consulta(id: string) {
    const modal: any = document.getElementById(id);
    if (modal) {
      modal.showModal();
    }
  }

  editar(id: number) {
    console.log('Editar producto', id);
    this.router.navigate([`/administracion/editar-producto/${id}`]);
  }
}
