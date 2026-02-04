const Task = require("../models/task.model.js");

async function createTask(data) {
  return await Task.create(data);
}

async function fetchTasks(query) {
  const filters = {};
  const { team, owner, tags, project, status } = query;

  if (team) filters.team = team;
  if (project) filters.project = project;
  if (status) filters.status = status;
  if (owner) filters.owners = owner;

  if (tags) {
    const tagArray = tags.split(",").map((t) => t.trim());
    filters.tags = { $in: tagArray };
  }

  return await Task.find(filters)
    .populate("project", "name")
    .populate("team", "name")
    .populate("owners", "name email")
    .lean();
}

module.exports = { createTask, fetchTasks };
