import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { clienteBodyComponent } from './components/body/body.component';
import { clienteDashboardComponent } from './components/dashboard/dashboard.component';



@NgModule({
  declarations: [
    clienteBodyComponent,
    clienteDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ClienteModule { }
