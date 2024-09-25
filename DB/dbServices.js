const config = require('config');
const connectToMongodbLocaly = require('./mongodb/connectToMongoDbLocaly');
const connectToAtlas = require('./mongodb/connectToAtlas');

const ENVIRONMENT = config.get('ENVIRONMENT');

const connectToDb = async () => {
    if (ENVIRONMENT === 'development') {
        await connectToMongodbLocaly();
    };
    if (ENVIRONMENT === 'production') {
        await connectToAtlas();
    };
};

module.exports = connectToDb;