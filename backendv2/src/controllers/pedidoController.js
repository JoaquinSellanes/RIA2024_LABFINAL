const pedidoService = require('../services/pedidoService');
const productoService = require('../services/productoService');
const ingredienteService = require('../services/ingredienteService');
const usuarioService = require('../services/usuarioService');
const deepClone = require('../utils/deepClone');

exports.obtenerPedidosDelCliente = (req, res) => {
    const clienteId = req.userId; // Obtener el ID del usuario desde el token

    try {
        let pedidos = pedidoService.obtenerPedidosPorClienteId(clienteId);
        
        // Mapear productos y sus ingredientes a los nombres en lugar de IDs
        pedidos = pedidos.map(pedido => {
            pedido.productos = pedido.productos.map(item => {
                const producto = productoService.obtenerProductoPorId(item.productoId);
                if (producto) {
                    // Mapear IDs de ingredientes a sus nombres
                    const ingredientesConNombres = producto.ingredientes.map(ingrediente => {
                        const ingredienteInfo = ingredienteService.obtenerIngredientePorId(ingrediente.id);
                        return {
                            nombre: ingredienteInfo.nombre,
                            cantidad: ingrediente.cantidad
                        };
                    });

                    const { isDeleted, ...productoSinIsDeleted } = producto;
                    const productoConNombresDeIngredientes = {
                        ...productoSinIsDeleted,
                        ingredientes: ingredientesConNombres
                    };

                    return {
                        cantidad: item.cantidad,
                        producto: productoConNombresDeIngredientes
                    };
                } else {
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

exports.crearPedido = (req, res) => {
    const { productos, fechaEntrega } = req.body;  // Incluir fechaEntrega en la destructuración
    const clienteId = req.userId; // Obtener el ID del usuario desde el token

    // Validaciones
    if (!clienteId || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar una lista de productos' });
    }

    // Validar cada producto
    for (const item of productos) {
        if (!item.productoId || !item.cantidad) {
            return res.status(400).json({ error: 'Cada producto debe tener un ID de producto y una cantidad' });
        }

        const producto = productoService.obtenerProductoPorId(item.productoId);
        if (!producto || !producto.isActive) {
            return res.status(400).json({ error: `El producto con ID ${item.productoId} no existe o está inactivo` });
        }
    }

    // Validar fecha de entrega
    if (!fechaEntrega) {
        return res.status(400).json({ error: 'Debe proporcionar una fecha de entrega' });
    }

    try {
        // Verificar que el cliente exista
        const cliente = usuarioService.obtenerUsuarioPorId(clienteId);
        if (!cliente) {
            return res.status(400).json({ error: 'El cliente no existe' });
        }

        // Obtener el último ID de pedido y generar uno nuevo
        const ultimoPedidoId = pedidoService.obtenerUltimoPedidoId();
        const nuevoPedidoId = ultimoPedidoId + 1;

        // Crear el nuevo pedido
        const nuevoPedido = {
            id: nuevoPedidoId,
            clienteId,
            productos,
            estado: 'pendiente',
            fecha: new Date().toISOString(),
            fechaEntrega  // Incluir fechaEntrega
        };

        const pedidoCreado = pedidoService.agregarPedido(nuevoPedido);

        // Mapear productos y sus ingredientes a los nombres en lugar de IDs
        pedidoCreado.productos = pedidoCreado.productos.map(item => {
            const producto = productoService.obtenerProductoPorId(item.productoId);
            if (producto) {
                // Mapear IDs de ingredientes a sus nombres
                const ingredientesConNombres = producto.ingredientes.map(ingrediente => {
                    const ingredienteInfo = ingredienteService.obtenerIngredientePorId(ingrediente.id);
                    return {
                        nombre: ingredienteInfo.nombre,
                        cantidad: ingrediente.cantidad
                    };
                });

                const { isDeleted, ...productoSinIsDeleted } = producto;
                const productoConNombresDeIngredientes = {
                    ...productoSinIsDeleted,
                    ingredientes: ingredientesConNombres
                };

                return {
                    cantidad: item.cantidad,
                    producto: productoConNombresDeIngredientes
                };
            } else {
                return {
                    cantidad: item.cantidad,
                    producto: null
                };
            }
        }).filter(item => item.producto !== null); // Filtrar los productos no encontrados

        // Obtener detalles completos del cliente
        const { password, role, ...clienteSinPasswordYRole } = cliente;

        res.status(201).json({
            ...pedidoCreado,
            cliente: clienteSinPasswordYRole
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerPedidoPorId = (req, res) => {
    const { id } = req.params;

    try {
        const pedido = pedidoService.obtenerPedidoPorId(id);
        if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });

        // Obtener detalles completos de los productos
        pedido.productos = pedido.productos.map(item => {
            const productoConDeleted = productoService.obtenerProductoPorId(item.productoId);
            
            if (productoConDeleted) {
                const { isDeleted, ...producto } = productoConDeleted;

                // Mapear IDs de ingredientes a sus nombres
                const ingredientesConNombres = producto.ingredientes.map(ingrediente => {
                    const ingredienteInfo = ingredienteService.obtenerIngredientePorId(ingrediente.id);
                    return {
                        nombre: ingredienteInfo.nombre,
                        cantidad: ingrediente.cantidad
                    };
                });

                const productoConNombresDeIngredientes = {
                    ...producto,
                    ingredientes: ingredientesConNombres
                };

                return {
                    cantidad: item.cantidad,
                    producto: productoConNombresDeIngredientes
                };
            } else {
                return {
                    cantidad: item.cantidad,
                    producto: null
                };
            }
        }).filter(item => item.producto !== null); // Filtrar los productos no encontrados

        // Obtener detalles completos del cliente
        const cliente = usuarioService.obtenerUsuarioPorId(pedido.clienteId);
        if (cliente) {
            const { password, role, ...clienteSinPasswordYRole } = cliente;
            pedido.cliente = clienteSinPasswordYRole;
        }

        delete pedido.clienteId;
        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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

                    // Calcular ingredientes necesarios
                    const ingredientesNecesarios = producto.ingredientes.map(ingrediente => {
                        const ingredienteInfo = ingredienteService.obtenerIngredientePorId(ingrediente.id);
                        return {
                            nombre: ingredienteInfo.nombre,
                            cantidad: ingrediente.cantidad * item.cantidad
                        };
                    });

                    // Mapear IDs de ingredientes a sus nombres
                    const ingredientesConNombres = producto.ingredientes.map(ingrediente => {
                        const ingredienteInfo = ingredienteService.obtenerIngredientePorId(ingrediente.id);
                        return {
                            nombre: ingredienteInfo.nombre,
                            cantidad: ingrediente.cantidad
                        };
                    });

                    return {
                        cantidad: item.cantidad,
                        producto: {
                            ...productoSinIsDeleted,
                            ingredientes: ingredientesConNombres
                        },
                        ingredientesNecesarios
                    };
                } else {
                    // Manejar el caso en el que el producto no se encuentra
                    return {
                        cantidad: item.cantidad,
                        producto: null,
                        ingredientesNecesarios: []
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

exports.calcularIngredientesTotales = (req, res) => {
    const { pedidoIds } = req.body;

    if (!Array.isArray(pedidoIds) || pedidoIds.length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar una lista de IDs de pedidos' });
    }

    try {
        let ingredientesTotales = {};

        pedidoIds.forEach(id => {
            const pedido = pedidoService.obtenerPedidoPorId(id);
            if (pedido) {
                pedido.productos.forEach(item => {
                    const producto = productoService.obtenerProductoPorId(item.productoId);
                    if (producto) {
                        producto.ingredientes.forEach(ingrediente => {
                            const ingredienteInfo = ingredienteService.obtenerIngredientePorId(ingrediente.id);
                            const nombreIngrediente = ingredienteInfo.nombre;
                            if (!ingredientesTotales[nombreIngrediente]) {
                                ingredientesTotales[nombreIngrediente] = {
                                    nombre: nombreIngrediente,
                                    cantidad: 0
                                };
                            }
                            ingredientesTotales[nombreIngrediente].cantidad += ingrediente.cantidad * item.cantidad;
                        });
                    }
                });
            }
        });

        // Convertir a un array de ingredientes
        const ingredientesArray = Object.values(ingredientesTotales);

        res.status(200).json(ingredientesArray);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.cambiarEstadoPedido = (req, res) => {
    // VALIDAR FECHA
    const { id, estado } = req.body;

    const estadosValidos = ['pendiente', 'en preparación', 'listo para recoger'];

    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({ error: 'Estado inválido. Debe ser uno de: pendiente, en preparación, listo para recoger' });
    }

    try {
        const pedido = pedidoService.obtenerPedidoPorId(id);
        console.log(pedido);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        pedido.estado = estado;
        const pedidoActualizado = pedidoService.actualizarPedido(id, pedido);

        res.status(200).json(pedidoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.pasarAEnPreparacion = (req, res) => {
    const { id } = req.params;

    try {
        const pedido = pedidoService.obtenerPedidoPorId(id);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        pedido.estado = 'en preparación';
        const pedidoActualizado = pedidoService.actualizarPedido(id, pedido);

        res.status(200).json(pedidoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.pasarAListoParaRecoger = (req, res) => {
    const { id } = req.params;

    try {
        const pedido = pedidoService.obtenerPedidoPorId(id);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        pedido.estado = 'listo para recoger';
        const pedidoActualizado = pedidoService.actualizarPedido(id, pedido);

        res.status(200).json(pedidoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};