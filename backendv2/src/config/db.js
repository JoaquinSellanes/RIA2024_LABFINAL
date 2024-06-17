const { Sequelize } = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  dialect: 'mysql',
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch(err => {
    // console.error('No se pudo conectar a la base de datos:', err);
    console.error('No se pudo conectar a la base de datos');
  });

module.exports = sequelize;
