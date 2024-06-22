const deepClone = require('../utils/deepClone');
const { pedidos, productos, usuarios } = require('../data/mockData');

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
    if (pedido) {
        pedido.productos = pedido.productos.map(item => {
            const producto = productos.find(p => p.id == item.productoId);
            if (producto) {
                const { isDeleted, ...productoSinIsDeleted } = producto;
                return { cantidad: item.cantidad, producto: productoSinIsDeleted };
            }
            return null;
        }).filter(item => item !== null); // Filtrar los productos no encontrados
        const cliente = usuarios.find(usuario => usuario.id == pedido.clienteId);
        if (cliente) {
            const { password, ...clienteSinPassword } = cliente;
            pedido.cliente = clienteSinPassword;
        }
        delete pedido.clienteId; // Eliminar clienteId
        return deepClone(pedido);
    }
    return null;
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
    return pedidos.map(pedido => {
        const pedidoClonado = deepClone(pedido);
        pedidoClonado.productos = pedidoClonado.productos.map(item => {
            const producto = productos.find(p => p.id == item.productoId);
            if (producto) {
                const { isDeleted, ...productoSinIsDeleted } = producto;
                return { cantidad: item.cantidad, producto: productoSinIsDeleted };
            }
            return null;
        }).filter(item => item !== null); // Filtrar los productos no encontrados
        const cliente = usuarios.find(usuario => usuario.id == pedidoClonado.clienteId);
        if (cliente) {
            const { password, ...clienteSinPassword } = cliente;
            pedidoClonado.cliente = clienteSinPassword;
        }
        delete pedidoClonado.clienteId; // Eliminar clienteId
        return pedidoClonado;
    });
};

exports.productoEnPedidoPendiente = (productoId) => {
    return pedidos.some(pedido => 
        pedido.estado === 'pendiente' && 
        pedido.productos.some(item => item.productoId == productoId)
    );
};
