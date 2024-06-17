const Usuario = require('./usuarioModel');

const seedData = async () => {
  try {
    // Precargar usuarios
    const usuarios = [
      { correo: 'admin@example.com', password: 'admin123', nombre: 'Admin', rol: 'ADMIN' },
      { correo: 'panadero@example.com', password: 'panadero123', nombre: 'Panadero', rol: 'PANADERO' },
      { correo: 'usuario@example.com', password: 'usuario123', nombre: 'Usuario', rol: 'USUARIO' }
    ];

    for (const usuario of usuarios) {
      const usuarioExistente = await Usuario.findOne({ where: { correo: usuario.correo } });
      if (!usuarioExistente) {
        await Usuario.create(usuario);
      }
    }

    console.log('Datos de precarga insertados exitosamente');
  } catch (error) {
    console.error('Error al precargar datos:', error);
  }
};

module.exports = seedData;
