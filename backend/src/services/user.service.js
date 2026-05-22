const userModel = require('../models/user.model');

const modifyDescription = async (id, description) => {
    return await userModel.modifyDescription(description, id);
};

const modifyMedia = async (id, media) => {
    return await userModel.modifyMedia(media, id);
};

const findUserById = async (id) => {
    return await userModel.findUserById(id);
};

const getTopUsers = async (limit) => {
    return await userModel.getTopUsers(limit);
};

const addPoints = async (id, points) => {
    return await userModel.addPoints(id, points);
};

module.exports = { modifyDescription, modifyMedia, findUserById, getTopUsers, addPoints };
