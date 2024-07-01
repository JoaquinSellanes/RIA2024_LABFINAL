const express = require('express');
const { crearProducto, obtenerProductoPorId, actualizarProducto, eliminarProducto, activarProducto, desactivarProducto, obtenerProductosDisponibles, obtenerTodosLosProductos } = require('../controllers/productoController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/',                verifyToken, isAdmin,   crearProducto);
router.get('/',                 verifyToken,            obtenerTodosLosProductos);
router.get('/disponibles',      verifyToken,            obtenerProductosDisponibles);
router.get('/:id',              verifyToken,            obtenerProductoPorId);
router.put('/:id',              verifyToken, isAdmin,   actualizarProducto);
router.delete('/:id',           verifyToken, isAdmin,   eliminarProducto);
router.put('/:id/activar',      verifyToken, isAdmin,   activarProducto);
router.put('/:id/desactivar',   verifyToken, isAdmin,   desactivarProducto);

module.exports = {
    route: '/productos',
    router
};
