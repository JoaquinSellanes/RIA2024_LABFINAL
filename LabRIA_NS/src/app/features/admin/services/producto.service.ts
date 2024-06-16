import { Injectable } from '@angular/core';
import { Producto } from '../../shared/models/producto';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  apiUrl = environment.apiUrl;

  constructor() { }

  async createProducto(producto: Producto) {
    console.log("service -> ", producto);
  }

  // traer productos /productos/disponibles
  async getProductos() {
    try {
      const response = await fetch(`${this.apiUrl}/productos`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
}
