import { Producto } from './producto';

export class Pedido {
  id: number;
  clienteId: number;
  productos: Producto[];
  estado: string;
  fecha: string;
  fechaEntrega: string;

  constructor({ id, clienteId, productos, estado, fecha, fechaEntrega }: {
    id: number,
    clienteId: number,
    productos: Producto[],
    estado: string,
    fecha: string,
    fechaEntrega: string
  }) {
    this.id = id;
    this.clienteId = clienteId;
    this.productos = productos;
    this.estado = estado;
    this.fecha = fecha;
    this.fechaEntrega = fechaEntrega;
  }
}