function validateProjectData(body) {
  const { name, description, status } = body;

  if (!name || typeof name !== "string") {
    return "Name is required and must be a string";
  }

  if (description && typeof description !== "string") {
    return "Description must be a string";
  }

  if (status && !["In Progress", "Completed"].includes(status)) {
    return "Status must be In Progress or Completed";
  }

  return null;
}

module.exports = { validateProjectData };
