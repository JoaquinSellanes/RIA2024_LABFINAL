const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: async (usuario) => {
      const saltRounds = 10;
      usuario.password = await bcrypt.hash(usuario.password, saltRounds);
    },
    beforeUpdate: async (usuario) => {
      if (usuario.changed('password')) {
        const saltRounds = 10;
        usuario.password = await bcrypt.hash(usuario.password, saltRounds);
      }
    }
  },
  timestamps: true
});

module.exports = Usuario;
