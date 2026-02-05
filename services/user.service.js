const User = require("../models/user.model.js");

async function fetchUsers() {
  return await User.find();
}

module.exports = { fetchUsers };
