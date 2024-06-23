const deepClone = require('../utils/deepClone');
const { pedidos } = require('../data/mockData');

exports.agregarPedido = (pedido) => {
    pedidos.push(pedido);
    return deepClone(pedido);
};

exports.obtenerUltimoPedidoId = () => {
    if (pedidos.length === 0) return 0;
    return Math.max(...pedidos.map(p => p.id));
};

exports.obtenerPedidoPorId = (id) => {
    const pedido = pedidos.find(p => p.id == id);
    return pedido ? deepClone(pedido) : null;
};

exports.actualizarPedido = (id, datosPedido) => {
    const index = pedidos.findIndex(pedido => pedido.id == id);
    if (index !== -1) {
        pedidos[index] = { ...pedidos[index], ...datosPedido };
        return deepClone(pedidos[index]);
    }
    return null;
};

exports.eliminarPedido = (id) => {
    const index = pedidos.findIndex(pedido => pedido.id == id);
    if (index !== -1) {
        const [pedidoEliminado] = pedidos.splice(index, 1);
        return deepClone(pedidoEliminado);
    }
    return null;
};

exports.obtenerTodosLosPedidos = () => {
    return deepClone(pedidos);
};

exports.productoEnPedidoPendiente = (productoId) => {
    return pedidos.some(pedido =>
        pedido.estado === 'pendiente' &&
        pedido.productos.some(item => item.productoId == productoId)
    );
};
