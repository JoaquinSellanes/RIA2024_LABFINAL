const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const chalk = require('chalk');
const cors = require('cors');

const morganMiddleware = require('./utils/logging');
const loadRoutes = require('./utils/routeLoader');
const env = require('./config/env');
const db = require('./models');
const seedData = require('./models/seedData');

console.clear();

dotenv.config();

const app = express();

// Middleware de logging con colores
app.use(morganMiddleware);

// Middleware de logging
// combined: Información detallada (similar a los logs de Apache).
// common: Información básica de los logs.
// dev: Logs concisos coloreados útiles para desarrollo.
// short: Logs más cortos que common.
// tiny: Logs muy breves.
// app.use(morgan('dev'));

// Configuración de body-parser con un tamaño de cuerpo mayor
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

// Cargar rutas de manera dinámica
loadRoutes(app);

// Conectar a la base de datos y sincronizar modelos
db.sequelize.sync({ force: true }) // Usar { force: true } para borrar y volver a crear, o { alter: true } para ajustar tablas sin perder datos
  .then(() => {
    console.log(chalk.green('Base de datos sincronizada'));
    // Precargar datos
    return seedData();
  })
  .then(() => {
    const PORT = env.PORT;
    app.listen(PORT, () => {
      console.log(chalk.cyan('Servidor corriendo en el puerto ') + chalk.yellow(PORT));
    });
  })
  .catch(err => {
    // console.error('Error al sincronizar la base de datos:', err);
    console.error('Error al sincronizar la base de datos');
  });

// const PORT = env.PORT;
// app.listen(PORT, () => {
//   console.log(chalk.cyan('Servidor corriendo en el puerto ') + chalk.yellow(PORT));
// });
