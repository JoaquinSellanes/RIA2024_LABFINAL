class Pedido {
    constructor({ id, clienteId, productos, estado, fecha }) {
        this.id = id;
        this.clienteId = clienteId;
        this.productos = productos; // Array de objetos {productoId, cantidad}
        this.estado = estado; // 'pendiente', 'en preparación', 'listo para recoger'
        this.fecha = fecha;
    }
}

module.exports = Pedido;
