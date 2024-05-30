import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticatedPanaderia(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (role === 'PANADERO') {
      return !!token;
    }
    return false;
  }

  isAuthenticatedUser(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (role === 'USER') {
      return !!token;
    }
    return false;
  }

  isAuthenticatedAdmin(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      return !!token;
    }
    return false;
  }
}
