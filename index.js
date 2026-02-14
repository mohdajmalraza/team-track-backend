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
} = require("./controllers/project.controller.js");
const { createTeam, getTeams } = require("./controllers/team.controller.js");
const { createTask, getTasks } = require("./controllers/task.controller.js");
const { getUsers } = require("./controllers/user.controller.js");

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

app.post("/api/teams", authMiddleware, createTeam);
app.get("/api/teams", authMiddleware, getTeams);

app.post("/api/tasks", authMiddleware, createTask);
app.get("/api/tasks", authMiddleware, getTasks);

app.get("/", (req, res) => {
  res.send({ status: "Ok", message: "TeamTrack backend is running." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
