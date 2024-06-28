import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // GET    | /pedidos/
  async getPedidos(): Promise<any[]> {
    try {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);

      const response = await firstValueFrom(this.http.post<any[]>(`${this.apiUrl}/pedidos/all`, {}, { headers }));
      return response;
    } catch (error) {
      console.error('Error fetching pedidos', error);
      throw error;
    }
  }

  // POST   | /pedidos/all
  async getPedidosFiltrados(fechaInicio: string, fechaFin: string, estado: string): Promise<any[]> {
    try {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);

      const body = {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        estado: estado
      }

      const response = await firstValueFrom(this.http.post<any[]>(`${this.apiUrl}/pedidos/all`, body, { headers }));
      return response;
    } catch (error) {
      console.error('Error fetching pedidos', error);
      throw error;
    }
  }

  // POST   | /pedidos/ingredientes
  // Body {
  // "pedidoIds": [1, 2, 3]
  // }
  async getIngredientes(pedidoIds: number[]): Promise<any[]> {
    try {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);

      const body = {
        pedidoIds: pedidoIds
      }

      const response = await firstValueFrom(this.http.post<any[]>(`${this.apiUrl}/pedidos/ingredientes`, body, { headers }));
      return response;
    } catch (error) {
      console.error('Error fetching ingredientes', error);
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
