import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// import { Router}

import { SharedModule } from '../../shared/shared.module';

import { AdminBodyComponent } from './components/body/body.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductoModalComponent } from './components/producto-modal/producto-modal.component';


@NgModule({
  declarations: [
    AdminBodyComponent,
    DashboardComponent,
    ProductosComponent,
    CrearProductoComponent,
    FooterComponent,
    ProductoModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
