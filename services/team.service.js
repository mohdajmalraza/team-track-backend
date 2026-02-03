const Team = require("../models/team.model.js");

const createTeam = async (data) => {
  return await Team.create(data);
};

const fetchTeams = async () => {
  return await Team.find();
};

module.exports = { createTeam, fetchTeams };
