const activityModel = require("../models/activity.model")

const createActivity = async (name_activity, description, creator_id, cost_points) => {
    const newActivity = await activityModel.createActivity(name_activity, description, creator_id, cost_points);
    return newActivity;
}

const deleteActivity = async (id) => {
    const removedActivity = await activityModel.remove(id);
    return removedActivity;
}

const joinActivity = async (user_id, activity_id) => {
    const isUserJoined = await activityModel.isUserJoined(user_id, activity_id);
    if(isUserJoined) throw new Error("El usuario ya se encuentra registrado en la actividad");

    const joinedActivity = await activityModel.joinActivity(user_id, activity_id);
    return joinedActivity;
}

const getActivities = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return await activityModel.findAll(limit, offset);
};

const searchActivity = async (name_activity) => {
    const activity = await activityModel.findByName(name_activity);
    return activity;
}

module.exports = { createActivity, deleteActivity, joinActivity, getActivities, searchActivity }