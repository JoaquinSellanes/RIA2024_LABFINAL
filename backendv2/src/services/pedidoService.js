const { pedidos } = require('../data/mockData');
const Pedido = require('../models/pedidoModel');

const crearPedido = (clienteId, productosPedido, fecha) => {
    const nuevoPedido = new Pedido({ id: pedidos.length + 1, clienteId, productos: productosPedido, estado: 'pendiente', fecha });
    pedidos.push(nuevoPedido);
    return nuevoPedido;
};

const obtenerPedidosPorCliente = (clienteId) => {
    return pedidos.filter(pedido => pedido.clienteId === clienteId);
};

const obtenerTodosLosPedidos = () => {
    return pedidos;
};

const actualizarEstadoPedido = (id, estado) => {
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) throw new Error('Pedido no encontrado');

    pedido.estado = estado;
    return pedido;
};

module.exports = {
    crearPedido,
    obtenerPedidosPorCliente,
    obtenerTodosLosPedidos,
    actualizarEstadoPedido,
};
