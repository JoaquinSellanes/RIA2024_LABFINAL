const express = require('express');
const { verifyToken, isAdmin, isPanadero } = require('../middlewares/authMiddleware');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/',                 verifyToken, isAdmin, usuarioController.listarUsuarios);
router.post('/modificar-rol',   verifyToken, isAdmin, usuarioController.modificarRolUsuario);
router.get('/mi-cuenta',        verifyToken, usuarioController.obtenerMiCuenta);
router.put('/baja/:id',         verifyToken, isAdmin, usuarioController.darDeBajaUsuario);


module.exports = {
    route: '/usuarios',
    router
};
