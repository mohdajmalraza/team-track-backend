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
  addProject,
  getProjects,
} = require("./controllers/project.controller.js");
const { addTeam, getTeams } = require("./controllers/team.controller.js");
const { addTask } = require("./controllers/task.controller.js");

const app = express();
initializeDatabase();

app.use(
  cors({
    origin: "https://team-track-project.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());

app.post("/auth/signup", signupUser);
app.post("/auth/login", loginUser);
app.get("/auth/me", authMiddleware, getUserDetails);

app.post("/projects", authMiddleware, addProject);
app.get("/projects", authMiddleware, getProjects);

app.post("/teams", authMiddleware, addTeam);
app.get("/teams", authMiddleware, getTeams);

app.post("/tasks", authMiddleware, addTask);

app.get("/", (req, res) => {
  res.send({ status: "Ok", message: "TeamTrack backend is running." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
