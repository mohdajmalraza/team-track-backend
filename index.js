const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect.js");
const {
  signupUser,
  loginUser,
  getUserDetails,
} = require("./controllers/auth.controller.js");
const { authMiddleware } = require("./middlewares/auth.middleware.js");

const app = express();
initializeDatabase();

// const corsOptions = {
//   origin: "*",
//   credentials: true,
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
// app.use(express.json());

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.post("/auth/signup", signupUser);
app.post("/auth/login", loginUser);
app.get("/auth/me", authMiddleware, getUserDetails);

app.get("/", (req, res) => {
  res.send({ status: "Ok", message: "TeamTrack backend is running." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
