function validateSignupData(body) {
  const { name, email, password } = body;

  if (!name || typeof name !== "string") {
    return "Name is required and must be a string";
  }

  if (!email || typeof email !== "string") {
    return "Email is required and must be valid";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "Email is not valid";
  }

  if (!password || typeof password !== "string") {
    return "Password is required and must be a string";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  return null;
}

function validateLoginData(body) {
  const { email, password } = body;

  if (!email) {
    return "Email is required and must be valid";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "Email is not valid";
  }

  if (!password || typeof password !== "string") {
    return "Password is required and must be a string";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  return null;
}

module.exports = { validateSignupData, validateLoginData };
