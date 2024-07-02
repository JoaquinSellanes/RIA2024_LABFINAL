import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { panaderoBodyComponent } from './components/body/body.component';
import { panaderoDashboardComponent } from './components/dashboard/dashboard.component';
import { PanaderoFooterComponent } from './components/footer/footer.component';
import { PedidoDetallesComponent } from './components/pedido-detalles/pedido-detalles.component';


@NgModule({
  declarations: [
    panaderoBodyComponent,
    panaderoDashboardComponent,
    PanaderoFooterComponent,
    PedidoDetallesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PanaderoModule { }
