const mongoose = require('mongoose');
const chalk = require('chalk');

const connectToMongodbLocaly = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/blogServer');
        console.log(chalk.bgGreen('connected to Mongodb Localy'));
    } catch (error) {
        console.log(chalk.bgRed('could not connect to Mongodb Localy'));
    }
};

module.exports = connectToMongodbLocaly;