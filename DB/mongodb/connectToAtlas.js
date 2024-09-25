const mongoose = require('mongoose');
require('dotenv').config();
const chalk = require('chalk');

const connectStringForAtlas = process.env.ATLAS_CONNECTION_STRING;

const connectToAtlas = async () => {
    try {
        await mongoose.connect(connectStringForAtlas);
        console.log(chalk.bgGreen('connected to Mongodb in Atlas'));
    } catch (error) {
        console.log('could not connect to Mongodb in Atlas');
    }
};

module.exports = connectToAtlas;