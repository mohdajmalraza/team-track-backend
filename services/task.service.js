const Project = require("../models/project.model.js");
const Task = require("../models/task.model.js");
const Team = require("../models/team.model.js");
const User = require("../models/user.model.js");

const SORT_MAP = {
  latest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  dueSoon: { dueDate: 1 },
  dueLate: { dueDate: -1 },
};

async function insertTask(data) {
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

  const task = await Task.create(data);

  await task.populate([
    { path: "project", select: "name" },
    { path: "team", select: "name" },
    { path: "owners", select: "name email" },
  ]);

  return task;
}

async function findTasks(query) {
  const filters = {};
  const { team, owner, tags, project, status, sort } = query;

  if (team) filters.team = team;
  if (project) filters.project = project;
  if (status) filters.status = status;
  if (owner) filters.owners = owner;

  if (tags) {
    const tagArray = tags.split(",").map((t) => t.trim());
    filters.tags = { $in: tagArray };
  }

  let tasks = Task.find(filters)
    .populate("project", "name")
    .populate("team", "name")
    .populate("owners", "name email");

  if (sort && SORT_MAP[sort]) {
    tasks = tasks.sort(SORT_MAP[sort]);
  }

  return await tasks;
}

async function findTaskById(id) {
  return await Task.findById(id)
    .populate("project", "name")
    .populate("team", "name")
    .populate("owners", "name email");
}

async function updateTaskStatusById(taskId, newStatus) {
  const task = await Task.findById(taskId)
    .populate("project", "name")
    .populate("team", "name")
    .populate("owners", "name email");

  if (!task) {
    return null;
  }

  const allowedTransitions = {
    "To Do": ["In Progress", "Blocked"],
    "In Progress": ["Completed", "Blocked"],
    Blocked: ["In Progress"],
    Completed: ["In Progress"], // Allow restart
  };

  if (!allowedTransitions[task.status]?.includes(newStatus)) {
    throw new Error(`Cannot change status from ${task.status} to ${newStatus}`);
  }

  task.status = newStatus;
  await task.save();

  return task;
}

module.exports = { insertTask, findTasks, findTaskById, updateTaskStatusById };
