import { Component, ViewChild } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastComponent } from '../../../../shared/toast/toast.component';

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
  @ViewChild('toast') toast!: ToastComponent;

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
          // console.log(res);
          // console.log("email: " + res.email);

          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('email', res.email);

          console.log(res.role);

          if (res.role === "PANADERO") {
            this.router.navigate(['/panaderia/pedidos']);
          } else if (res.role === "ADMIN") {
            this.router.navigate(['/administracion/dashboard']);
          } else if (res.role === "CLIENTE") {
            this.router.navigate(['/cliente/tienda']);
          }
        }, (error) => {
          if (error.error.error == "Invalid credentials") {
            this.toast.showToast('Credenciales inválidas', 'alert alert-error');
          } else {
            this.toast.showToast(error.error.error, 'alert alert-error');
          }
        });
    } else {
      this.toast.showToast('Por favor, rellene todos los campos', 'alert alert-error');
    }
  }
}
