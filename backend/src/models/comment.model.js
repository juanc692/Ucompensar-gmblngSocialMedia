const db = require('../config/db');

const findLastByThread = async (threadId) => {
  try {
    const [rows] = await db.query(
      `SELECT c.*, u.name as author_name
       FROM comments c
       JOIN users u ON c.author_id = u.id
       WHERE c.thread_id = ?
       ORDER BY c.created_at DESC
       LIMIT 1`,
      [threadId]
    );
    return rows;
  } catch (error) { console.error(error); throw error; }
};

const findAllByThread = async (threadId) => {
  try {
    const [rows] = await db.query(
      `SELECT c.*, u.name as author_name
       FROM comments c
       JOIN users u ON c.author_id = u.id
       WHERE c.thread_id = ?
       ORDER BY c.created_at ASC`,
      [threadId]
    );
    return rows;
  } catch (error) { console.error(error); throw error; }
};

const createComment = async (authorId, threadId, body, parentId = null, media = null) => {
  try {
    const [result] = await db.query(
      `INSERT INTO comments (thread_id, author_id, body, parent_id, media, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [threadId, authorId, body, parentId, media]
    );
    return { id: result.insertId, authorId, threadId, body };
  } catch (error) { console.error(error); throw error; }
};

const deleteComment = async (id) => {
  try {
    await db.query('DELETE FROM comments WHERE parent_id = ?', [id]);
    await db.query('DELETE FROM comments WHERE id = ?', [id]);
    return { message: 'Comentario eliminado' };
  } catch (error) { console.error(error); throw error; }
};

module.exports = { createComment, findAllByThread, findLastByThread, deleteComment };