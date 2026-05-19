const userService = require('../services/user.service');

//obtener usuario por id
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.findUserById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//cambiar foto perfil
const updateMedia = async (req, res) => {
    try {
        const userId = req.user.id;
        const { photo_profile } = req.body;
        console.log('body:', req.body);      // ← agrega esto
        console.log('photo_profile:', req.body.media);
        const result = await userService.modifyMedia(userId, photo_profile);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//cambiar descripcion
const modifyDescription = async (req, res) => {
    try {
        const userId = req.user.id;
        const { description } = req.body;
        const result = await userService.modifyDescription(userId, description);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUserById, updateMedia, modifyDescription };