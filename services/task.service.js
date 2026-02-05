const Project = require("../models/project.model.js");
const Task = require("../models/task.model.js");
const Team = require("../models/team.model.js");
const User = require("../models/user.model.js");

async function createTask(data) {
  const { project, team, owners } = data;

  const [projectExists, teamExists, ownersExist] = await Promise.all([
    Project.exists({ _id: project }),
    Team.exists({ _id: team }),
    User.countDocuments({ _id: { $in: owners } }),
  ]);

  if (!projectExists) {
    throw { statusCode: 404, message: "Project not found" };
  }

  if (!teamExists) {
    throw { statusCode: 404, message: "Team not found" };
  }

  if (ownersExist !== owners.length) {
    throw { statusCode: 404, message: "One or more owners not found" };
  }

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
