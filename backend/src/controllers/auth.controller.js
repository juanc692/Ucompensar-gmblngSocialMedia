const authService = require('../services/auth.service')

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await authService.register(username, email, password);
        res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result); //devolvemos un json con los datos solicitados al auth
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { register, login };