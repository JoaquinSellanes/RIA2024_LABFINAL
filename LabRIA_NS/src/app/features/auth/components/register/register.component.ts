import { Component } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Usuario } from '../../../shared/models/usuario.model';

@Component({
  selector: 'app-register',
  providers: [AuthService, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }

  generateUniqueId(): number {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    return timestamp + randomNum;
  }

  comprobarContraseñas() {
    if (this.registerForm.value.password !== this.registerForm.value.password2) {
      console.log('Las contraseñas no coinciden');
      return false;
    }
    console.log('Las contraseñas coinciden');
    return true;
  }

  onSubmit() {
    console.log(this.registerForm.value);

    if (this.registerForm.valid && this.comprobarContraseñas()) {
      let usuario: Usuario = {
        id: this.generateUniqueId(),
        email: this.registerForm.value.email,
        telefono: this.registerForm.value.telefono,
        password: this.registerForm.value.password,
        enabled: false,
        role: 'USER'
      };

      this.authService.registerUsuario(usuario)
        .subscribe((res: any) => {
          console.log(res);
          this.router.navigate(['/panaderia']);
        }, (error) => {
          console.error('Error logging in', error);
        });
    }
  }

}
