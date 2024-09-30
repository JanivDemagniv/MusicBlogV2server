function replaceObjectById(array, id, newObject) {
    return array.map(obj => obj._id.toString() === id ? { ...newObject, _id: obj._id } : obj);
};

function deleteObjectById(array, id) {
    return array.filter(obj => obj._id.toString() !== id);
}

module.exports = { replaceObjectById, deleteObjectById }