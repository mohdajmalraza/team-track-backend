const mongoose = require("mongoose");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function validateTeamData(body) {
  const { name, description, members } = body;

  if (!name || typeof name !== "string") {
    return "Name is required and must be a string";
  }

  if (description && typeof description !== "string") {
    return "Description must be a string";
  }

  if (members !== undefined) {
    if (!Array.isArray(members)) {
      return "Members must be an array";
    }

    for (const member of members) {
      if (!member || !isValidObjectId(member)) {
        return "Each member must be a valid user ID";
      }
    }
  }

  return null;
}

function validateTeamIdParam(params) {
  const { teamId } = params;

  if (!teamId || !isValidObjectId(teamId)) {
    return "Team Id is required and must be a valid ObjectId";
  }

  return null;
}

module.exports = { validateTeamData, validateTeamIdParam };
