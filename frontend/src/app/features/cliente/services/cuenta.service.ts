import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';

interface CuentaResponse {
  email: string;
  role: string;
  pedidos: {
    total: number;
    pendientes: number;
    enPreparacion: number;
    listosParaRecoger: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async getMiCuenta(): Promise<CuentaResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    try {
      const response = await firstValueFrom(this.http.get<CuentaResponse>(`${this.apiUrl}/usuarios/mi-cuenta`, { headers }));
      return response;
    } catch (error) {
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
