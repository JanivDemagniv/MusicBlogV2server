
const createComment = async (comment) => {
    try {
        const newComment = new Comment(comment);
        await newComment.save();
        let rootPost = await Post.findById(comment.post);
        rootPost.comments.push(newComment._id);
        await rootPost.save();
        console.log('success');

    } catch (error) {
        console.log('faild');

    }
};

module.exports = { createComment }