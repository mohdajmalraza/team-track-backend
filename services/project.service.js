const Project = require("../models/project.model.js");

async function createProject(data) {
  return await Project.create(data);
}

async function fetchProjects() {
  return await Project.find();
}

module.exports = { createProject, fetchProjects };
