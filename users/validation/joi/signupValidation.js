const Joi = require('joi');

const signupValidation = (user) => {
    const schema = Joi.object({
        userName: Joi.string().min(2).max(256).required(),
        name: Joi.object()
            .keys({
                first: Joi.string().min(2).max(256).required(),
                middle: Joi.string().min(2).max(256).allow(""),
                last: Joi.string().min(2).max(256).required(),
            })
            .required(),
        email: Joi.string()
            .ruleset.pattern(
                /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
            )
            .rule({ message: 'user "mail" mast be a valid mail' })
            .required(),
        password: Joi.string()
            .ruleset.regex(
                /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
            )
            .rule({
                message:
                    'user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-',
            })
            .required(),
        profilePic: Joi.object()
            .keys({
                url: Joi.string()
                    .ruleset.regex(
                        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
                    )
                    .rule({ message: "user image mast be a valid url" })
                    .allow(""),
                alt: Joi.string().min(2).max(256).allow(''),
            })
            .required(),
        isCreator: Joi.boolean().allow(""),
        isAdmin: Joi.boolean().allow(""),
    });
    return schema.validate(user);
};

module.exports = signupValidation;