const router = require('express').Router();
const forumController = require('../controllers/forum.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.get('/threads', forumController.getThreads);
router.get('/threads/search', forumController.searchThreads);
router.get('/threads/category', forumController.getThreadsByCategory);
router.get('/threads/:id', forumController.getThreadById);  

router.post('/threads', authMiddleware, forumController.createThread);
router.delete('/threads/:id', authMiddleware, forumController.deleteThread);
router.post('/threads/:id/comments', authMiddleware, forumController.createComment);
router.delete('/comments/:id', authMiddleware, forumController.deleteComment);

module.exports = router;