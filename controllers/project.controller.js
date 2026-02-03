const { createProject, fetchProjects } = require("../services/project.service");
const { validateProjectData } = require("../validations/project.validation");

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
        id: project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await fetchProjects();

    if (projects.length === 0) {
      return res.status(404).json({ error: "No project found" });
    }

    const formattedProjects = projects.map((project) => ({
      id: project.id,
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
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { addProject, getProjects };
