const Usuario = require('../models/usuarioModel');
const { usuarios } = require('../data/mockData');

const crearUsuario = (usuarioData) => {
    const nuevoUsuario = new Usuario(usuarioData); // Crear el usuario y hashear la contraseña
    usuarios.push(nuevoUsuario);
    return nuevoUsuario;
};

const encontrarUsuarioPorCorreo = (correo) => {
    return usuarios.find(u => u.correo === correo);
};

module.exports = {
    crearUsuario,
    encontrarUsuarioPorCorreo
};
