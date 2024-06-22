const express = require('express');
const { verifyToken, isAdmin, isPanadero } = require('../middlewares/authMiddleware');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/',                verifyToken, pedidoController.crearPedido);
router.get('/:id',              verifyToken, isPanadero, pedidoController.obtenerPedidoPorId);
router.post('/all',             verifyToken, isPanadero, pedidoController.obtenerTodosLosPedidos);
router.post('/ingredientes',    verifyToken, isPanadero, pedidoController.calcularIngredientesTotales);  // Nueva ruta para calcular ingredientes totales
// router.post('/', pedidoController.crearPedido);
// router.get('/:id', pedidoController.obtenerPedidoPorId);
// router.put('/:id', pedidoController.actualizarPedido);
// router.delete('/:id', pedidoController.eliminarPedido);
// router.get('/:id/ingredientes', pedidoController.calcularIngredientesParaPedido);

module.exports = {
    route: '/pedidos',
    router
};