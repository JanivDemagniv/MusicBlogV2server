const mongoose = require('mongoose');
const { DEFUALTVALIDATOR, EMAIL } = require('../../../helpers/mongodb/mongoseValidators');
const { Name } = require('../../../helpers/mongodb/Name');
const { Image } = require('../../../helpers/mongodb/Image');

const userSchema = new mongoose.Schema({
    userName: { ...DEFUALTVALIDATOR, unique: true, },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: EMAIL,
    name: Name,
    profilePic: Image,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isAdmin: { type: Boolean, default: false },
    isCreator: { type: Boolean, default: false }
});

const User = mongoose.model('user', userSchema);

module.exports = User;