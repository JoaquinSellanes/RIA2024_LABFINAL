import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../../shared/models/producto';
import { ToastComponent } from '../../../../shared/toast/toast.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  loaded: boolean = false;
  productos: any = [];
  @ViewChild('toast') toast!: ToastComponent;

  constructor(private productoService: ProductoService) { }

  async ngOnInit() {
    try {
      this.productos = await this.productoService.getProductos();
      // console.log(this.productos);
      this.loaded = true;
    } catch (error) {
      console.error('Error fetching products in component', error);
    }
  }

  cambiarEstado(producto: Producto) {
    this.productos.map((p: Producto) => {
      if (p.id === producto.id) {
        p.isActive = !p.isActive;

        if (p.isActive) {
          this.productoService.activarProducto(p.id);
          this.toast.showToast(`Producto ${p.nombre} Activado, Este ahora se listara a los clientes`, 'alert alert-info');
        } else {
          this.productoService.desactivarProducto(p.id);
          this.toast.showToast(`Producto ${p.nombre} Desactivado, Este ahora no sera visto por los clientes`, 'alert alert-info');
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
}
