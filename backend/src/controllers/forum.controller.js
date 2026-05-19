const forumService = require('../services/forum.service');

//obtener hilos
const getThreads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const threads = await forumService.getThreads(page, limit);
    res.status(201).json(threads);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//obtener hilo por el id
const getThreadById = async (req, res) => {
  try {
    const { id } = req.params;
    const thread = await forumService.getThreadById(id);
    res.status(201).json(thread);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//crear Hilo
const createThread = async (req, res) => {
  try {
    const { category, title, body, media } = req.body;
    const author_id = req.user.id;
    const newThread = await forumService.createThread(category, title, body, author_id, media);
    res.status(201).json(newThread);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//eliminar Hilo
const deleteThread = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    await forumService.deleteThread(id, userId);
    res.status(201).json({ message: 'Hilo eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//crear comentario
const createComment = async (req, res) => {
  try {
    const { id } = req.params;  // thread_id viene de la URL
    const { body, parent_id, media } = req.body;
    const authorId = req.user.id;
    const comment = await forumService.createComment(authorId, id, body, parent_id, media);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//eliminar comentario
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await forumService.deleteComment(id);
    res.status(201).json({ message: 'Comentario eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//buscar hilo por categoria 
const getThreadsByCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { category } = req.query;
    const threads = await forumService.getThreadsByCategory(category, page, limit);
    res.status(201).json(threads);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//buscar hilo por nombre 
const searchThreads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { title } = req.query;
    const threads = await forumService.searchThreads(title, page, limit);
    res.status(201).json(threads);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getThreads, getThreadById, createThread, deleteThread, createComment, deleteComment, getThreadsByCategory, searchThreads };