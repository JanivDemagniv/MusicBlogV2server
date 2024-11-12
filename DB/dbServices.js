const config = require('config');
const connectToMongodbLocaly = require('./mongodb/connectToMongoDbLocaly');
const connectToAtlas = require('./mongodb/connectToAtlas');
const createUserMockData = require('../users/mock/mockDataUsers');
const createPostMockData = require('../posts/mock/MockDataPosts');

const ENVIRONMENT = config.get('ENVIRONMENT');

const connectToDb = async () => {
    if (ENVIRONMENT === 'development') {
        await connectToMongodbLocaly();

        await createUserMockData();
        await createPostMockData();
    };
    if (ENVIRONMENT === 'production') {
        await connectToAtlas();
    };
};

module.exports = connectToDb;