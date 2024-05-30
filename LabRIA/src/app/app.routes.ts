import { Routes } from '@angular/router';

import { LandingComponent } from './features/shared/landing/landing/landing.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { AuthGuardPanaderia } from './core/guards/panaderia.guard';
import { DashboardComponent } from './features/panaderia/components/dashboard/dashboard.component';
import { PanaderiaBodyComponent } from './features/panaderia/components/body/body.component';

export const routes: Routes = [
  { path: 'inicio', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  {
    path: 'panaderia', component: PanaderiaBodyComponent, canActivate: [AuthGuardPanaderia],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardPanaderia] }
    ]
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];
