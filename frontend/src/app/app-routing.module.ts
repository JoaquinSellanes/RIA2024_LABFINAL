import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './core/guards/admin.guard';
import { UserGuard } from './core/guards/user.guard';
import { PanaderiaGuard } from './core/guards/panaderia.guard';
// AUTH Y SHARED
import { LandingComponent } from './shared/landing/landing.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
// ADMIN
import { AdminBodyComponent } from './features/admin/components/body/body.component';
import { DashboardComponent } from './features/admin/components/dashboard/dashboard.component';
import { ProductosComponent } from './features/admin/components/productos/productos.component';
import { CrearProductoComponent } from './features/admin/components/crear-producto/crear-producto.component';
import { PedidosComponent } from './features/admin/components/pedidos/pedidos.component';
import { InsumosComponent } from './features/admin/components/insumos/insumos.component';
import { UsuariosComponent } from './features/admin/components/usuarios/usuarios.component';
import { InformesComponent } from './features/admin/components/informes/informes.component';
import { EditarProductoComponent } from './features/admin/components/editar-producto/editar-producto.component';
// CLIENTE o USUARIO
import { clienteBodyComponent } from './features/cliente/components/body/body.component';
import { MispedidosComponent } from './features/cliente/components/mispedidos/mispedidos.component';
import { CuentaComponent } from './features/cliente/components/cuenta/cuenta.component';
// PANADERO
import { panaderoBodyComponent } from './features/panadero/components/body/body.component';
import { panaderoDashboardComponent } from './features/panadero/components/dashboard/dashboard.component';
import { InsumosPanaderoComponent } from './features/panadero/components/insumos/insumos.component';
import { PedidoDetallesComponent } from './features/panadero/components/pedido-detalles/pedido-detalles.component';
// SHARED
import { TiendaComponent } from './shared/tienda/tienda.component';

const routes: Routes = [
  // { path: '', component: LandingComponent }
  { path: '', redirectTo: 'ingreso', pathMatch: 'full' },
  { path: 'ingreso', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  // ADMIN
  {
    path: 'administracion', component: AdminBodyComponent, canActivate: [AdminGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'crear-producto', component: CrearProductoComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'insumos', component: InsumosComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'informes', component: InformesComponent },
      { path: 'tienda', component: TiendaComponent },
      { path: 'editar-producto/:id', component: EditarProductoComponent },
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
  // CLIENTE
  {
    path: 'cliente', component: clienteBodyComponent, children: [
      { path: '', redirectTo: 'tienda', pathMatch: 'full' },
      { path: 'tienda', component: TiendaComponent },
      { path: 'mispedidos', component: MispedidosComponent },
      { path: 'cuenta', component: CuentaComponent },
      { path: '**', redirectTo: 'tienda' }
    ], canActivate: [UserGuard]
  },
  // PANADERO
  {
    path: 'panaderia', component: panaderoBodyComponent, children: [
      { path: '', redirectTo: 'pedidos', pathMatch: 'full' },
      { path: 'pedidos', component: panaderoDashboardComponent },
      { path: 'pedidos/:id', component: PedidoDetallesComponent },
      { path: 'insumos', component: InsumosPanaderoComponent },
      { path: 'tienda', component: TiendaComponent },
      { path: '**', redirectTo: 'pedidos' }
    ], canActivate: [PanaderiaGuard]
  },
  // comodin
  { path: '**', redirectTo: 'ingreso' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }