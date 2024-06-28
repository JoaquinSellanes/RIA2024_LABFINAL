const express = require('express');
const { verifyToken, isAdmin, isPanadero } = require('../middlewares/authMiddleware');
const ingredienteController = require('../controllers/ingredienteController');

const router = express.Router();

router.post('/',                verifyToken, isAdmin, ingredienteController.crearIngrediente);
router.get('/:id',              verifyToken,          ingredienteController.obtenerIngredientePorId);
router.put('/:id',              verifyToken, isAdmin, ingredienteController.actualizarIngrediente);
router.delete('/:id',           verifyToken, isAdmin, ingredienteController.eliminarIngrediente);
router.get('/',                 verifyToken,          ingredienteController.obtenerTodosLosIngredientes);
router.put('/:id/activar',      verifyToken, isAdmin, ingredienteController.activarIngrediente);
router.put('/:id/desactivar',   verifyToken, isAdmin, ingredienteController.desactivarIngrediente);


module.exports = {
    route: '/ingredientes',
    router,
};