const mongoose = require('mongoose');
const { URL, DEFUALTVALIDATOR } = require('./mongoseValidators');

const Image = new mongoose.Schema({
    url: URL,
    alt: { ...DEFUALTVALIDATOR, required: false, default: 'Picture' }
});

module.exports = { Image };