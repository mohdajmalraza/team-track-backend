const User = require("../models/user.model.js");

async function findUsers() {
  return await User.find();
}

module.exports = { findUsers };
