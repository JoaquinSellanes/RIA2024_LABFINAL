const express = require('express');
const { verifyToken, isPanadero, hasRole } = require('../middlewares/authMiddleware');
const { crearPedido, obtenerPedidosPorCliente, obtenerTodosLosPedidos, actualizarEstadoPedido } = require('../controllers/pedidoController');

const router = express.Router();

// Ruta accesible solo por clientes autenticados
router.post('/', verifyToken, hasRole(['CLIENTE']), crearPedido);

// Ruta accesible solo por clientes autenticados para ver sus pedidos
router.get('/cliente/:clienteId', verifyToken, hasRole(['CLIENTE']), obtenerPedidosPorCliente);

// Ruta accesible solo por panaderos para ver todos los pedidos
router.get('/', verifyToken, isPanadero, obtenerTodosLosPedidos);

// Ruta accesible solo por panaderos para actualizar el estado de los pedidos
router.put('/:id/estado', verifyToken, isPanadero, actualizarEstadoPedido);

module.exports = {
    route: '/pedidos',
    router
};