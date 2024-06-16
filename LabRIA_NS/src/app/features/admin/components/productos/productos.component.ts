import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../../shared/models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']  // corregido el estilo 'styleUrl' a 'styleUrls'
})
export class ProductosComponent implements OnInit {
  productos: any = [];

  constructor(private productoService: ProductoService) { }

  async ngOnInit() {
    try {
      this.productos = await this.productoService.getProductos();
      console.log(this.productos);
    } catch (error) {
      console.error('Error fetching products in component', error);
    }
  }
}
