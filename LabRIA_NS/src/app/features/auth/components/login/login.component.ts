import { Component } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      console.log('Formulario válido');

      this.authService.loginUsuario(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe((res: any) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('email', res.nombre);

          console.log(res.role);

          if (res.role === "PANADERO") {
            this.router.navigate(['/panaderia/pedidos']);
          } else if (res.role === "ADMIN") {
            this.router.navigate(['/admininstracion/dashboard']);
          } else if (res.role === "USER") {
            this.router.navigate(['/cliente/pedidos']);
          }
        }, (error) => {
          console.error('Error logging in', error);
        });
    }
  }
}
