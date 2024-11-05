const express = require('express');
const { handleError } = require('../../utils/handleError');
const { createUser, loginUser, getUser, getAllUsers, updateUser, deleteUser, isCreatorUpdate } = require('../models/userAccessDataService');
const auth = require('../../auth/authServices');
const { validateSignup, validateLogin } = require('../validation/userValidationService');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const errorMessage = validateSignup(req.body);

        if (errorMessage) return handleError(res, 400, 'Validation Error:' + errorMessage);

        let newUser = await createUser(req.body);
        res.send(newUser);
    } catch (error) {
        handleError(res, 400, error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const errorMessage = validateLogin(req.body);

        if (errorMessage) return handleError(res, 400, 'Validation Error: ' + errorMessage);

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
        res.send(allUsers);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

router.put('/:id', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        const newUserInfo = req.body;
        const userFromDb = await getUser(id);

        if (userInfo._id !== userFromDb._id.toString() && !userInfo.isAdmin) {
            return handleError(res, 403, 'Athorization error: you are no allowed to edit the user');
        };

        let user = await updateUser(id, newUserInfo);
        res.send(user);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;

        if (!userInfo.isAdmin) {
            handleError(res, 403, 'You Are not allowed to Delete');
        };

        let userDeleted = await deleteUser(id);
        res.send(userDeleted);
    } catch (error) {
        handleError(res, 400, error.message)
    };
});

router.patch('/:id', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;

        if (!userInfo.isAdmin) {
            handleError(res, 403, 'You Are not allowed to change creators status');
        };

        let userCreator = await isCreatorUpdate(id);
        res.send(userCreator)
    } catch (error) {
        handleError(res, 400, error.message)
    }
})

module.exports = router;