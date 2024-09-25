const mongoose = require('mongoose');
const { DEFUALTVALIDATOR, DEFUALTCONTENTVALIDATOR } = require('../../../helpers/mongodb/mongoseValidators');
const { Image } = require('../../../helpers/mongodb/Image');

const postSchema = new mongoose.Schema({
    title: DEFUALTVALIDATOR,
    subtitle: DEFUALTVALIDATOR,
    content: DEFUALTCONTENTVALIDATOR,
    image: Image,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    likes: { type: Number, default: 0 },
    comments: [{ type: String }],
    createdAt: { type: Date, default: Date.now() }
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;