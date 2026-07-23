const {
  findCompletedTasksLastWeek,
  calculatePendingWorkDays,
  groupClosedTasksByEntity,
} = require("../services/report.service.js");
const { formatTask } = require("../mappers/task.mapper.js");

const getReportLastWeek = async (req, res) => {
  try {
    const tasks = await findCompletedTasksLastWeek();
    const formattedTasks = tasks.map((task) => formatTask(task));

    return res.status(200).json({
      message: "Completed tasks from the last week fetched successfully",
      totalCompletedTasks: formattedTasks.length,
      tasks: formattedTasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getReportPending = async (req, res) => {
  try {
    const pendingReport = await calculatePendingWorkDays();

    res.json(pendingReport);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getReportClosedTasks = async (req, res) => {
  try {
    const closedTasksReport = await groupClosedTasksByEntity();

    return res.status(200).json({
      message: "Closed task breakdown fetched successfully",
      report: closedTasksReport,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getReportLastWeek,
  getReportPending,
  getReportClosedTasks,
};
