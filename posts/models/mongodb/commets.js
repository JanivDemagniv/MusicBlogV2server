const mongoose = require('mongoose');
const { DEFUALTCONTENTVALIDATOR, DEFUALTVALIDATOR } = require('../../../helpers/mongodb/mongoseValidators');
const { Image } = require('../../../helpers/mongodb/Image');

const commentSchema = new mongoose.Schema({
    content: DEFUALTCONTENTVALIDATOR,
    creator: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: DEFUALTVALIDATOR,
        image: Image
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    likes: {
        type: Number,
        default: 0
    }
});


module.exports = commentSchema;