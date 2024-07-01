const morgan = require('morgan');
const chalk = require('chalk');

morgan.token('status', (req, res) => {
    const status = res.statusCode;
    if (status >= 500) {
        return chalk.red(status);
    } else if (status >= 400) {
        return chalk.yellow(status);
    } else if (status >= 300) {
        return chalk.cyan(status);
    } else if (status >= 200) {
        return chalk.green(status);
    }
    return status;
});

morgan.token('method', (req) => {
    return chalk.blue(req.method);
});

morgan.token('url', (req) => {
    return chalk.magenta(req.originalUrl);
});

const format = ':method :url :status :res[content-length] - :response-time ms';

const morganMiddleware = morgan(format);

module.exports = morganMiddleware;
