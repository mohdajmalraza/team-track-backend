const Team = require("../models/team.model.js");

const insertTeam = async (data) => {
  const team = await Team.create({
    ...data,
  });

  return await team.populate([
    { path: "createdBy" },
    { path: "members.user", select: "name email" },
  ]);
};

const findTeams = async () => {
  return await Team.find().populate([
    { path: "createdBy" },
    { path: "members.user", select: "name email" },
  ]);
};

const findTeamById = async (id) => {
  return await Team.findById(id).populate([
    { path: "createdBy" },
    { path: "members.user", select: "name email" },
  ]);
};

module.exports = { insertTeam, findTeams, findTeamById };
