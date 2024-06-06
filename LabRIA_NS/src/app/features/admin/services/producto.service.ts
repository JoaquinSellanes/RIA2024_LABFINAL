import { Injectable } from '@angular/core';
import { Producto } from '../../shared/models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }

  async createProducto(producto: Producto) {
    console.log("service -> ", producto);
  }
}
