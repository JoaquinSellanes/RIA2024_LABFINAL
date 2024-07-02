import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // GET /pedidos/all
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

  // GET /pedidos/:id
  async getPedido(id: number): Promise<any> {
    try {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
      const response = await firstValueFrom(this.http.get<any>(`${this.apiUrl}/pedidos/${id}`, { headers }));
      return response;
    } catch (error) {
      console.error(`Error fetching pedido with id ${id}`, error);
      throw error;
    }
  }

  async cambiarEstadoEnPreparacion(pedidoId: number): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    try {
      await firstValueFrom(this.http.post<void>(`${this.apiUrl}/pedidos/${pedidoId}/en-preparacion`, {}, { headers }));
    } catch (error) {
      console.error('Error al cambiar el estado del pedido a en preparación', error);
      throw error;
    }
  }
  
  async cambiarEstadoListoParaRecoger(pedidoId: number): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    try {
      await firstValueFrom(this.http.post<void>(`${this.apiUrl}/pedidos/${pedidoId}/listo-para-recoger`, {}, { headers }));
    } catch (error) {
      console.error('Error al cambiar el estado del pedido a listo para recoger', error);
      throw error;
    }
  }

  // POST /pedidos/cambiar-estado
  async cambiarEstado(pedidoId: number, estado: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    try {
      await firstValueFrom(this.http.post<void>(`${this.apiUrl}/pedidos/cambiar-estado`, { id: pedidoId, estado }, { headers }));
    } catch (error) {
      console.error(`Error al cambiar el estado del pedido a ${estado}`, error);
      throw error;
    }
  }

  async getIngredientes(pedidoIds: number[]): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    try {
      const response = await firstValueFrom(this.http.post<any>(`${this.apiUrl}/pedidos/ingredientes`, { pedidoIds }, { headers }));
      return response;
    } catch (error) {
      console.error('Error fetching ingredientes necesarios', error);
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
