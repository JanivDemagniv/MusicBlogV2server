const express = require('express');
const { handleError } = require('../../utils/handleError');
const { createUser, loginUser, getUser, getAllUsers } = require('../models/userAccessDataService');
const auth = require('../../auth/authServices');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let newUser = await createUser(req.body);
        res.send(newUser);
    } catch (error) {
        handleError(res, 400, error.message);
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
});

router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (userInfo._id != id && !userInfo.isAdmin) {
            let error = new Error;
            error.message = 'You are not authorize to see that user details';
            handleError(res, 403, error);
        }
        const user = await getUser(id);
        res.send(user)
    } catch (error) {
        handleError(res, 400, error.message)
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            let error = new Error;
            error.message = "You are not authorize to see all users";
            handleError(res, 403, error);
        };

        const allUsers = await getAllUsers();
        res.send(allUsers)
    } catch (error) {
        handleError(res, 400, error.message)
    }
})

module.exports = router;