const express = require('express');
const { verifyToken, isAdmin, isPanadero } = require('../middlewares/authMiddleware');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/',                        verifyToken, pedidoController.crearPedido);
router.get('/mis-pedidos',              verifyToken, pedidoController.obtenerPedidosDelCliente);
router.get('/:id',                      verifyToken, isPanadero, pedidoController.obtenerPedidoPorId);
router.post('/all',                     verifyToken, isPanadero, pedidoController.obtenerTodosLosPedidos);
router.post('/ingredientes',            verifyToken, isPanadero, pedidoController.calcularIngredientesTotales);
router.post('/cambiar-estado',          verifyToken, isPanadero, pedidoController.cambiarEstadoPedido);
router.post('/:id/en-preparacion',      verifyToken, isPanadero, pedidoController.pasarAEnPreparacion);
router.post('/:id/listo-para-recoger',  verifyToken, isPanadero, pedidoController.pasarAListoParaRecoger);

module.exports = {
    route: '/pedidos',
    router
};