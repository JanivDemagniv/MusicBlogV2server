const morgan = require('morgan');
const chalk = require('chalk');
const currentTime = require('../../utils/currentTime');

const morganLogger = morgan((tokens, req, res) => {
    const { year, mounth, day, hours, seconds, minutes } = currentTime();
    let log = [
        `[${year}/${mounth}/${day} ${hours}:${minutes}:${seconds}]`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        '-',
        tokens['response-time'](req, res), 'ms'
    ].join();
    return res.statusCode >= 400 ? chalk.redBright(log) : chalk.cyanBright(log)
});

module.exports = morganLogger;