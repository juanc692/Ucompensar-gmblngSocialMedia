const db = require('../config/db');

//obtener usuario por email para iniciar sesion
const findUserByEmail = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    } catch (error) {
        console.error(error)
    }
};
//agregar usuario al sistema
const insertUser = async (name, email, hashedPassword) => {
    try {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        return {id: result.insertId, name, description, email, password}; //result.insertId es la id que el SQL le asigno automaticamente 
    } catch (error) {
        console.error(error);
    }
};
//modificar descripcion
const modifyDescription = async(description, id) => {
    try{
        const [result] = await db.query(
            'UPDATE users SET description = ? WHERE id = ?',
            [description, id]
        );
        return result;
    } catch (error) {
        console.error(error);
    }
}
//modificar foto perfil
const modifyMedia = async(media,id)=>{
    try {
        const [result] = await db.query(
            'UPDATE users SET photo_profile = ? WHERE id = ?',
            [media, id]
        );
        return result;
    } catch (error) {
        console.error(error)
        throw error;
    }
}
//buscar usuario por id
const findUserById = async(id) => {
    try{
        const [rows] = await db.query('SELECT id, name, email, description, photo_profile, points  FROM users WHERE id = ?',
  [id]);
        return rows[0];
    } catch (error) {
        console.error(error)
    }
} 
module.exports = { findUserByEmail, insertUser, modifyDescription, findUserById, modifyMedia };