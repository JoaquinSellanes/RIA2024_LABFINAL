const express = require('express');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');   
const { crearProducto, obtenerProductoPorId, actualizarProducto, eliminarProducto, activarProducto, desactivarProducto, obtenerProductosDisponibles, obtenerTodosLosProductos } = require('../controllers/productoController');

const router = express.Router();

router.get('/', obtenerTodosLosProductos);
router.get('/disponibles', obtenerProductosDisponibles);
router.post('/', [verifyToken, isAdmin], crearProducto);
router.get('/:id', obtenerProductoPorId);
router.put('/:id', [verifyToken, isAdmin], actualizarProducto);
router.delete('/:id', [verifyToken, isAdmin], eliminarProducto);
router.put('/:id/activar', [verifyToken, isAdmin],  activarProducto);
router.put('/:id/desactivar', [verifyToken, isAdmin],  desactivarProducto);

module.exports = {
    route: '/productos',
    router
};
