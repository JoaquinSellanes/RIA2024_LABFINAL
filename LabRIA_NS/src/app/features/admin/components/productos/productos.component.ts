import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../../shared/models/producto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
  providers: [ProductoService, HttpClient]
})
export class ProductosComponent implements OnInit {
  productos = [];

  constructor(private productoService: ProductoService) { }

  async ngOnInit() {
    await this.productoService.getProductos().then((data) => {
      this.productos = data;
    }).catch((error) => {
      console.log(error);
    });

    console.log(this.productos);
  }
}
