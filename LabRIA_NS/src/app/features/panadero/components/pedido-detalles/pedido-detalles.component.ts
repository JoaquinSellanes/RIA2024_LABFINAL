import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-pedido-detalles',
  templateUrl: './pedido-detalles.component.html',
  styleUrls: ['./pedido-detalles.component.scss']
})
export class PedidoDetallesComponent implements OnInit {
  @Input() pedidoId!: number;
  pedido: any;

  constructor(
    private route: ActivatedRoute,
    private pedidosService: PedidosService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.pedidoId = this.route.snapshot.params['id'];
    try {
      const response = await this.pedidosService.getPedido(this.pedidoId);
      this.pedido = response;
      this.pedido.productos.forEach((item: any) => {
        item.producto.ingredientes.forEach((ingrediente: any) => {
          ingrediente.totalCantidad = ingrediente.cantidad * item.cantidad;
        });
      });
      console.log("Pedido", this.pedido);
    } catch (error) {
      console.error("Error fetching pedido details:", error);
    }
  }

  volver() {
    this.router.navigate(['/panaderia/pedidos']);
  }
}
