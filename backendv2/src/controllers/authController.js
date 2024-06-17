const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

exports.register = async (req, res) => {
  try {
    const { correo, password, nombre } = req.body;

    // Validaciones simples
    if (!correo || !correo.includes('@')) {
      return res.status(400).json({ error: 'Debe proporcionar un correo electrónico válido' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Crear nuevo usuario
    const nuevoUsuario = await Usuario.create({ correo, password, nombre, rol: "USUARIO" });

    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      usuario: {
        id: nuevoUsuario.id,
        correo: nuevoUsuario.correo,
        nombre: nuevoUsuario.nombre,
        rol: nuevoUsuario.rol
      }
    });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).json({ error: 'Error registrando usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Validaciones simples
    if (!correo || !correo.includes('@')) {
      return res.status(400).json({ error: 'Debe proporcionar un correo electrónico válido' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respuesta de éxito
    res.status(200).json({ 
      message: 'Login exitoso',
      token,
    });
  } catch (error) {
    console.error('Error iniciando sesión:', error);
    res.status(500).json({ error: 'Error iniciando sesión' });
  }
};
