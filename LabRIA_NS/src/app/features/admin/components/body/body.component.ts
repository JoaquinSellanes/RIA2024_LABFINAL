import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { ThemeService } from '../../../../shared/services/theme.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class AdminBodyComponent implements AfterViewInit {

  constructor(private router: Router, public themeService: ThemeService) { }

  ngAfterViewInit(): void {
    const button = document.querySelector('#menu-button');
    const menu = document.querySelector('#menu');

    button?.addEventListener('click', () => {
      menu?.classList.toggle('hidden');
    });
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
