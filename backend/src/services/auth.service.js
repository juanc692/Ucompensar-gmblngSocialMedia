require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const register = async (username, email, password) => {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) throw new Error('El email ya esta registrado');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.insertUser(username, email, hashedPassword);
    return newUser;
};

const login = async (email, password) => {
    const user = await userModel.findUserByEmail(email);
    if (!user) throw new Error('Credenciales incorrectas');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Credenciales invalidas');

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    // Incluye points para que el frontend pueda mostrarlo desde el inicio
    return { token, user: { id: user.id, email: user.email, name: user.name, points: user.points ?? 0 } };
};

module.exports = { register, login };