const activityService = require('../services/activity.service');

const createActivity = async (req, res) => {
    try {
        const { name_activity, description, cost_points } = req.body;
        const userId = req.user.id
        const newActivity = await activityService.createActivity(name_activity, description,userId, cost_points);
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const removedActivity = await activityService.deleteActivity(id);
        res.status(200).json(removedActivity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const joinActivity = async (req, res) => {
    try {
        const userId = req.user.id
        const { activity_id } = req.body;
        const joinedActivity = await activityService.joinActivity(userId, activity_id);
        res.status(200).json(joinedActivity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllActivities = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const activities = await activityService.getActivities(page, limit);
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const searchActivity = async (req, res) => {
    try {
        const { name_activity } = req.query;
        const activity = await activityService.searchActivity(name_activity);
        res.status(200).json(activity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createActivity, deleteActivity, joinActivity, getAllActivities, searchActivity };
