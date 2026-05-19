const router = require('express').Router();
const activityController = require('../controllers/activity.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/createActivity',authMiddleware, activityController.createActivity);
router.delete('/deleteActivity/:id',authMiddleware, activityController.deleteActivity);
router.post('/joinActivity',authMiddleware, activityController.joinActivity);
router.get('/allActivities', activityController.getAllActivities);
router.get('/searchActivity', activityController.searchActivity);

module.exports = router;