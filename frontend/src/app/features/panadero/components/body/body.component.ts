import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../shared/services/theme.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class panaderoBodyComponent implements AfterViewInit {

  email = localStorage.getItem('email');

  constructor(private router: Router, public themeService: ThemeService) { }

  ngAfterViewInit(): void {
    const button = document.querySelector('#menu-button');
    const menu = document.querySelector('#menu');

    button?.addEventListener('click', () => {
      menu?.classList.toggle('hidden');
    });
  }

  changeTheme(theme: string): void {
    this.themeService.setTheme(theme);
  }


  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  salir() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    this.router.navigate(['/ingreso']);
  }
}
