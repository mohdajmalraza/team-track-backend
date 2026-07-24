const User = require("../models/user.model");
const Task = require("../models/task.model");
const Team = require("../models/team.model");
const Project = require("../models/project.model");

async function findUsers() {
  return await User.find();
}

async function findUserById(userId) {
  return await User.findById(userId);
}

async function updateUser(userId, data) {
  return await User.findByIdAndUpdate(userId, data, {
    new: true,
  });
}

async function getAccountSummary(userId) {
  const [projectsCreated, teamsCreated, tasksAssigned, tasksCompleted, user] =
    await Promise.all([
      Project.countDocuments({ createdBy: userId }),
      Team.countDocuments({ createdBy: userId }),
      Task.countDocuments({ owners: userId }),
      Task.countDocuments({
        owners: userId,
        status: "Completed",
      }),
      User.findById(userId),
    ]);

  return {
    projectsCreated,
    teamsCreated,
    tasksAssigned,
    tasksCompleted,
    memberSince: user.createdAt,
  };
}

module.exports = {
  findUsers,
  findUserById,
  updateUser,
  getAccountSummary,
};
