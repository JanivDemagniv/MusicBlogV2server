function addPostLike(postId, likedArray) {
    return likedArray.push(postId);
};

function findIfPostLiked(postId, likedArray) {
    return Boolean(likedArray.find((post) => post === postId));
};

function deletePostLike(postId, likedArray) {
    return likedArray.filter((post) => post !== postId);
};

module.exports = { addPostLike, findIfPostLiked, deletePostLike }