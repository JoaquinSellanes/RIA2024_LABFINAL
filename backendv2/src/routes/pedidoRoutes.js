const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/', pedidoController.crearPedido);
router.get('/:id', pedidoController.obtenerPedidoPorId);
router.get('/all', pedidoController.obtenerTodosLosPedidos);
router.get('/ingredientes', pedidoController.calcularIngredientesTotales);  // Nueva ruta para calcular ingredientes totales
// router.post('/', pedidoController.crearPedido);
// router.get('/:id', pedidoController.obtenerPedidoPorId);
// router.put('/:id', pedidoController.actualizarPedido);
// router.delete('/:id', pedidoController.eliminarPedido);
// router.get('/:id/ingredientes', pedidoController.calcularIngredientesParaPedido);

module.exports = {
    route: '/pedidos',
    router
};