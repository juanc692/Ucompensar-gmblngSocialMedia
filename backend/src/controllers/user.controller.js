const userService = require('../services/user.service');

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.findUserById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTopUsers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 6;
        const users = await userService.getTopUsers(limit);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addPoints = async (req, res) => {
    try {
        const userId = req.user.id;
        const { points } = req.body;
        if (!points || points <= 0) {
            return res.status(400).json({ error: 'Puntos inválidos' });
        }
        const result = await userService.addPoints(userId, points);
        res.json(result); // devuelve { points: totalActual }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMedia = async (req, res) => {
    try {
        const userId = req.user.id;
        const { photo_profile } = req.body;
        const result = await userService.modifyMedia(userId, photo_profile);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

module.exports = { getUserById, getTopUsers, addPoints, updateMedia, modifyDescription };