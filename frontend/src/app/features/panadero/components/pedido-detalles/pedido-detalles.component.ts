import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
  insumosTotales: { nombre: string; totalCantidad: number }[] = [];
  nuevoEstado: string = '';
  estados: string[] = ['pendiente', 'en preparación', 'listo para recoger'];

  @ViewChild('modalConfirmarEstado') modalConfirmarEstado!: ElementRef<HTMLDialogElement>;

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
      this.calcularInsumosTotales();
      console.log("Pedido", this.pedido);
      console.log("Insumos Totales", this.insumosTotales);
    } catch (error) {
      console.error("Error fetching pedido details:", error);
    }
  }

  calcularInsumosTotales() {
    const insumosMap: { [key: string]: number } = {};

    this.pedido.productos.forEach((item: any) => {
      item.producto.ingredientes.forEach((ingrediente: any) => {
        ingrediente.totalCantidad = ingrediente.cantidad * item.cantidad; // Calcular totalCantidad para cada ingrediente
        const cantidadTotal = ingrediente.totalCantidad;
        if (insumosMap[ingrediente.nombre]) {
          insumosMap[ingrediente.nombre] += cantidadTotal;
        } else {
          insumosMap[ingrediente.nombre] = cantidadTotal;
        }
      });
    });

    this.insumosTotales = Object.keys(insumosMap).map(nombre => ({
      nombre,
      totalCantidad: insumosMap[nombre]
    }));
  }

  cambiarEstado(event: any) {
    this.nuevoEstado = event.target.value;
    this.openModalConfirmarEstado();
  }

  async confirmarCambioEstado() {
    try {
      await this.pedidosService.cambiarEstado(this.pedido.id, this.nuevoEstado);
      this.pedido.estado = this.nuevoEstado;
      this.closeModalConfirmarEstado();
    } catch (error) {
      console.error('Error changing order status', error);
    }
  }

  volver() {
    this.router.navigate(['/panaderia/pedidos']);
  }

  openModalConfirmarEstado() {
    this.modalConfirmarEstado.nativeElement?.showModal();
  }

  closeModalConfirmarEstado() {
    this.modalConfirmarEstado.nativeElement?.close();
  }
}
