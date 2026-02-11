const Project = require("../models/project.model.js");

async function createProject(data) {
  return await Project.create(data);
}

async function fetchProjects(query = {}) {
  const { status, sortBy, order, limit } = query;
  const filters = {};

  if (status) filters.status = status;

  let projects = Project.find(filters);

  if (sortBy) {
    const sortOrder = order === "asc" ? 1 : -1;
    projects = projects.sort({ [sortBy]: sortOrder });
  }

  if (limit) {
    projects = projects.limit(Number(limit));
  }

  return await projects;
}

module.exports = { createProject, fetchProjects };
