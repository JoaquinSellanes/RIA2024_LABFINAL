import { Injectable } from '@angular/core';
import { Producto } from '../../shared/models/producto';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async createProducto(producto: Producto) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    try {
      const response = await firstValueFrom(this.http.post(`${this.apiUrl}/productos`, producto, { headers }));
      return response;
    } catch (error) {
      console.error('Error creating product', error);
      throw error;
    }
  }

  async getProductos(): Promise<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    try {
      const response = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/productos`, { headers }));
      return response;
    } catch (error) {
      console.error('Error fetching products', error);
      throw error;
    }
  }

  async activarProducto(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    try {
      const response = await firstValueFrom(this.http.put(`${this.apiUrl}/productos/${id}/activar`, {}, { headers }));
      return response;
    } catch (error) {
      console.error('Error activating product', error);
      throw error;
    }
  }

  async desactivarProducto(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    try {
      const response = await firstValueFrom(this.http.put(`${this.apiUrl}/productos/${id}/desactivar`, {}, { headers }));
      return response;
    } catch (error) {
      console.error('Error deactivating product', error);
      throw error;
    }
  }

  async getProductoById(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    try {
      const response = await firstValueFrom(this.http.get<Producto>(`${this.apiUrl}/productos/${id}`, { headers }));
      return response;
    } catch (error) {
      console.error('Error fetching product by id', error);
      throw error;
    }
  }

  async updateProducto(producto: Producto, id: number) {
    console.log("ProductoService -> updateProducto -> producto", producto);

    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    try {
      const response = await firstValueFrom(this.http.put(`${this.apiUrl}/productos/${id}`, producto, { headers }));
      return response;
    } catch (error) {
      console.error('Error updating product', error);
      throw error;
    }
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    } else {
      return token;
    }
  }
}
