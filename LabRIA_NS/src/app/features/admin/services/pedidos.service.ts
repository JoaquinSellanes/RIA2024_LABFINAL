import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
      const response = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/pedidos`));
      return response;
    } catch (error) {
      console.error('Error fetching pedidos', error);
      throw error;
    }
  }
}
