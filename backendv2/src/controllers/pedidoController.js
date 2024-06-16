const pedidoService = require('../services/pedidoService');

exports.crearPedido = (req, res) => {
    const { clienteId, productosPedido, fecha } = req.body;

    try {
        const nuevoPedido = pedidoService.crearPedido(clienteId, productosPedido, fecha);
        res.status(201).json(nuevoPedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerPedidosPorCliente = (req, res) => {
    const { clienteId } = req.params;

    try {
        const pedidos = pedidoService.obtenerPedidosPorCliente(parseInt(clienteId));
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerTodosLosPedidos = (req, res) => {
    const pedidos = pedidoService.obtenerTodosLosPedidos();
    res.status(200).json(pedidos);
};

exports.actualizarEstadoPedido = (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        const pedidoActualizado = pedidoService.actualizarEstadoPedido(parseInt(id), estado);
        res.status(200).json(pedidoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
