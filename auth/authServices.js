const config = require('config');
const { createError, handleError } = require('../utils/handleError');
const { verifyToken } = require('./providers/jwt');

const tokenGenerator = config.get('TOKEN_GENERATOR');

const auth = (req, res, next) => {
    if (tokenGenerator === 'jwt') {
        try {
            let token = req.header('JRY-auth-token');
            if (!token) {
                let error = new Error;
                error.message = 'Please Login';
                createError('Authentication', error);
            }
            const userInfo = verifyToken(token);
            if (!userInfo) {
                let error = new Error;
                error.message = 'Unauthorize user';
                createError('Authentication', error);
            }
            req.user = userInfo;
            return next()
        } catch (error) {
            handleError(res, 401, error.message);
        };
    };

    return handleError(res, 500, 'you did not use valid token');
};

module.exports = auth;