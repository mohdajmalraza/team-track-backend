const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");

const SALT_ROUNDS = 10;

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

async function createUser({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return await User.create({ name, email, password: hashedPassword });
}

module.exports = { findUserByEmail, createUser };
