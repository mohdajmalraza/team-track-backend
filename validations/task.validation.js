const mongoose = require("mongoose");
const Project = require("../models/project.model.js");

const ALLOWED_STATUSES = ["To Do", "In Progress", "Completed", "Blocked"];
const ALLOWED_SORTS = [
  "dueDate_asc",
  "dueDate_desc",
  "priority_desc",
  "priority_asc",
];
const ALLOWED_PRIORITIES = ["High", "Medium", "Low"];

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function isProjectValid(id) {
  return await Project.findById(id);
}

function validateTaskData(body) {
  if (!body || typeof body !== "object") {
    return "Request body is required";
  }

  const {
    name,
    project,
    team,
    owners,
    tags,
    timeToComplete,
    priority,
    status,
    dueDate,
  } = body;

  if (!name || typeof name !== "string") {
    return "Name is required and must be a string";
  }

  if (!project || !isValidObjectId(project)) {
    return "Project ID is required and must be valid";
  }

  if (!team || !isValidObjectId(team)) {
    return "Team ID is required and must be valid";
  }

  if (!dueDate || typeof dueDate !== "string") {
    return "Due date is required and must be a string";
  }

  const parsedDate = new Date(dueDate);
  if (isNaN(parsedDate.getTime())) {
    return "Due date must be a valid date";
  }

  if (!Array.isArray(owners) || owners.length === 0) {
    return "Owners are required and must be a non-empty array";
  }

  for (const ownerId of owners) {
    if (!isValidObjectId(ownerId)) {
      return "Each owner ID must be valid";
    }
  }

  if (tags) {
    if (!Array.isArray(tags)) {
      return "Tags must be an array of strings";
    }

    for (const tag of tags) {
      if (typeof tag !== "string") {
        return "Each tag must be a string";
      }
    }
  }

  if (typeof timeToComplete !== "number" || timeToComplete <= 0) {
    return "Time to complete is required and must be a positive number";
  }

  if (status && !ALLOWED_STATUSES.includes(status)) {
    return `Status must be one of ${ALLOWED_STATUSES.join(", ")}`;
  }

  if (priority && !ALLOWED_PRIORITIES.includes(priority)) {
    return `Priority must be one of ${ALLOWED_PRIORITIES.join(", ")}`;
  }

  return null;
}

function validateTaskQuery(query) {
  if (!query || typeof query !== "object") {
    return "Invalid query parameters";
  }

  const { team, owner, tags, project, status, sort } = query;

  if (team && !isValidObjectId(team)) {
    return "Team must be a valid ID";
  }

  if (owner && !isValidObjectId(owner)) {
    return "Owner must be a valid ID";
  }

  if (project && !isValidObjectId(project)) {
    return "Project must be a valid ID";
  }

  const existProject = isProjectValid(project);
  if (!existProject) {
    return "Project not found";
  }

  if (status && !ALLOWED_STATUSES.includes(status)) {
    return `Status must be one of ${ALLOWED_STATUSES.join(", ")}`;
  }

  if (tags && typeof tags !== "string") {
    return "Tags must be a comma-separated string";
  }

  if (sort && !ALLOWED_SORTS.includes(sort)) {
    return `Sort must be one of ${ALLOWED_SORTS.join(", ")}`;
  }

  return null;
}

function validateTaskIdParam(params) {
  const { taskId } = params;

  if (!taskId || !isValidObjectId(taskId)) {
    return "Task Id is required and must be a valid ObjectId";
  }

  return null;
}

function validateUpdateTaskStatus(params, body) {
  const { taskId } = params;
  const { status } = body;

  if (!taskId || !isValidObjectId(taskId)) {
    return "Valid taskId is required";
  }

  if (!status || !ALLOWED_STATUSES.includes(status)) {
    return `Status must be one of ${ALLOWED_STATUSES.join(", ")}`;
  }

  return null;
}

function validateUpdateTask(params, body) {
  if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
    return "At least one field must be provided for update";
  }

  const { taskId } = params;

  if (!taskId || !isValidObjectId(taskId)) {
    return "Valid taskId is required";
  }

  const {
    name,
    project,
    team,
    owners,
    tags,
    timeToComplete,
    priority,
    status,
    dueDate,
  } = body;

  if (status !== undefined) {
    return "Task status must be updated using the status endpoint";
  }

  if (name !== undefined && typeof name !== "string") {
    return "Name must be a string";
  }

  if (project !== undefined && !isValidObjectId(project)) {
    return "ProjectID must be valid";
  }

  if (team !== undefined && !isValidObjectId(team)) {
    return "TeamID must be valid";
  }

  if (dueDate !== undefined) {
    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
      return "Due date must be a valid date";
    }
  }

  if (owners !== undefined) {
    if (!Array.isArray(owners) || owners.length === 0) {
      return "Owners must be a non-empty array";
    }

    for (const ownerId of owners) {
      if (!isValidObjectId(ownerId)) {
        return "Each owner ID must be valid";
      }
    }
  }

  if (tags !== undefined) {
    if (!Array.isArray(tags)) {
      return "Tags must be an array";
    }

    for (const tag of tags) {
      if (typeof tag !== "string") {
        return "Each tag must be a string";
      }
    }
  }

  if (timeToComplete !== undefined) {
    if (typeof timeToComplete !== "number" || timeToComplete <= 0) {
      return "Time to complete must be a positive number";
    }
  }

  if (priority !== undefined && !ALLOWED_PRIORITIES.includes(priority)) {
    return `Priority must be one of ${ALLOWED_PRIORITIES.join(", ")}`;
  }

  return null;
}

module.exports = {
  validateTaskData,
  validateTaskQuery,
  validateTaskIdParam,
  validateUpdateTaskStatus,
  validateUpdateTask,
};
