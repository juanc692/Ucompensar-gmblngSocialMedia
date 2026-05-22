const db = require('../config/db');

const findUserByEmail = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    } catch (error) { console.error(error); }
};

const insertUser = async (name, email, hashedPassword) => {
    try {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        return { id: result.insertId, name, email };
    } catch (error) { console.error(error); }
};

const modifyDescription = async (description, id) => {
    try {
        const [result] = await db.query('UPDATE users SET description = ? WHERE id = ?', [description, id]);
        return result;
    } catch (error) { console.error(error); }
};

const modifyMedia = async (media, id) => {
    try {
        const [result] = await db.query('UPDATE users SET photo_profile = ? WHERE id = ?', [media, id]);
        return result;
    } catch (error) { console.error(error); throw error; }
};

const findUserById = async (id) => {
    try {
        const [rows] = await db.query(
            'SELECT id, name, email, description, photo_profile, points FROM users WHERE id = ?', [id]
        );
        return rows[0];
    } catch (error) { console.error(error); }
};

const getTopUsers = async (limit = 6) => {
    try {
        const [rows] = await db.query(
            'SELECT id, name, points FROM users ORDER BY points DESC LIMIT ?', [limit]
        );
        return rows;
    } catch (error) { console.error(error); }
};

const addPoints = async (id, points) => {
    try {
        const [result] = await db.query(
            'UPDATE users SET points = points + ? WHERE id = ?', [points, id]
        );
        // Devuelve los puntos actualizados
        const [rows] = await db.query('SELECT points FROM users WHERE id = ?', [id]);
        return { points: rows[0].points };
    } catch (error) { console.error(error); throw error; }
};

module.exports = { findUserByEmail, insertUser, modifyDescription, findUserById, modifyMedia, getTopUsers, addPoints };