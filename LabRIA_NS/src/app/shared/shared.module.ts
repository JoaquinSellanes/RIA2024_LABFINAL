import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [
    LandingComponent,
    ToastComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LandingComponent,
    ToastComponent
  ]
})
export class SharedModule { }
