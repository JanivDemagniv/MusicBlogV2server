const { createError } = require("../../utils/handleError");
const Post = require("./mongodb/Post");

const createPost = async (post) => {
    try {
        const newPost = new Post(post);
        await newPost.save();
        return newPost
    } catch (error) {
        createError('Mongoose', error)
    }
};

const getAllPosts = async () => {
    try {
        const allPosts = await Post.find();
        return allPosts;
    } catch (error) {
        createError('Mongoose', error);
    };
};

const getPost = async (postId) => {
    try {
        const post = await Post.findById(postId);
        return post;
    } catch (error) {
        createError('Mongoose', error);
    };
};

const updatePost = async (postId, newPost) => {
    try {
        const post = await Post.findByIdAndDelete(postId, newPost);
        return post;
    } catch (error) {
        createError('Mongoose', error);
    };
};

module.exports = { createPost, getAllPosts, getPost, updatePost }