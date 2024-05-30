import { Routes } from '@angular/router';

import { AuthGuardPanaderia } from './core/guards/panaderia.guard';
import { adminGuard } from './core/guards/admin.guard';
import { userGuard } from './core/guards/user.guard';

import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { PDashboardComponent } from './features/panaderia/components/dashboard/dashboard.component';
import { PanaderiaBodyComponent } from './features/panaderia/components/body/body.component';
import { ADashboardComponent } from './features/admin/components/dashboard/dashboard.component';
import { AdminBodyComponent } from './features/admin/components/body/body.component';
import { UBodyComponent } from './features/user/components/body/body.component';
import { UDashboardComponent } from './features/user/components/dashboard/dashboard.component';


export const routes: Routes = [
  { path: 'inicio', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  {
    path: 'panaderia', component: PanaderiaBodyComponent, canActivate: [AuthGuardPanaderia],
    children: [
      { path: 'dashboard', component: PDashboardComponent, canActivate: [AuthGuardPanaderia] }
    ]
  },
  {
    path: 'admin', component: AdminBodyComponent, canActivate: [adminGuard],
    children: [
      { path: 'dashboard', component: ADashboardComponent, canActivate: [adminGuard] }
    ]
  },
  {
    path: 'user', component: UBodyComponent, canActivate: [userGuard],
    children: [
      { path: 'dashboard', component: UDashboardComponent, canActivate: [userGuard] }
    ]
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];
