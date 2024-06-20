const { usuarios } = require('../data/mockData');
const Usuario = require('../models/usuarioModel');

const findUserByEmail = (email) => {
    return usuarios.find(u => u.email === email);
};

const addUser = (user) => {
    usuarios.push(user);
    console.log('usuario nuevo agregado, ahora tenemos:', usuarios.length)
    return user;
};

const getLastUserId = () => {
    if (usuarios.length === 0) return 0;
    return Math.max(...usuarios.map(u => u.id));
};

const obtenerUsuarioPorId = (id) => {
    return usuarios.find(u => u.id === id);
};

module.exports = {
    findUserByEmail,
    addUser,
    getLastUserId,
    obtenerUsuarioPorId,
};
