//verifica que el usuario existe, la contraseña y devuelve un token JWT
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const register = async (username, email, password) => {
    //verificar que el usuario no exista ya
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) throw new Error('El email ya esta registrado');

    //encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //guardar usuario en DB
    const newUser = await userModel.insertUser(username, email, hashedPassword);
    return newUser;
};
//login del usuario
const login = async (email, password) => {
    //verificar que el usuario exista
    const user = await userModel.findUserByEmail(email);
    if (!user) throw new Error('Credenciales incorrectas');

    //verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Credenciales invalidas');

    //generar token que almacena el cliente
    const token = jwt.sign(
        { id: user.id, email: user.email },//payload
        process.env.JWT_SECRET,//clave secreta
        { expiresIn: '1h' } //tiempo en que expira
    );

    return { token, user: { id: user.id, email: user.email, name: user.name } };
};

module.exports = { register, login };