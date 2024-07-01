import { Component, OnInit } from '@angular/core';
import { CuentaService } from '../../services/cuenta.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.scss'
})
export class CuentaComponent implements OnInit {
  email: string = '';
  role: string = '';
  totalpeticiones: number = 0;
  totalpeticionespendientes: number = 0;
  totalpeticionesenPreparacion: number = 0;
  totalpeticioneslistosParaRecoger: number = 0;
  porcentajeListosParaRecoger: number = 0;

  constructor(
    private cuentaService: CuentaService
  ) { }

  ngOnInit(): void {
    this.cuentaService.getMiCuenta().then((response) => {
      console.log(response);
      this.email = response.email;
      this.role = response.role;
      this.totalpeticiones = response.pedidos.total;
      this.totalpeticionespendientes = response.pedidos.pendientes;
      this.totalpeticionesenPreparacion = response.pedidos.enPreparacion;
      this.totalpeticioneslistosParaRecoger = response.pedidos.listosParaRecoger;
      this.porcentajeListosParaRecoger = (this.totalpeticioneslistosParaRecoger * 100) / this.totalpeticiones;
      this.porcentajeListosParaRecoger = Math.round(this.porcentajeListosParaRecoger * 100) / 100;
      if (isNaN(this.porcentajeListosParaRecoger)) {
        this.porcentajeListosParaRecoger = 0;
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}
