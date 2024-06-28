import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { clienteBodyComponent } from './components/body/body.component';
import { clienteDashboardComponent } from './components/dashboard/dashboard.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { ClienteFooterComponent } from './components/footer/footer.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { MispedidosComponent } from './components/mispedidos/mispedidos.component';

import { SharedModule } from '../../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    clienteBodyComponent,
    clienteDashboardComponent,
    CartModalComponent,
    ClienteFooterComponent,
    CuentaComponent,
    MispedidosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClienteModule { }
