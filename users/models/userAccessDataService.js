const { genetateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleError");
const { generateUserPassword, comparePasswords } = require("../helpers/bcryp");
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
        console.log(user);

        const resUser = _.pick(user, ['_id', 'userName', 'email', 'name', 'profilePic', 'isAdmin', 'isCreator', 'likedPosts', 'likedComments']);
        console.log(resUser);

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
        createError('Mongoose', error)
    }
}

module.exports = { createUser, getUser, loginUser, getAllUsers, updateUser, deleteUser };