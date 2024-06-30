class Pedido {
    constructor({ id, clienteId, productos, estado, fecha, fechaEntrega }) {
        this.id = id;
        this.clienteId = clienteId;
        this.productos = productos; // Array de objetos {productoId, cantidad}
        this.estado = estado; // 'pendiente', 'en preparación', 'listo para recoger'
        this.fecha = fecha;
        this.fechaEntrega = fechaEntrega;
    }
}

module.exports = Pedido;
