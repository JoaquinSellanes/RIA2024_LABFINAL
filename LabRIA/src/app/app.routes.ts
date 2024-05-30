import { Routes } from '@angular/router';

import { LandingComponent } from './features/shared/landing/landing/landing.component';
import { LoginPanaderoComponent } from './features/auth/components/panadero/login/login.component';
import { LoginClienteComponent } from './features/auth/components/cliente/login/login.component';
import { LoginAdminComponent } from './features/auth/components/admin/login/login.component';
import { RegisterComponent } from './features/auth/components/panadero/register/register.component';
import { AuthGuardPanaderia } from './core/guards/panaderia.guard';
import { DashboardComponent } from './features/panaderia/dashboard/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'inicio', component: LandingComponent },
  { path: 'panaderia', component: LoginPanaderoComponent },
  { path: 'registroPanadero', component: RegisterComponent },
  { path: 'cliente', component: LoginClienteComponent },
  { path: 'admin', component: LoginAdminComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardPanaderia] },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];
