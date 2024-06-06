import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class AdminBodyComponent implements AfterViewInit {

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    const button = document.querySelector('#menu-button');
    const menu = document.querySelector('#menu');

    button?.addEventListener('click', () => {
      menu?.classList.toggle('hidden');
    });
  }

  salir() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    this.router.navigate(['/ingreso']);
  }
}
