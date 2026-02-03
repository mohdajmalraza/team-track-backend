const Project = require("../models/project.model.js");

async function createProject(data) {
  return Project.create(data);
}

async function fetchProjects() {
  return Project.find();
}

module.exports = { createProject, fetchProjects };
