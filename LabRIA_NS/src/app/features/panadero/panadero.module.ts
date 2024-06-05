import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from '../panaderia/components/body/body.component';
import { DashboardComponent } from '../panaderia/components/dashboard/dashboard.component';



@NgModule({
  declarations: [
    BodyComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PanaderoModule { }
