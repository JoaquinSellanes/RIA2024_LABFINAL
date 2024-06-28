import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';

interface Insumo {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class InsumosService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getToken(): string {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }
    return token;
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  async getInsumos(): Promise<Insumo[]> {
    try {
      const headers = this.getHeaders();
      const response = await firstValueFrom(this.http.get<Insumo[]>(`${this.apiUrl}/ingredientes`, { headers }));
      console.log("Insumos fetched from API: ", response);
      return response;
    } catch (error) {
      console.error("Error fetching insumos: ", error);
      throw new Error('Error fetching insumos');
    }
  }

  async createInsumo(nombre: string): Promise<void> {
    try {
      const headers = this.getHeaders();
      await firstValueFrom(this.http.post(`${this.apiUrl}/ingredientes`, { nombre: nombre }, { headers }));
    } catch (error) {
      console.error("Error creating insumo: ", error);
      throw new Error('Error creating insumo');
    }
  }

  async deleteInsumo(id: number): Promise<void> {
    try {
      const headers = this.getHeaders();
      await firstValueFrom(this.http.delete(`${this.apiUrl}/ingredientes/${id}`, { headers }));
    } catch (error) {
      console.error("Error deleting insumo: ", error);
      throw new Error('Error deleting insumo');
    }
  }
}
