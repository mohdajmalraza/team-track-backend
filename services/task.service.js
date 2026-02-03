const Task = require("../models/task.model.js");

async function createTask(data) {
  return await Task.create(data);
}

module.exports = { createTask };
