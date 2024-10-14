const mongoose = require('mongoose');
const { DEFUALTVALIDATOR, DEFUALTCONTENTVALIDATOR } = require('../../../helpers/mongodb/mongoseValidators');
const { Image } = require('../../../helpers/mongodb/Image');
const commentSchema = require('./commets');

const postSchema = new mongoose.Schema({
    title: DEFUALTVALIDATOR,
    subtitle: DEFUALTVALIDATOR,
    artist: DEFUALTVALIDATOR,
    album: DEFUALTVALIDATOR,
    content: DEFUALTCONTENTVALIDATOR,
    image: Image,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    likes: { type: Number, default: 0 },
    comments: [
        commentSchema
    ],
    createdAt: { type: Date, default: Date.now() }
});

const Post = mongoose.model('posts', postSchema);

module.exports = Post;