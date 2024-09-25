const express = require('express');
const { getAllPosts } = require('../models/postAccessDataService');
const { handleError } = require('../../utils/handleError');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.send(posts)
    } catch (error) {
        handleError(res, 400, error.message);
    }
});

module.exports = router;