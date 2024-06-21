import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';

interface PedidoData {
  id: number;
  cliente: string;
  fecha: string;
  estado: string;
  cantProductos: number;
}

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  pedidos: PedidoData[] = [];
  error: boolean = false;
  constructor(private pedidosService: PedidosService) { }

  async ngOnInit() {
    try {
      const respose = await this.pedidosService.getPedidos();
      this.pedidos = respose.map(pedido => {
        return {
          id: pedido.id,
          cliente: pedido.cliente.email,
          fecha: pedido.fecha,
          estado: pedido.estado,
          cantProductos: pedido.productos.length
        }
      });

      this.error = false;
      console.log("Pedidos", this.pedidos);
    } catch (error) {
      console.error('Error fetching pedidos', error);
      this.error = true;
    }
  }
}