const { insertTeam, findTeams } = require("../services/team.service");
const { validateTeamData } = require("../validations/team.validation.js");

const createTeam = async (req, res) => {
  const validationError = validateTeamData(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const { name, description } = req.body;

    const team = await insertTeam({ name, description });

    return res.status(201).json({
      message: "Team created successfully",
      team: {
        id: team._id,
        name: team.name,
        description: team.description,
      },
    });
  } catch (error) {
    console.log(error.message);

    // handle duplicate team name error
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Team with this name already exists",
      });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

const getTeams = async (req, res) => {
  try {
    const teams = await findTeams();

    if (!teams.length) {
      return res.status(200).json({
        message: "No teams found",
        teams: [],
      });
    }

    const formattedTeams = teams.map((team) => ({
      id: team._id,
      name: team.name,
      description: team.description,
    }));

    return res
      .status(200)
      .json({ message: "Teams fetched successfully", teams: formattedTeams });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createTeam, getTeams };
