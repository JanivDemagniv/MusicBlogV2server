const URL = {
    type: String,
    trim: true,
    lowercase: true,
    match: RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    ),
};

const EMAIL = {
    type: String,
    required: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
};

const DEFUALTVALIDATOR = {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    trim: true,
};

const DEFUALTCONTENTVALIDATOR = {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 10000,
    lowercase: true,
    trim: true,
};

module.exports = { URL, EMAIL, DEFUALTVALIDATOR, DEFUALTCONTENTVALIDATOR }