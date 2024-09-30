const { genetateAuthToken } = require("../../auth/providers/jwt");
const { unlikePost, likePost, likeComment, unlikecomment } = require("../../posts/models/postAccessDataService");
const { createError } = require("../../utils/handleError");
const { generateUserPassword, comparePasswords } = require("../helpers/bcryp");
const { findIfPostLiked, deletePostLike, addPostLike } = require("../helpers/functions");
const User = require("./mongodb/User");
const _ = require('lodash');

const createUser = async (newUser) => {
    try {
        const user = new User(newUser);
        user.password = generateUserPassword(user.password);
        await user.save();
        let resUser = _.pick(user, ['_id', 'email', 'userName', 'isAdmin', 'isCreator']);
        return resUser;
    } catch (error) {
        createError('Mongoose', error);
    };
};

const getUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        const resUser = _.pick(user, ['_id', 'userName', 'email', 'name', 'profilePic', 'isAdmin', 'isCreator', 'likedPosts', 'likedComments']);
        return resUser;
    } catch (error) {
        createError('Mongoose', error);
    };
};

const loginUser = async (email, password) => {
    try {
        const userFromDb = await User.findOne({ email });

        if (!userFromDb) {
            let error = new Error;
            error.message = 'Invalid UserName or password';
            createError('Authentication', error);
        };
        if (!comparePasswords(password, userFromDb.password)) {
            let error = new Error;
            error.message = 'Invalid UserName or password';
            createError('Authentication', error);
        };
        const userToken = genetateAuthToken(userFromDb);
        return userToken;
    } catch (error) {
        createError('Mongoose', error);
    };
};

const getAllUsers = async () => {
    try {
        let allUsers = User.find();
        return allUsers;
    } catch (error) {
        createError('Mongosose', error);
    };
};

const updateUser = async (userId, userNewInfo) => {
    try {
        let user = await User.findByIdAndUpdate(userId, userNewInfo);
        return user;
    } catch (error) {
        createError('Mongoose', error);
    };
};

const deleteUser = async (userId) => {
    try {
        const userDeleted = await User.findByIdAndDelete(userId);
        return userDeleted;
    } catch (error) {
        createError('Mongoose', error);
    };
};

const postLikeOrUnlike = async (postId, userId) => {
    try {
        const userInfo = await getUser(userId);

        if (findIfPostLiked(postId, userInfo.likedPosts)) {
            let newLikedArray = deletePostLike(postId, userInfo.likedPosts);
            userInfo.likedPosts = newLikedArray;
            await unlikePost(postId);
            await User.findByIdAndUpdate(userId, userInfo);
            return userInfo.likedPosts;
        };

        addPostLike(postId, userInfo.likedPosts);
        await likePost(postId)
        await User.findByIdAndUpdate(userId, userInfo);
        return userInfo.likedPosts;
    } catch (error) {
        createError('Mongoose', error);
    };
};

const commentLikeOrUnlike = async (commentId, userId) => {
    try {
        const userInfo = await getUser(userId);

        if (findIfPostLiked(commentId, userInfo.likedComments)) {
            let newLikedArray = deletePostLike(commentId, userInfo.likedComments);
            userInfo.likedComments = newLikedArray;
            await unlikecomment(commentId);
            await User.findByIdAndUpdate(userId, userInfo);
            return userInfo.likedComments;
        };

        addPostLike(commentId, userInfo.likedComments);
        await likeComment(commentId)
        await User.findByIdAndUpdate(userId, userInfo);
        return userInfo.likedComments;
    } catch (error) {
        createError('Mongoose', error);
    };
};

const deleteCommentFromUser = async (commentId) => {
    try {
        const users = await User.find({ likedComments: commentId });

        if (users) {
            users.forEach(async (userInfo) => {
                let newLikedArray = deletePostLike(commentId, userInfo.likedComments);
                userInfo.likedComments = newLikedArray;
                await User.findByIdAndUpdate(userInfo._id, userInfo);
            })
            return true;
        };

        if (!users) {
            return false;
        };
    } catch (error) {
        createError('Mongoose', error);
    };
};

const deletePostFromUser = async (postId) => {
    try {
        const users = await User.find({ likedPosts: postId });

        if (users) {
            users.forEach(async (userInfo) => {
                let newLikedArray = deletePostLike(postId, userInfo.likedPosts);
                userInfo.likedPosts = newLikedArray;
                await User.findByIdAndUpdate(userInfo._id, userInfo);
            })
            return true;
        };

        if (!users) {
            return false;
        };
    } catch (error) {
        createError('Mongoose', error);
    };
};

module.exports = { createUser, getUser, loginUser, getAllUsers, updateUser, deleteUser, postLikeOrUnlike, commentLikeOrUnlike, deleteCommentFromUser, deletePostFromUser };