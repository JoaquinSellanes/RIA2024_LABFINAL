import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loginUsuario(email: string, password: string) {
    console.log("loginUsuario");
    return this.http.post(`${this.apiUrl}/auth/login`, {
      correo: email,
      password
    });
  }

  registerUsuario(usuario: Usuario) {
    return this.http.post(`${this.apiUrl}/auth/register`, usuario);
  }
}
