const express = require('express');
const { getAllPosts, getPost, createPost, updatePost } = require('../models/postAccessDataService');
const { handleError } = require('../../utils/handleError');
const auth = require('../../auth/authServices');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.send(posts);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await getPost(id);
        res.send(post);
    } catch (error) {
        handleError(res, 400, error.message)
    };
});

router.post('/', auth, async (req, res) => {
    try {
        const userInfo = req.user;

        if (!userInfo.isCreator && !userInfo.isAdmin) return handleError(res, 403, 'Authoristion Error: You are no allowed to post');

        let newPost = req.body;
        newPost.creator = userInfo._id;
        newPost = await createPost(newPost);
        res.send(newPost);

    } catch (error) {
        handleError(res, 400, error.message)
    };
});

router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        const newPost = req.body;
        const postFromDb = await getPost(id);

        if (userInfo._id !== postFromDb.creator.toString() && !userInfo.isAdmin) {
            return handleError(res, 403, 'Athorization error: you are not authorise to edit the post');
        };

        newPost = await updatePost(id, newPost);
        res.send(newPost);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

module.exports = router;