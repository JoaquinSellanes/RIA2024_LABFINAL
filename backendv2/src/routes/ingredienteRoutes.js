const express = require('express');
const {
    crearIngrediente,
    obtenerIngredientePorId,
    actualizarIngrediente,
    eliminarIngrediente,
    obtenerTodosLosIngredientes,
} = require('../controllers/ingredienteController');

const router = express.Router();

router.post('/', crearIngrediente);
router.get('/:id', obtenerIngredientePorId);
router.put('/:id', actualizarIngrediente);
router.delete('/:id', eliminarIngrediente);
router.get('/', obtenerTodosLosIngredientes);

module.exports = {
    route: '/ingredientes',
    router,
};