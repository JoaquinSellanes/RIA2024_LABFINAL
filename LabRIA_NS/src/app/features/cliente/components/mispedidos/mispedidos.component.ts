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
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.component.html',
  styleUrl: './mispedidos.component.scss'
})
export class MispedidosComponent implements OnInit {
  loaded: boolean = false;
  pedidos: PedidoData[] = [];
  error: boolean = false;
  constructor(private pedidosService: PedidosService) { }

  async ngOnInit() {
    try {
      const respose = await this.pedidosService.getMisPedidos();
      this.pedidos = respose.map((pedido: any) => {
        return {
          id: pedido.id,
          cliente: pedido.cliente.email,
          fecha: pedido.fecha,
          estado: pedido.estado,
          cantProductos: pedido.productos.length
        }
      });

      this.error = false;
      this.loaded = true;
      // console.log("Pedidos", this.pedidos);
    } catch (error) {
      console.error('Error fetching pedidos', error);
      this.error = true;
    }
  }
}