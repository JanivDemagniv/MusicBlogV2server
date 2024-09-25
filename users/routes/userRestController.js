const express = require('express');
const { handleError } = require('../../utils/handleError');
const { createUser, loginUser } = require('../models/userAccessDataService');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let newUser = await createUser(req.body);
        return newUser;
    } catch (error) {
        handleError(res, 400, error.message)
    }
});

router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token)
    } catch (error) {
        handleError(res, 400, error.message)
    }
})

module.exports = router;