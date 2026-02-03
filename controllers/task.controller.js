const { createTask } = require("../services/task.service");
const { validateTaskData } = require("../validations/task.validation");

const addTask = async (req, res) => {
  const validationError = validateTaskData(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const { name, project, team, owners, tags, timeToComplete, status } =
      req.body;

    const task = await createTask({
      name,
      project,
      team,
      owners,
      tags,
      timeToComplete,
      status,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task: {
        id: task._id,
        name: task.name,
        project: task.project,
        team: task.team,
        owners: task.owners,
        tags: task.tags,
        timeToComplete: task.timeToComplete,
        status: task.status,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addTask };
