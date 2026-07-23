const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect.js");
const {
  signupUser,
  loginUser,
  getUserDetails,
} = require("./controllers/auth.controller.js");
const { authMiddleware } = require("./middlewares/auth.middleware.js");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
} = require("./controllers/project.controller.js");
const {
  createTeam,
  getTeams,
  getTeamById,
} = require("./controllers/team.controller.js");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTaskStatus,
  updateTask,
} = require("./controllers/task.controller.js");
const { getUsers } = require("./controllers/user.controller.js");
const {
  getReportLastWeek,
  getReportPending,
  getReportClosedTasks,
} = require("./controllers/report.controller.js");

const app = express();
initializeDatabase();

app.use(
  cors({
    origin: "https://team-track-project.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());

app.post("/api/auth/signup", signupUser);
app.post("/api/auth/login", loginUser);
app.get("/api/auth/me", authMiddleware, getUserDetails);

app.get("/api/users", authMiddleware, getUsers);

app.post("/api/projects", authMiddleware, createProject);
app.get("/api/projects", authMiddleware, getProjects);
app.get("/api/projects/:projectId", authMiddleware, getProjectById);
app.patch("/api/projects/:projectId", authMiddleware, updateProject);

app.post("/api/teams", authMiddleware, createTeam);
app.get("/api/teams", authMiddleware, getTeams);
app.get("/api/teams/:teamId", authMiddleware, getTeamById);

app.post("/api/tasks", authMiddleware, createTask);
app.get("/api/tasks", authMiddleware, getTasks);
app.get("/api/tasks/:taskId", authMiddleware, getTaskById);
app.patch("/api/tasks/:taskId/status", authMiddleware, updateTaskStatus);
app.patch("/api/tasks/:taskId", authMiddleware, updateTask);

app.get("/api/report/last-week", authMiddleware, getReportLastWeek);
app.get("/api/report/pending", authMiddleware, getReportPending);
app.get("/api/report/closed-tasks", authMiddleware, getReportClosedTasks);

app.get("/", (req, res) => {
  res.send({ status: "Ok", message: "TeamTrack backend is running." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
