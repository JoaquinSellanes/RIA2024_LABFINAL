import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { clienteBodyComponent } from './components/body/body.component';
import { clienteDashboardComponent } from './components/dashboard/dashboard.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';



@NgModule({
  declarations: [
    clienteBodyComponent,
    clienteDashboardComponent,
    CartModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ClienteModule { }