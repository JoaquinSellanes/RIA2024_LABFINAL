import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';

interface Usuario {
  id: number;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async getUsuarios(): Promise<Usuario[]> {
    try {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
      const response = await firstValueFrom(this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`, { headers }));
      return response;
    } catch (error) {
      console.error('Error fetching users', error);
      throw error;
    }
  }

  // /usuarios/modificar-rol
  async cambiarRol(userId: number, role: string): Promise<void> {
    try {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
      await firstValueFrom(this.http.post<void>(`${this.apiUrl}/usuarios/modificar-rol`, { id: userId, role: role }, { headers }));
    } catch (error) {
      console.error('Error changing role', error);
      throw error;
    }

  }

  private getToken(): string {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }
    return token;
  }
}
