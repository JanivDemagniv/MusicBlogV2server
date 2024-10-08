const express = require('express');
const { getAllPosts, getPost, createPost, updatePost, createComment, deletePost, updateComment, deleteComment } = require('../models/postAccessDataService');
const { handleError } = require('../../utils/handleError');
const auth = require('../../auth/authServices');
const { postLikeOrUnlike, commentLikeOrUnlike, deleteCommentFromUser, deletePostFromUser } = require('../../users/models/userAccessDataService');
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

router.put('/comments', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const comment = req.body;

        comment.creator = userInfo._id;

        let newComment = await createComment(comment);
        res.send(newComment);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

router.put('/comments/:id', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        let updatedComment = req.body

        if (userInfo._id !== req.creator && !userInfo.isAdmin) {
            return handleError(res, 403, 'Authoristion Error: You are no allowed to edit this comment');
        };

        let updatedComments = await updateComment(updatedComment, id);
        res.send(updatedComments)
    } catch (error) {
        handleError(res, 400, error.message)
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        let newPost = req.body;
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

router.patch('/:id', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;

        let newLikedArray = await postLikeOrUnlike(id, userInfo._id);
        res.send(newLikedArray);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

router.patch('/comments/:id', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        let newLikedArray = await commentLikeOrUnlike(id, userInfo._id);
        res.send(newLikedArray);
    } catch (error) {
        handleError(res, 400, error.message);
    };
})

router.delete('/comments/:id', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        const postId = req.body;

        if (userInfo._id !== req.creator && !userInfo.isAdmin) {
            return handleError(res, 403, 'Authoristion Error: You are no allowed to delete this comment');
        };
        await deleteCommentFromUser(id)
        let newCommentArray = await deleteComment(postId.post, id);
        res.send(newCommentArray);
    } catch (error) {
        handleError(res, 400, error.message)
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        const postFromDb = await getPost(id);

        if (userInfo._id !== postFromDb.creator && !userInfo.isAdmin) {
            return handleError(res, 403, 'Athorization error: you are not authorise to delete the post');
        };

        if (postFromDb.comments.length > 0) {
            postFromDb.comments.forEach(async (comment) => await deleteCommentFromUser(comment._id.toString()));
        }

        await deletePostFromUser(id);
        await deletePost(postFromDb._id);
        res.send(postFromDb);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

module.exports = router;