import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  async getInsumos(): Promise<Insumo[]> {
    try {
      const response = await firstValueFrom(this.http.get<Insumo[]>(`${this.apiUrl}/ingredientes`));
      return response;
    } catch (error) {
      throw new Error('Error fetching insumos');
    }
  }

  async createInsumo(nombre: string): Promise<void> {
    try {
      await firstValueFrom(this.http.post(`${this.apiUrl}/ingredientes`, { nombre: nombre }));
    } catch (error) {
      throw new Error('Error creating insumo');
    }
  }

  async deleteInsumo(id: number): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/ingredientes/${id}`));
    } catch (error) {
      throw new Error('Error deleting insumo');
    }
  }
}
