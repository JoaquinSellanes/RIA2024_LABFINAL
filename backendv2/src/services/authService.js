const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { usuarios } = require('../data/mockData');
const Usuario = require('../models/usuarioModel');

const login = async (username, password) => {
    const user = usuarios.find(u => u.username === username);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, role: user.role };
};

const register = async (username, password, role) => {
    if (!usuarios) throw new Error('User data is not available');
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Usuario({ id: usuarios.length + 1, username, password: hashedPassword, role });
    usuarios.push(newUser);
    return newUser;
};

module.exports = {
    login,
    register,
};
