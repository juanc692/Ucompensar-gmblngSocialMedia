const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/:id', userController.getUserById);

router.patch('/update/description', authMiddleware, userController.modifyDescription);
router.patch('/update/media', authMiddleware, userController.updateMedia);

module.exports = router;