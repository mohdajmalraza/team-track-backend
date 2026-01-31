const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect.js");
const { signupUser, loginUser } = require("./controllers/auth.controller.js");

const app = express();
initializeDatabase();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.post("/auth/signup", signupUser);
app.post("/auth/login", loginUser);

app.get("/", (req, res) => {
  res.send({ status: "Ok", message: "TeamTrack backend is running." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
