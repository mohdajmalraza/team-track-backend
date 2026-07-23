const Task = require("../models/task.model.js");

async function findCompletedTasksLastWeek() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return await Task.find({
    status: "Completed",
    updatedAt: { $gte: oneWeekAgo },
  })
    .populate("project", "name")
    .populate("team", "name")
    .populate("owners", "name email");
}

async function calculatePendingWorkDays() {
  const pendingTasks = await Task.find({
    status: { $ne: "Completed" },
  }).populate("project", "name");

  const pendingByProject = {};

  let totalPendingDays = 0;

  pendingTasks.forEach((task) => {
    const projectName = task.project?.name || "Unknown Project";

    pendingByProject[projectName] =
      (pendingByProject[projectName] || 0) + task.timeToComplete;

    totalPendingDays += task.timeToComplete;
  });

  return {
    totalPendingDays,

    pendingByProject: Object.entries(pendingByProject).map(
      ([project, pendingDays]) => ({
        project,
        pendingDays,
      }),
    ),
  };
}

async function groupClosedTasksByEntity() {
  const completedTasks = await Task.find({ status: "Completed" })
    .populate("project", "name")
    .populate("team", "name")
    .populate("owners", "name email");

  const closedByTeam = completedTasks.reduce((acc, task) => {
    const teamName = task.team?.name || "Unknown Team";
    acc[teamName] = (acc[teamName] || 0) + 1;
    return acc;
  }, {});

  const closedByProject = completedTasks.reduce((acc, task) => {
    const projectName = task.project?.name || "Unknown Project";
    acc[projectName] = (acc[projectName] || 0) + 1;
    return acc;
  }, {});

  const closedByOwner = completedTasks.reduce((acc, task) => {
    task.owners.forEach((owner) => {
      const ownerName = owner?.name || "Unknown Owner";
      acc[ownerName] = (acc[ownerName] || 0) + 1;
    });
    return acc;
  }, {});

  return {
    closedTasksByTeam: Object.entries(closedByTeam).map(([team, count]) => ({
      team,
      closedTasks: count,
    })),
    closedTasksByProject: Object.entries(closedByProject).map(
      ([project, count]) => ({ project, closedTasks: count }),
    ),
    closedTasksByOwner: Object.entries(closedByOwner).map(([owner, count]) => ({
      owner,
      closedTasks: count,
    })),
    totalClosedTasks: completedTasks.length,
  };
}

module.exports = {
  findCompletedTasksLastWeek,
  calculatePendingWorkDays,
  groupClosedTasksByEntity,
};
