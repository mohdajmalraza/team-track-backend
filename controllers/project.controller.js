const { createProject, fetchProjects } = require("../services/project.service");
const {
  validateProjectData,
  validateProjectQuery,
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
    const { status, sortBy, order, limit } = req.query;

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

module.exports = { addProject, getProjects };
