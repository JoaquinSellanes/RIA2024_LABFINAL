const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioService = require('../services/usuarioService');
const Usuario = require('../models/usuarioModel');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = usuarioService.findUserByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        // Lo arreglamo luego
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = password == user.password;
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, email, role: user.role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (usuarioService.findUserByEmail(email)) {
            throw new Error('User already exists');
        }

        // Lo arreglamos luego
        // const hashedPassword = await bcrypt.hash(password, 10);
        const lastUserId = usuarioService.getLastUserId();
        const newUser = new Usuario({ id: lastUserId + 1, email, password: password, role: 'USUARIO' });
        usuarioService.addUser(newUser);
        res.status(201).json({ user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
