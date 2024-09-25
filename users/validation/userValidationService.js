const config = require('config');
const loginValidation = require('./joi/loginValidation');
const signupValidation = require('./joi/signupValidation');

const validator = config.get('VALIDATOR');

const validateSignup = (user) => {
    if (validator === "joi") {
        const { error } = signupValidation(user);
        if (error) return error.details[0].message;
        return "";
    };
};

const validateLogin = (user) => {
    if (validator === "joi") {
        const { error } = loginValidation(user);
        if (error) return error.details[0].message;
        return "";
    };
};

module.exports = { validateSignup, validateLogin }