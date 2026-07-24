const bcrypt = require("bcrypt");
const {
  findUsers,
  findUserById,
  updateUser,
  getAccountSummary,
} = require("../services/user.service");

const {
  validateProfileData,
  validatePasswordData,
} = require("../validations/user.validation");

const getUsers = async (req, res) => {
  try {
    const users = await findUsers();

    if (!users.length) {
      return res
        .status(200)
        .json({ message: "Users fetched successfully", users: [] });
    }

    const formattedUsers = users.map(({ _id, name, email }) => ({
      id: _id,
      name,
      email,
    }));

    return res
      .status(200)
      .json({ message: "Users fetched successfully", users: formattedUsers });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const error = validateProfileData(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const user = await updateUser(req.user.id, {
      name: req.body.name.trim(),
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const error = validatePasswordData(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const { currentPassword, newPassword } = req.body;

    const user = await findUserById(req.user.id);

    const matched = await bcrypt.compare(currentPassword, user.password);

    if (!matched) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updateUser(req.user.id, {
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const accountSummary = async (req, res) => {
  try {
    const summary = await getAccountSummary(req.user.id);

    return res.status(200).json(summary);
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getUsers,
  updateUserProfile,
  changePassword,
  accountSummary,
};
