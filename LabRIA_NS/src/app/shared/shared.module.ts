import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { ToastComponent } from './toast/toast.component';
import { TiendaComponent } from './tienda/tienda.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LandingComponent,
    ToastComponent,
    TiendaComponent,
    CartModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LandingComponent,
    ToastComponent
  ]
})
export class SharedModule { }
