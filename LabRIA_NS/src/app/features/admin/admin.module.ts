import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// import { Router}

import { AdminBodyComponent } from './components/body/body.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AdminBodyComponent,
    DashboardComponent,
    ProductosComponent,
    CrearProductoComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
