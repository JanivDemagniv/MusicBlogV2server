const { createError } = require("../../utils/handleError");
const User = require("./mongodb/User");
const _ = require('lodash');

const createUser = async (newUser) => {
    try {
        const user = new User(newUser);
        await user.save();
        let resUser = _.pick(user, ['_id', 'email', 'userName'])
        return resUser;
    } catch (error) {
        createError('Mongoose', error);
    }
};

const getUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user
    } catch (error) {
        createError('Mongoose', error)
    }
};

const loginUser = async (email, password) => {
    try {
        const userFromDb = await User.findOne({ email });
        if (!userFromDb) {
            let error = new Error;
            error.message = 'Invalid email or password';
            createError('Authentication', error);
        };
        if (userFromDb.password !== password) {
            let error = new Error;
            error.message = 'Invalid email or password';
            createError('Authentication', error);
        };
        return userFromDb;
    } catch (error) {
        createError('Mongoose', error)
    }
};

const getAllUsers = async () => {
    try {
        let allUsers = User.find();
        return allUsers
    } catch (error) {
        createError('Mongosose', error)
    }
}

module.exports = { createUser, getUser, loginUser, getAllUsers }