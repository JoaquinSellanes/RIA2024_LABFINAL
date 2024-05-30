import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loginUsuario(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/usuarios/login`, { email, password });
  }

  registerUsuario(usuario: Usuario) {
    return this.http.post(`${this.apiUrl}/usuarios/register`, usuario);
  }
}
