const { createError } = require("../../utils/handleError");
const Post = require("./mongodb/Post");

const createPost = async (post) => {
    try {
        const newPost = new Post(post);
        await newPost.save();
        console.log('success');
    } catch (error) {
        console.log('faild');
    }
};

const getAllPosts = async () => {
    try {
        const allPosts = await Post.find();
        return allPosts
    } catch (error) {
        createError('Mongoose', error)
    }
}

module.exports = { createPost, getAllPosts }