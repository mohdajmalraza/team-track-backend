const Team = require("../models/team.model.js");

const insertTeam = async (data) => {
  return await Team.create(data);
};

const findTeams = async () => {
  return await Team.find();
};

module.exports = { insertTeam, findTeams };
