const mongoose = require('mongoose');
const { DEFUALTVALIDATOR } = require('./mongoseValidators');
const { last } = require('lodash');

const Name = new mongoose.Schema({
    first: DEFUALTVALIDATOR,
    middle: {
        type: String,
        maxLength: 256,
        trim: true,
        lowercase: true,
    },
    last: DEFUALTVALIDATOR,
});

module.exports = { Name }