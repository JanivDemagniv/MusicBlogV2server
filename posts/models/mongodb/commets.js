const mongoose = require('mongoose');
const { DEFUALTCONTENTVALIDATOR } = require('../../../helpers/mongodb/mongoseValidators');

const commentSchema = new mongoose.Schema({
    content: DEFUALTCONTENTVALIDATOR,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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