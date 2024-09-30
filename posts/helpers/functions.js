function replaceObjectById(array, id, newObject) {
    return array.map(obj => obj._id.toString() === id ? { ...newObject, _id: obj._id } : obj);
};

module.exports = { replaceObjectById }