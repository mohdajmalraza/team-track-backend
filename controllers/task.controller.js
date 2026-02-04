const { createTask, fetchTasks } = require("../services/task.service");
const {
  validateTaskData,
  validateTaskQuery,
} = require("../validations/task.validation");

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
        updatedAt: task.updatedAt,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTasks = async (req, res) => {
  const validationError = validateTaskQuery(req.query);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const tasks = await fetchTasks(req.query);

    if (!tasks.length) {
      return res.status(200).json({
        message: "No tasks found",
        tasks: [],
      });
    }

    const formattedTasks = tasks.map(
      ({
        _id,
        name,
        project,
        team,
        owners,
        tags,
        timeToComplete,
        status,
        updatedAt,
      }) => ({
        id: _id,
        name,
        project: project ? { id: project._id, name: project.name } : null,
        team: team ? { id: team._id, name: team.name } : null,
        owners: owners?.map(({ _id, name, email }) => ({
          id: _id,
          name,
          email,
        })),
        tags,
        timeToComplete,
        status,
        updatedAt,
      }),
    );

    return res
      .status(200)
      .json({ message: "Tasks fetched successfully", tasks: formattedTasks });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addTask, getTasks };
