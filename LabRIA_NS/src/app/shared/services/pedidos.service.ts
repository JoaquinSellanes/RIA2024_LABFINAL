import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // POST     | /pedidos/
  async createPedido(productos: any[], fechaEntrega: string): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    try {
      const response = await firstValueFrom(this.http.post(`${this.apiUrl}/pedidos/`, { productos, fechaEntrega }, { headers }));
      return response;
    } catch (error) {
      return error;
    }
  }

  // GET      | /pedidos/mis-pedidos
  async getMisPedidos(): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    try {
      const response = await firstValueFrom(this.http.get(`${this.apiUrl}/pedidos/mis-pedidos`, { headers }));
      return response;
    } catch (error) {
      return error;
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
