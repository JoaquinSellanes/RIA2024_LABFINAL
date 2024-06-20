const pedidoService = require('../services/pedidoService');
const productoService = require('../services/productoService');
const usuarioService = require('../services/usuarioService');
const deepClone = require('../utils/deepClone');

exports.obtenerTodosLosPedidos = (req, res) => {
    const { fechaInicio, fechaFin, estado } = req.body;
      
    try {
        let pedidos = pedidoService.obtenerTodosLosPedidos();
        pedidos = deepClone(pedidos);  // Clonar profundamente los pedidos para evitar modificaciones accidentales

        if (fechaInicio) {
            const startDate = new Date(fechaInicio);
            pedidos = pedidos.filter(pedido => new Date(pedido.fecha) >= startDate);
        }

        if (fechaFin) {
            const endDate = new Date(fechaFin);
            pedidos = pedidos.filter(pedido => new Date(pedido.fecha) <= endDate);
        }

        if (estado) {
            pedidos = pedidos.filter(pedido => pedido.estado === estado);
        }
        
        // Reemplazar productoId con la información completa del producto y limpiar datos
        pedidos = pedidos.map(pedido => {
            pedido.productos = pedido.productos.map(item => {
                const producto = productoService.obtenerProductoPorId(item.productoId);
                if (producto) {
                    const { isDeleted, ...productoSinIsDeleted } = producto;
                    return {
                        cantidad: item.cantidad,
                        producto: productoSinIsDeleted
                    };
                } else {
                    // Manejar el caso en el que el producto no se encuentra
                    return {
                        cantidad: item.cantidad,
                        producto: null
                    };
                }
            }).filter(item => item.producto !== null); // Filtrar los productos no encontrados

            const cliente = usuarioService.obtenerUsuarioPorId(pedido.clienteId);
            if (cliente) {
                const { password, role, ...clienteSinPasswordYRole } = cliente;
                pedido.cliente = clienteSinPasswordYRole;
            }
            delete pedido.clienteId;
            return pedido;
        });

        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// exports.crearPedido = (req, res) => {
//     const { clienteId, productos } = req.body;

//     // Validaciones
//     if (!clienteId || !productos || !Array.isArray(productos) || productos.length === 0) {
//         return res.status(400).json({ error: 'Debe proporcionar clienteId y una lista de productos' });
//     }

//     try {
//         const nuevoPedido = pedidoService.crearPedido({ clienteId, productos });
//         res.status(201).json(nuevoPedido);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.obtenerPedidoPorId = (req, res) => {
//     const { id } = req.params;

//     try {
//         const pedido = pedidoService.obtenerPedidoPorId(id);
//         if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });

//         // Procesar datos
//         pedido.productos = pedido.productos.map(item => {
//             const producto = productos.find(p => p.id == item.productoId);
//             if (producto) {
//                 const { isDeleted, ...productoSinIsDeleted } = producto;
//                 return { cantidad: item.cantidad, producto: productoSinIsDeleted };
//             }
//             return null;
//         }).filter(item => item !== null); // Filtrar los productos no encontrados

//         const cliente = usuarioService.obtenerUsuarioPorId(pedido.clienteId);
//         if (cliente) {
//             const { password, ...clienteSinPassword } = cliente;
//             pedido.cliente = clienteSinPassword;
//         }
//         delete pedido.clienteId; // Eliminar clienteId

//         res.status(200).json(pedido);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.actualizarPedido = (req, res) => {
//     const { id } = req.params;
//     const datosPedido = req.body;

//     try {
//         const pedidoActualizado = pedidoService.actualizarPedido(id, datosPedido);
//         if (!pedidoActualizado) return res.status(404).json({ error: 'Pedido no encontrado' });
//         res.status(200).json(pedidoActualizado);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.eliminarPedido = (req, res) => {
//     const { id } = req.params;

//     try {
//         const pedidoEliminado = pedidoService.eliminarPedido(id);
//         if (!pedidoEliminado) return res.status(404).json({ error: 'Pedido no encontrado' });
//         res.status(200).json(pedidoEliminado);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.obtenerTodosLosPedidos = (req, res) => {
//     const { fechaInicio, fechaFin, estado } = req.body;

//     const filtros = {
//         fechaInicio: fechaInicio ? new Date(fechaInicio) : null,
//         fechaFin: fechaFin ? new Date(fechaFin) : null,
//         estado: estado || null,
//     };

//     try {
//         let pedidos = pedidoService.obtenerTodosLosPedidos();

//         // Aplicar filtros
//         if (filtros.fechaInicio || filtros.fechaFin) {
//             pedidos = pedidos.filter(pedido => {
//                 const fechaPedido = new Date(pedido.fecha);
//                 return (!isNaN(filtros.fechaInicio) ? fechaPedido >= filtros.fechaInicio : true) &&
//                     (!isNaN(filtros.fechaFin) ? fechaPedido <= filtros.fechaFin : true);
//             });
//         }

//         if (filtros.estado) {
//             pedidos = pedidos.filter(pedido => pedido.estado === filtros.estado);
//         }

//         // Procesar datos
//         pedidos = pedidos.map(pedido => {
//             pedido.productos = pedido.productos.map(item => {
//                 const producto = productos.find(p => p.id == item.productoId);
//                 if (producto) {
//                     const { isDeleted, ...productoSinIsDeleted } = producto;
//                     return { cantidad: item.cantidad, producto: productoSinIsDeleted };
//                 }
//                 return null;
//             }).filter(item => item !== null); // Filtrar los productos no encontrados

//             const cliente = usuarioService.obtenerUsuarioPorId(pedido.clienteId);
//             if (cliente) {
//                 const { password, ...clienteSinPassword } = cliente;
//                 pedido.cliente = clienteSinPassword;
//             }
//             delete pedido.clienteId; // Eliminar clienteId

//             return pedido;
//         });

//         // Imprimir el objeto 'pedidos' de manera legible
//         console.log(JSON.stringify(pedidos, null, 2));
//         res.status(200).json(pedidos);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.calcularIngredientesParaPedido = (req, res) => {
//     const { id } = req.params;

//     try {
//         const pedido = pedidoService.obtenerPedidoPorId(id);
//         if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });

//         const ingredientesTotales = {};

//         pedido.productos.forEach(item => {
//             const { cantidad, producto } = item;
//             producto.ingredientes.forEach(ingrediente => {
//                 const key = `${ingrediente.nombre}-${ingrediente.unidad}`;
//                 if (!ingredientesTotales[key]) {
//                     ingredientesTotales[key] = { nombre: ingrediente.nombre, cantidad: 0, unidad: ingrediente.unidad };
//                 }
//                 ingredientesTotales[key].cantidad += ingrediente.cantidad * cantidad;
//             });
//         });

//         res.status(200).json(Object.values(ingredientesTotales));
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
