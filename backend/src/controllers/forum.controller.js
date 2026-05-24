const forumService = require('../services/forum.service');

const getThreads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const threads = await forumService.getThreads(page, limit);
    res.status(200).json(threads);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

const getThreadById = async (req, res) => {
  try {
    const { id } = req.params;
    const thread = await forumService.getThreadById(id);
    res.status(200).json(thread);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const thread = await forumService.getThreadById(id);
    res.status(200).json(thread.comments); // devuelve solo el árbol de comentarios
  } catch (error) { res.status(400).json({ error: error.message }); }
};

const createThread = async (req, res) => {
  try {
    const { category, title, body, media } = req.body;
    const author_id = req.user.id;
    const newThread = await forumService.createThread(category, title, body, author_id, media);
    res.status(201).json(newThread);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

const deleteThread = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    await forumService.deleteThread(id, userId);
    res.status(200).json({ message: 'Hilo eliminado' });
  } catch (error) { res.status(400).json({ error: error.message }); }
};

const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, parent_id, media } = req.body;
    const authorId = req.user.id;
    const comment = await forumService.createComment(authorId, id, body, parent_id, media);
    res.status(201).json(comment);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await forumService.deleteComment(id);
    res.status(200).json({ message: 'Comentario eliminado' });
  } catch (error) { res.status(400).json({ error: error.message }); }
};

const getThreadsByCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { category } = req.query;
    const threads = await forumService.getThreadsByCategory(category, page, limit);
    res.status(200).json(threads);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

const searchThreads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { title } = req.query;
    const threads = await forumService.searchThreads(title, page, limit);
    res.status(200).json(threads);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

module.exports = { getThreads, getThreadById, getComments, createThread, deleteThread, createComment, deleteComment, getThreadsByCategory, searchThreads };