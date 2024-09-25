const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_WORD = process.env.JWT_SECRET;

const genetateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin, isCreator: user.isCreator, initAt: new Date() });
    return token;
};

const verifyToken = (tokenFromClient) => {
    try {
        const checkToken = jwt.verify(tokenFromClient, SECRET_WORD);
        return checkToken;
    } catch (error) {
        return null;
    };
};

module.exports = { genetateAuthToken, verifyToken }