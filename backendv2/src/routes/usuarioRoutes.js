const express = require('express');
const { verifyToken, isAdmin, isPanadero } = require('../middlewares/authMiddleware');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/',                 verifyToken, isAdmin, usuarioController.listarUsuarios);
router.post('/modificar-rol',   verifyToken, isAdmin, usuarioController.modificarRolUsuario);

module.exports = {
    route: '/usuarios',
    router
};
