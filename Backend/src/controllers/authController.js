const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioService = require('../services/usuarioService');
const Usuario = require('../models/usuarioModel');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = usuarioService.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        // const isMatch = (password === user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, email: user.email, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Server error, please try again later' });
    }
};

exports.register = async (req, res) => {
    const { email, password, telefono } = req.body;

    // Validaciones
    if (!email || !password || !telefono) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios: email, password, telefono' });
    }

    try {
        if (usuarioService.findUserByEmail(email)) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // const hashedPassword = await bcrypt.hash(password, 10);
        const lastUserId = usuarioService.getLastUserId();
        const newUser = new Usuario({ id: lastUserId + 1, email, password, telefono, role: 'CLIENTE' });
        usuarioService.addUser(newUser);

        const { password: userPassword, ...userWithoutPassword } = newUser;
        res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor, por favor intente nuevamente más tarde' });
    }
};
