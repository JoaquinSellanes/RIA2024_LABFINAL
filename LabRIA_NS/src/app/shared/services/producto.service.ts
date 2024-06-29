import { Injectable } from '@angular/core';
import { Producto } from '../../features/shared/models/producto';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // GET    | /productos/disponibles
  async getProductosDisponibles() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    try {
      const response = await firstValueFrom(this.http.get(`${this.apiUrl}/productos/disponibles`, { headers }));
      return response;
    } catch (error) {
      console.error('Error fetching available products', error);
      throw error;
    }
  }

  // GET    | /productos/:id
  async getProductoById(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    try {
      const response = await firstValueFrom(this.http.get(`${this.apiUrl}/productos/${id}`, { headers }));
      return response;
    } catch (error) {
      console.error('Error fetching product by id', error);
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
