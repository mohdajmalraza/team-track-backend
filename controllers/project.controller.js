const {
  createProject,
  fetchProjects,
  fetchProjectById,
  fetchProjectTasks,
} = require("../services/project.service");
const {
  validateProjectData,
  validateProjectQuery,
  validateProjectById,
} = require("../validations/project.validation");

const addProject = async (req, res) => {
  const validationError = validateProjectData(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const { name, description, status } = req.body;

    const project = await createProject({ name, description, status });

    return res.status(201).json({
      message: "Project created successfully",
      project: {
        id: project._id,
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt,
      },
    });
  } catch (error) {
    console.log(error.message);

    // handle duplicate project name error
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Project with this name already exists",
      });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProjects = async (req, res) => {
  const validationError = validateProjectQuery(req.query);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const projects = await fetchProjects(req.query);

    if (!projects.length) {
      return res.status(200).json({
        message: "No projects found",
        projects: [],
      });
    }

    const formattedProjects = projects.map((project) => ({
      id: project._id,
      name: project.name,
      description: project.description,
      status: project.status,
      createdAt: project.createdAt,
    }));

    return res.status(200).json({
      message: "Projects fetched successfully",
      projects: formattedProjects,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProjectById = async (req, res) => {
  const validationError = validateProjectById(req.params);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const { projectId } = req.params;

    const project = await fetchProjectById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      message: "Project found successfully",
      project: {
        id: project._id,
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProjectTasks = async (req, res) => {
  const validationError = validateProjectById(req.params);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const { projectId } = req.params;

    const tasks = await fetchProjectTasks(projectId);

    if (!tasks.length) {
      return res
        .status(200)
        .json({ message: "Tasks fetched successfully", tasks: [] });
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
        dueDate,
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
        dueDate,
        timeToComplete,
        status,
        updatedAt,
      }),
    );

    return res
      .status(200)
      .json({ message: "Tasks fetched successfully", tasks: formattedTasks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addProject, getProjects, getProjectById, getProjectTasks };
