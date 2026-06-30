const Team = require("../models/team.model.js");

const insertTeam = async (data) => {
  const team = await Team.create(data);

  return await team.populate("createdBy");
};

const findTeams = async () => {
  return await Team.find().populate("createdBy");
};

module.exports = { insertTeam, findTeams };
