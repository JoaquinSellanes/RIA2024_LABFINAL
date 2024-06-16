const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const chalk = require('chalk');
const cors = require('cors');


const morganMiddleware = require('./utils/logging');
const loadRoutes = require('./utils/routeLoader');

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

app.use(bodyParser.json());
app.use(cors());

// Cargar rutas de manera dinámica
loadRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // console.log(`${chalk.yellow} Servidor corriendo en el puerto ${PORT}`);
  console.log(chalk.cyan('Servidor corriendo en el puerto ') + chalk.yellow(PORT));
});
