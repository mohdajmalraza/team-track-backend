const mongoose = require("mongoose");

function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function validateTaskData(body) {
  if (!body || typeof body !== "object") {
    return "Request body is required";
  }

  const { name, project, team, owners, tags, timeToComplete, status } = body;

  if (!name || typeof name !== "string") {
    return "Name is required and must be a string";
  }

  if (!project || !validateObjectId(project)) {
    return "Project ID is required and must be valid";
  }

  if (!team || !validateObjectId(team)) {
    return "Team ID is required and must be valid";
  }

  if (!Array.isArray(owners) || owners.length === 0) {
    return "Owners are required and must be a non-empty array";
  }

  for (const ownerId of owners) {
    if (!validateObjectId(ownerId)) {
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

module.exports = { validateTaskData };
