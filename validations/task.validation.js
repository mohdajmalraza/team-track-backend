const mongoose = require("mongoose");
const Project = require("../models/project.model.js");

const ALLOWED_STATUSES = ["To Do", "In Progress", "Completed", "Blocked"];

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

  const { name, project, team, owners, tags, timeToComplete, status, dueDate } =
    body;

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

  if (
    status &&
    !["To Do", "In Progress", "Completed", "Blocked"].includes(status)
  ) {
    return 'Status must be one of ["To Do", "In Progress", "Completed", "Blocked"]';
  }

  return null;
}

function validateTaskQuery(query) {
  if (!query || typeof query !== "object") {
    return "Invalid query parameters";
  }

  const { team, owner, tags, project, status } = query;

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

  return null;
}

module.exports = { validateTaskData, validateTaskQuery };
