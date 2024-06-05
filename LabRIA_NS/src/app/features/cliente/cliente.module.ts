import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from '../user/components/body/body.component';
import { DashboardComponent } from '../user/components/dashboard/dashboard.component';



@NgModule({
  declarations: [
    BodyComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClienteModule { }
