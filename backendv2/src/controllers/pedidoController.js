const pedidoService = require('../services/pedidoService');
const productoService = require('../services/productoService');
const ingredienteService = require('../services/ingredienteService');
const usuarioService = require('../services/usuarioService');
const deepClone = require('../utils/deepClone');

exports.crearPedido = (req, res) => {
    const { clienteId, productos } = req.body;

    // Validaciones
    if (!clienteId || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar un ID de cliente y una lista de productos' });
    }

    // Validar cada producto
    for (const item of productos) {
        if (!item.productoId || !item.cantidad) {
            return res.status(400).json({ error: 'Cada producto debe tener un ID de producto y una cantidad' });
        }

        const producto = productoService.obtenerProductoPorId(item.productoId);
        if (!producto) {
            return res.status(400).json({ error: `El producto con ID ${item.productoId} no existe o está inactivo` });
        }
    }

    try {
        // Verificar que el cliente exista
        const cliente = usuarioService.obtenerUsuarioPorId(clienteId);
        if (!cliente) {
            return res.status(400).json({ error: 'El cliente no existe' });
        }

        // Crear el nuevo pedido
        const nuevoPedido = {
            id: Date.now(), // Generar un ID único basado en la marca de tiempo
            clienteId,
            productos,
            estado: 'pendiente',
            fecha: new Date().toISOString(),
        };

        const pedidoCreado = pedidoService.agregarPedido(nuevoPedido);
        res.status(201).json(pedidoCreado);
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
            const producto = productoService.obtenerProductoPorId(item.productoId);
            return {
                cantidad: item.cantidad,
                producto
            };
        });

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
                            const key = `${ingrediente.nombre}-${ingrediente.unidad}`;
                            if (!ingredientesTotales[key]) {
                                ingredientesTotales[key] = {
                                    nombre: ingrediente.nombre,
                                    cantidad: 0,
                                    unidad: ingrediente.unidad
                                };
                            }
                            ingredientesTotales[key].cantidad += ingrediente.cantidad * item.cantidad;
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
