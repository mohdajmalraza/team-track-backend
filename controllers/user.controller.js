const { fetchUsers } = require("../services/user.service");

const getUsers = async (req, res) => {
  try {
    const users = await fetchUsers();

    if (!users.length) {
      return res
        .status(200)
        .json({ message: "Users fetched successfully", users: [] });
    }

    const formattedUsers = users.map(({ _id, name }) => ({ id: _id, name }));

    return res
      .status(200)
      .json({ message: "Users fetched successfully", users: formattedUsers });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getUsers };
