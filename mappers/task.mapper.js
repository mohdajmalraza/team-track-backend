function formatTask(task) {
  return {
    id: task._id,
    name: task.name,
    project: task.project
      ? { id: task.project._id, name: task.project.name }
      : null,
    team: task.team ? { id: task.team._id, name: task.team.name } : null,
    owners: task.owners?.map(({ _id, name, email }) => ({
      id: _id,
      name,
      email,
    })),
    tags: task.tags,
    dueDate: task.dueDate,
    timeToComplete: task.timeToComplete,
    status: task.status,
    priority: task.priority,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}

module.exports = { formatTask };
