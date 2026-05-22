const db = require('../config/db');

//crear hilo
const createThread = async (category, title, body, author_id, media) => {
    try {
        const [result] = await db.query(
            'INSERT INTO threads (category, title, body, author_id, media, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
            [category, title, body, author_id, media]
        );
        return { id: result.insertId, category, title, body, author_id, media };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//eliminar hilo
const deleteThread = async (id) => {
    try {
        await db.query('DELETE FROM comments WHERE thread_id = ?', [id]);
        await db.query('DELETE FROM threads WHERE id = ?', [id]);
        return { message: "Hilo eliminado" };
    } catch (error) {
        console.error(error);
    }
}

//obtener hilos por categoria
const findByCategory = async (category, limit, offset) => {
  try {
    const [rows] = await db.query(
      `SELECT t.*, u.name as author_name
       FROM threads t
       JOIN users u ON t.author_id = u.id
       WHERE t.category = ?
       ORDER BY t.created_at DESC
       LIMIT ? OFFSET ?`,
      [category, limit, offset]
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//obtener hilos
const findAllThreads = async (limit, offset) => {
    try {
        const [rows] = await db.query(
            `SELECT t.*, u.name as author_name
             FROM threads t
             JOIN users u ON t.author_id = u.id
             ORDER BY t.created_at DESC
             LIMIT ? OFFSET ?`,
            [limit, offset]
        );
        return rows;
    } catch (error) {
        console.error(error);
    }
}

//encontrar por titulo
const findByTitle = async (title, limit, offset) => {
  try {
    const [rows] = await db.query(
      `SELECT t.*, u.name as author_name
       FROM threads t
       JOIN users u ON t.author_id = u.id
       WHERE t.title LIKE ?
       ORDER BY t.created_at DESC
       LIMIT ? OFFSET ?`,
      [`%${title}%`, limit, offset]
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//encontrar hilo por id
const findById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM threads WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error(error);
    }
}

module.exports = { createThread, findAllThreads, findById, deleteThread, findByCategory, findByTitle };