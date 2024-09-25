const express = require('express');
const router = express.Router();
const postRouterController = require('../posts/routes/postRestController');
const userRouterController = require('../users/routes/userRestController');

router.use('/posts', postRouterController);
router.use('/users', userRouterController);

router.use((req, res) => {
    res.status(404).send('Path not found');
});

module.exports = router;