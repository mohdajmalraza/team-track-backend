function validateTeamData(body) {
  const { name, description } = body;

  if (!name || typeof name !== "string") {
    return "Name is required and must be a string";
  }

  if (description && typeof description !== "string") {
    return "Description must be a string";
  }

  return null;
}

module.exports = { validateTeamData };
