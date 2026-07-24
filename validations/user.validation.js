function validateProfileData(data) {
  const { name } = data;

  if (!name || !name.trim()) {
    return "Name is required.";
  }

  return null;
}

function validatePasswordData(data) {
  const { currentPassword, newPassword } = data;

  if (!currentPassword || !newPassword) {
    return "Current password and new password are required.";
  }

  if (newPassword.length < 6) {
    return "New password must be at least 6 characters.";
  }

  return null;
}

module.exports = {
  validateProfileData,
  validatePasswordData,
};
