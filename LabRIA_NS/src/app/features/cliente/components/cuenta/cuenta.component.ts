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
  totalpeticionesfinaliazdas: number = 0;
  porcentajeFinalizadas: number = 0;

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
      this.totalpeticionesfinaliazdas = response.pedidos.finalizados;
      this.porcentajeFinalizadas = (this.totalpeticionesfinaliazdas * 100) / this.totalpeticiones;
      // redondear un numero despues de la coma
      this.porcentajeFinalizadas = Math.round(this.porcentajeFinalizadas * 100) / 100;
    }).catch((error) => {
      console.log(error);
    });
  }

}
