const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.listarUsuarios);
router.post('/modificar-rol', usuarioController.modificarRolUsuario);

module.exports = {
    route: '/usuarios',
    router
};
