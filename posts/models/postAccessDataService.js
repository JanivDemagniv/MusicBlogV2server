const { createError } = require("../../utils/handleError");
const { replaceObjectById, deleteObjectById } = require("../helpers/functions");
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

const createComment = async (comment) => {
    try {
        const postOfTheComment = await Post.findById(comment.post);

        postOfTheComment.comments.push(comment);
        await Post.findByIdAndUpdate(postOfTheComment._id, postOfTheComment)
        return comment
    } catch (error) {
        createError('Mongoose', error)
    }
}

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
        const post = await Post.findByIdAndUpdate(postId, newPost);
        return post;
    } catch (error) {
        createError('Mongoose', error);
    };
};

const updateComment = async (updateComment, commentId) => {
    try {
        const postOfTheComment = await Post.findById(updateComment.post);
        let newCommentArray = replaceObjectById(postOfTheComment.comments, commentId, updateComment);
        postOfTheComment.comments = newCommentArray;

        await Post.findByIdAndUpdate(updateComment.post, postOfTheComment);
        return postOfTheComment.comments;
    } catch (error) {
        createError("Mongoose", error);
    };
};

const deletePost = async (postId) => {
    try {
        const deletePost = await Post.findByIdAndDelete(postId);
        return deletePost;
    } catch (error) {
        createError('Mongoose', error);
    };
};

const deleteComment = async (postId, commentId) => {
    try {
        let deletedComment = await Post.updateOne(
            { _id: postId },
            { $pull: { comments: { _id: commentId } } }
        )
        return deletedComment;
    } catch (error) {
        createError('Mongoose', error);
    };
};


const updatePostLike = async (postId, userId) => {
    try {
        let post = await Post.findById(postId);
        if (post) {
            if (post.likes.includes(userId)) {
                let newLikes = post.likes.filter((like) => like != userId);
                post.likes = newLikes;
            } else {
                post.likes.push(userId)
            }
            await Post.findByIdAndUpdate(postId, post);
            return post
        }
        let error = new Error;
        error.message = 'Card not found';
        createError('Path', error);
    } catch (error) {
        createError('Mongoose', error)
    }
}

const updateCommentLike = async (commentId, userId, postId) => {
    try {
        const postFromDb = await Post.findById(postId);

        let comment = postFromDb.comments.find((comment) => comment._id.toString() === commentId);

        if (comment) {
            if (comment.likes.includes(userId)) {
                comment.likes = comment.likes.filter((like) => like !== userId);
            } else {
                comment.likes.push(userId);
            }
            await postFromDb.save();
            return comment;
        } else {
            throw new Error('Comment not found');
        }
    } catch (error) {
        console.error('Error updating comment like:', error);
        throw error;
    }
};

module.exports = { createPost, getAllPosts, getPost, updatePost, createComment, deletePost, updateComment, deleteComment, updatePostLike, updateCommentLike }