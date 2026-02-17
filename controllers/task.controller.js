const {
  insertTask,
  findTasks,
  findTaskById,
  updateTaskStatusById,
} = require("../services/task.service");
const {
  validateTaskData,
  validateTaskQuery,
  validateTaskIdParam,
  validateUpdateTaskStatus,
} = require("../validations/task.validation");

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
      dueDate,
      status,
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
      task: {
        id: task._id,
        name: task.name,
        project: task.project
          ? { id: task.project._id, name: task.project.name }
          : null,
        team: task.team ? { id: task.team._id, name: task.team.name } : null,
        owners: task.owners?.map(({ _id, name, email }) => ({
          id: _id,
          name,
          email,
        })),
        tags: task.tags,
        dueDate: task.dueDate,
        timeToComplete: task.timeToComplete,
        status: task.status,
        priority: task.priority,
        updatedAt: task.updatedAt,
      },
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

    const formattedTasks = tasks.map((task) => ({
      id: task._id,
      name: task.name,
      project: task.project
        ? { id: task.project._id, name: task.project.name }
        : null,
      team: task.team ? { id: task.team._id, name: task.team.name } : null,
      owners: task.owners?.map(({ _id, name, email }) => ({
        id: _id,
        name,
        email,
      })),
      tags: task.tags,
      dueDate: task.dueDate,
      timeToComplete: task.timeToComplete,
      status: task.status,
      priority: task.priority,
      updatedAt: task.updatedAt,
    }));

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
      task: {
        id: task._id,
        name: task.name,
        project: task.project
          ? { id: task.project._id, name: task.project.name }
          : null,
        team: task.team ? { id: task.team._id, name: task.team.name } : null,
        owners: task.owners?.map(({ _id, name, email }) => ({
          id: _id,
          name,
          email,
        })),
        tags: task.tags,
        dueDate: task.dueDate,
        timeToComplete: task.timeToComplete,
        status: task.status,
        priority: task.priority,
        updatedAt: task.updatedAt,
      },
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
      task: {
        id: updatedTask._id,
        name: updatedTask.name,
        project: updatedTask.project
          ? { id: updatedTask.project._id, name: updatedTask.project.name }
          : null,
        team: updatedTask.team
          ? { id: updatedTask.team._id, name: updatedTask.team.name }
          : null,
        owners: updatedTask.owners?.map(({ _id, name, email }) => ({
          id: _id,
          name,
          email,
        })),
        tags: updatedTask.tags,
        dueDate: updatedTask.dueDate,
        timeToComplete: updatedTask.timeToComplete,
        status: updatedTask.status,
        priority: updatedTask.priority,
        updatedAt: updatedTask.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTaskStatus };
