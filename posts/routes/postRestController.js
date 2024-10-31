const express = require('express');
const { getAllPosts, getPost, createPost, updatePost, createComment, deletePost, updateComment, deleteComment, updatePostLike, updateCommentLike } = require('../models/postAccessDataService');
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
        newPost.creator = {};
        newPost.creator._id = userInfo._id;
        newPost.creator.name = userInfo.userName;
        newPost.creator.image = userInfo.profilePic;

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

        comment.creator = {};
        comment.creator._id = userInfo._id;
        comment.creator.name = userInfo.userName;
        comment.creator.image = userInfo.profilePic;

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

        if (userInfo._id !== updatedComment.creator._id && !userInfo.isAdmin) {
            return handleError(res, 403, 'Authoristion Error: You are no allowed to edit this comment');
        };

        if (userInfo.isAdmin) {
            updatedComment.content += "  --edited by manager--"
        }

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

        if (!userInfo.isCreator && !userInfo.isAdmin) {
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

        let newLiked = await updatePostLike(id, userInfo._id);
        res.send(newLiked);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

router.patch('/comments/:id', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        const postId = req.body;
        let newLiked = await updateCommentLike(id, userInfo._id, postId);
        res.send(newLiked);
    } catch (error) {
        handleError(res, 400, error.message);
    };
})

router.delete('/comments/:id', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;

        if (userInfo._id !== req.creator._id.toString() && !userInfo.isAdmin) {
            return handleError(res, 403, 'Authoristion Error: You are no allowed to delete this comment');
        };
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

        if (!userInfo.isCreator && !userInfo.isAdmin) {
            return handleError(res, 403, 'Athorization error: you are not authorise to delete the post');
        };

        await deletePost(postFromDb._id);
        res.send(postFromDb);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

module.exports = router;