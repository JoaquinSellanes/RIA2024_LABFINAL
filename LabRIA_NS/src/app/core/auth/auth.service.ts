import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  isAuthenticatedPanaderia(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (role === 'PANADERO') {
      return !!token;
    }
    return false;
  }

  isAuthenticatedUser(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (role === 'CLIENTE') {
      return !!token;
    }
    return false;
  }

  isAuthenticatedAdmin(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      return !!token;
    }
    return false;
  }
}
