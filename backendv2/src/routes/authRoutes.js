const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);  // Añadir la ruta de registro
router.post('/login', login);

module.exports = {
    route: '/auth',
    router
};
