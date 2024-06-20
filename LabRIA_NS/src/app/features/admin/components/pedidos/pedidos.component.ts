import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent implements OnInit {

  pedidos: any[] = [];

  constructor(private pedidosService: PedidosService) { }

  async ngOnInit() {
    try {
      this.pedidos = await this.pedidosService.getPedidos();
      console.log("Pedidos", this.pedidos);

    } catch (error) {
      console.error('Error fetching pedidos', error);
    }
  }
}
