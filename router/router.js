const express = require('express');
const router = express.Router();
const postRouterController = require('../posts/routes/postRestController');

router.use('/posts', postRouterController);

router.use((req, res) => {
    res.status(404).send('Path not found');
});

module.exports = router;