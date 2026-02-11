const ALLOWED_STATUS_FIELDS = ["In Progress", "Completed"];
const ALLOWED_SORT_FIELDS = ["createdAt", "name", "status"];

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

function validateProjectQuery(query) {
  const { status, search, sortBy, order, limit } = query;

  if (status && !ALLOWED_STATUS_FIELDS.includes(status)) {
    return `Invalid status field. Allowed: ${ALLOWED_STATUS_FIELDS.join(", ")}`;
  }

  if (search && typeof search !== "string") {
    return "Search must be a string";
  }

  if (sortBy && !ALLOWED_SORT_FIELDS.includes(sortBy)) {
    return `Invalid sortBy field. Allowed: ${ALLOWED_SORT_FIELDS.join(", ")}`;
  }

  if (order && !["asc", "desc"].includes(order.toLowerCase())) {
    return `Order must be 'asc' or 'desc'`;
  }

  if (limit) {
    let numLimit = Number(limit);
    if (!Number.isInteger(numLimit) || numLimit <= 0 || numLimit > 100) {
      return "Limit must be a positive integer between 1 and 100";
    }
  }

  return null;
}

module.exports = {
  validateProjectData,
  validateProjectQuery,
};
