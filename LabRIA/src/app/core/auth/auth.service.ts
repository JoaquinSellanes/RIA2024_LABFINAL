import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    return !!token;
  }
}
