const {
  insertTask,
  findTasks,
  findTaskById,
  updateTaskStatusById,
  updateTaskById,
} = require("../services/task.service");
const {
  validateTaskData,
  validateTaskQuery,
  validateTaskIdParam,
  validateUpdateTaskStatus,
  validateUpdateTask,
} = require("../validations/task.validation");
const { formatTask } = require("../mappers/task.mapper.js");

const createTask = async (req, res) => {
  const validationError = validateTaskData(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const {
      name,
      project,
      team,
      owners,
      tags,
      timeToComplete,
      status,
      priority,
      dueDate,
    } = req.body;

    const parsedDueDate = new Date(dueDate);

    const task = await insertTask({
      name,
      project,
      team,
      owners,
      tags,
      timeToComplete,
      status,
      priority,
      dueDate: parsedDueDate,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task: formatTask(task),
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTasks = async (req, res) => {
  const validationError = validateTaskQuery(req.query);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const tasks = await findTasks(req.query);

    if (!tasks.length) {
      return res.status(200).json({
        message: "No tasks found",
        tasks: [],
      });
    }

    const formattedTasks = tasks.map((task) => formatTask(task));

    return res
      .status(200)
      .json({ message: "Tasks fetched successfully", tasks: formattedTasks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTaskById = async (req, res) => {
  const validationError = validateTaskIdParam(req.params);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const { taskId } = req.params;

    const task = await findTaskById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task found successfully",
      task: formatTask(task),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTaskStatus = async (req, res) => {
  const validationError = validateUpdateTaskStatus(req.params, req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const updatedTask = await updateTaskStatusById(taskId, status);

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.status(200).json({
      message: `Task moved to ${updatedTask.status} successfully`,
      task: formatTask(updatedTask),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  const validationError = validateUpdateTask(req.params, req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const { taskId } = req.params;

    const updatedTask = await updateTaskById(taskId, req.body);

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: formatTask(updatedTask),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTaskStatus,
  updateTask,
};
