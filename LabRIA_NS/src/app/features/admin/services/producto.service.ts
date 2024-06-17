import { Injectable } from '@angular/core';
import { Producto } from '../../shared/models/producto';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // crear producto post /productos
  async createProducto(producto: Producto) {
    try {
      const response = await firstValueFrom(this.http.post(`${this.apiUrl}/productos`, producto));
      return response;
    } catch (error) {
      console.error('Error creating product', error);
      throw error;
    }
  }

  // traer productos /productos/disponibles
  async getProductos() {
    try {
      const response = await firstValueFrom(this.http.get(`${this.apiUrl}/productos/disponibles`));
      return response;
    } catch (error) {
      console.error('Error fetching products', error);
      throw error;
    }
  }
}