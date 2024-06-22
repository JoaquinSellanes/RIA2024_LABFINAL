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

  getToken() {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found in localStorage');
    } else {
      return token;
    }
  }
}
