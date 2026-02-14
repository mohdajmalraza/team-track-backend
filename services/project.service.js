const Project = require("../models/project.model.js");
const { escapeRegex } = require("../utils/utility.js");

async function insertProject(data) {
  return await Project.create(data);
}

async function findProjects(query = {}) {
  const { status, search, sortBy, order = "desc", limit } = query;
  const filters = {};

  if (status) filters.status = status;

  if (search) {
    const escapedSearch = escapeRegex(search);
    filters.name = { $regex: escapedSearch, $options: "i" };
  }

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

async function findProjectById(id) {
  return await Project.findById(id);
}

module.exports = {
  insertProject,
  findProjects,
  findProjectById,
};
