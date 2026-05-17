const userModel = require('../models/user.model');


//modificar descripcion
const modifyDescription = async (id, description) => {
    const updatedUser = await userModel.modifyDescription(description,id);
    return updatedUser;
};

//modificar foto perfil 
const modifyMedia = async (id, media) => {
    const updatedUser = await userModel.modifyMedia( media,id);
    return updatedUser;
};

//obtener usuario por id 
const findUserById = async (id) => {
    const user = await userModel.findUserById(id);
    return user;
};

module.exports = { modifyDescription, modifyMedia, findUserById };