const config = require('config');
const morganLogger = require('./loggers/moeganLoggers');

const LOGGER = config.get('LOGGER');

const loggerService = () => {
    if (LOGGER === 'morgan') {
        return morganLogger;
    }
};

module.exports = loggerService;