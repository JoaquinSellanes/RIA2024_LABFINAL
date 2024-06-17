const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Usuario = require('./usuarioModel');
// Importa otros modelos aquí

const db = {
  sequelize,
  Sequelize,
  Usuario,
  // Añade otros modelos aquí
};

// Asociaciones (si las hay)
// Usuario.associate = (models) => {
//   // Definir asociaciones aquí
// };

sequelize.sync({ force: false })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
  })
  .catch(err => {
    // console.error('Error al sincronizar los modelos:', err);
    console.error('Error al sincronizar los modelos');
  });

module.exports = db;
