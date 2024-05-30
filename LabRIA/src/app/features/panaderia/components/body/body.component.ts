import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class PanaderiaBodyComponent implements AfterViewInit {
  
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
    this.router.navigate(['/panaderia']);
  }
}
