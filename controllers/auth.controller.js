const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  validateSignupData,
  validateLoginData,
} = require("../validations/auth.validation.js");
const { findUserByEmail, createUser } = require("../services/auth.service.js");

async function signupUser(req, res) {
  try {
    const validationError = validateSignupData(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "An account with this email already exists" });
    }

    await createUser({ name, email, password });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const validationError = validateLoginData(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email or password are not correct" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({ message: "Login successfull", token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { signupUser, loginUser };
