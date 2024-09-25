const express = require('express');
const { getAllPosts, getPost, createPost } = require('../models/postAccessDataService');
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

        const newPost = req.body;
        newPost.creator = userInfo._id;
        const postUploaded = await createPost(newPost);
        res.send(postUploaded);

    } catch (error) {
        handleError(res, 400, error.message)
    }
})

module.exports = router;