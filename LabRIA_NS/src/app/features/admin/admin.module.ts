import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './components/body/body.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';



@NgModule({
  declarations: [
    BodyComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
