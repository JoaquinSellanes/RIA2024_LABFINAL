const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const loadRoutes = (app) => {
    const routesPath = path.join(__dirname, '../routes');
    console.log(chalk.magenta('⚠️  Cargando rutas..'));
    fs.readdirSync(routesPath).forEach((file) => {
        const filePath = path.join(routesPath, file);
        if (fs.statSync(filePath).isFile() && file.endsWith('.js')) {
            try {
                const routeModule = require(filePath);
                const routeName = routeModule.route;
                const router = routeModule.router;

                if (routeName && router) {
                    console.log(''.padStart(2) + '✅ ' + chalk.green(`${routeName} (${file})`));
                    app.use(routeName, router);

                    // Mostrar los endpoints definidos en el router
                    if (router.stack && router.stack.length > 0) {
                        router.stack.forEach((layer) => {
                            if (layer.route && layer.route.path) {
                                const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
                                const endpoint = `${routeName}${layer.route.path}`;
                                console.log(''.padStart(4) + '🔗' + chalk.cyan(` ${methods.padEnd(6)} | ${endpoint}`));
                            }
                        });
                    }
                }
            } catch (error) {
                console.log(''.padStart(2) + '❌ ' + chalk.red(`Error cargando ${file}: ${error.message}`));
            }
        }
    });
};

module.exports = loadRoutes;
