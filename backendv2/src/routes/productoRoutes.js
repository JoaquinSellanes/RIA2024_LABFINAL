const express = require('express');
const { crearProducto, obtenerProductoPorId, actualizarProducto, eliminarProducto, activarProducto, desactivarProducto, obtenerProductosDisponibles, obtenerTodosLosProductos } = require('../controllers/productoController');

const router = express.Router();

router.post('/', crearProducto);
router.get('/disponibles', obtenerProductosDisponibles); // Coloca esta ruta antes de `/:id`
router.get('/:id', obtenerProductoPorId);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);
router.put('/:id/activar', activarProducto);
router.put('/:id/desactivar', desactivarProducto);
router.get('/', obtenerTodosLosProductos);

module.exports = {
    route: '/productos',
    router
};
