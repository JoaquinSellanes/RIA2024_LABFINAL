const { pedidos } = require('../data/mockData');

exports.crearPedido = ({ clienteId, productos }) => {
    const nuevoPedido = {
        id: pedidos.length + 1,
        clienteId,
        productos,
        estado: 'pendiente',
        fecha: new Date(),
    };
    pedidos.push(nuevoPedido);
    return nuevoPedido;
};

exports.obtenerPedidoPorId = (id) => {
    return pedidos.find(pedido => pedido.id == id);
};

exports.actualizarPedido = (id, datosPedido) => {
    const index = pedidos.findIndex(pedido => pedido.id == id);
    if (index !== -1) {
        pedidos[index] = { ...pedidos[index], ...datosPedido };
        return pedidos[index];
    }
    return null;
};

exports.eliminarPedido = (id) => {
    const index = pedidos.findIndex(pedido => pedido.id == id);
    if (index !== -1) {
        const [pedidoEliminado] = pedidos.splice(index, 1);
        return pedidoEliminado;
    }
    return null;
};

exports.obtenerTodosLosPedidos = () => {
    return pedidos;
};

exports.productoEnPedidoPendiente = (productoId) => {
    return pedidos.some(pedido =>
        pedido.estado === 'pendiente' &&
        pedido.productos.some(item => item.productoId == productoId)
    );
};


// exports.crearPedido = ({ clienteId, productos }) => {
//     const nuevoPedido = new Pedido({
//         id: pedidos.length + 1,
//         clienteId,
//         productos,
//         estado: 'pendiente',
//         fecha: new Date(),
//     });
//     pedidos.push(nuevoPedido);
//     return nuevoPedido;
// };

// exports.obtenerPedidoPorId = (id) => {
//     const pedido = pedidos.find(pedido => pedido.id == id);
//     if (pedido) {
//         pedido.productos = pedido.productos.map(item => {
//             const producto = productos.find(p => p.id == item.productoId);
//             if (producto) {
//                 const { isDeleted, ...productoSinIsDeleted } = producto;
//                 return { cantidad: item.cantidad, producto: productoSinIsDeleted };
//             }
//             return null;
//         }).filter(item => item !== null); // Filtrar los productos no encontrados
//         const cliente = usuarios.find(usuario => usuario.id == pedido.clienteId);
//         if (cliente) {
//             const { password, ...clienteSinPassword } = cliente;
//             pedido.cliente = clienteSinPassword;
//         }
//         delete pedido.clienteId; // Eliminar clienteId
//     }
//     return pedido;
// };

// exports.actualizarPedido = (id, datosPedido) => {
//     const index = pedidos.findIndex(pedido => pedido.id == id);
//     if (index !== -1) {
//         pedidos[index] = { ...pedidos[index], ...datosPedido };
//         return pedidos[index];
//     }
//     return null;
// };

// exports.eliminarPedido = (id) => {
//     const index = pedidos.findIndex(pedido => pedido.id == id);
//     if (index !== -1) {
//         const [pedidoEliminado] = pedidos.splice(index, 1);
//         return pedidoEliminado;
//     }
//     return null;
// };

// exports.obtenerTodosLosPedidos = (filtros = {}) => {
//     let resultado = pedidos;

//     if (filtros.fechaInicio || filtros.fechaFin) {
//         const fechaInicio = new Date(filtros.fechaInicio);
//         const fechaFin = new Date(filtros.fechaFin);
//         resultado = resultado.filter(pedido => {
//             const fechaPedido = new Date(pedido.fecha);
//             return (!isNaN(fechaInicio) ? fechaPedido >= fechaInicio : true) &&
//                    (!isNaN(fechaFin) ? fechaPedido <= fechaFin : true);
//         });
//     }

//     if (filtros.estado) {
//         resultado = resultado.filter(pedido => pedido.estado === filtros.estado);
//     }

//     resultado = resultado.map(pedido => {
//         pedido.productos = pedido.productos.map(item => {
//             const producto = productos.find(p => p.id == item.productoId);
//             if (producto) {
//                 const { isDeleted, ...productoSinIsDeleted } = producto;
//                 return { cantidad: item.cantidad, producto: productoSinIsDeleted };
//             }
//             return null;
//         }).filter(item => item !== null); // Filtrar los productos no encontrados
//         const cliente = usuarios.find(usuario => usuario.id == pedido.clienteId);
//         if (cliente) {
//             const { password, ...clienteSinPassword } = cliente;
//             pedido.cliente = clienteSinPassword;
//         }
//         delete pedido.clienteId; // Eliminar clienteId
//         return pedido;
//     });

//     return resultado;
// };

// exports.calcularIngredientesParaPedido = (pedidoId) => {
//     const pedido = this.obtenerPedidoPorId(pedidoId);
//     if (!pedido) {
//         throw new Error('Pedido no encontrado');
//     }

//     const ingredientesTotales = {};

//     pedido.productos.forEach(item => {
//         const { cantidad, producto } = item;
//         producto.ingredientes.forEach(ingrediente => {
//             const key = `${ingrediente.nombre}-${ingrediente.unidad}`;
//             if (!ingredientesTotales[key]) {
//                 ingredientesTotales[key] = { nombre: ingrediente.nombre, cantidad: 0, unidad: ingrediente.unidad };
//             }
//             ingredientesTotales[key].cantidad += ingrediente.cantidad * cantidad;
//         });
//     });

//     return Object.values(ingredientesTotales);
// };
