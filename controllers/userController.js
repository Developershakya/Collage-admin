const userService = require("../services/userService");

const login = async (req, res) => {
  const { username, password } = req.body;
  const result = await userService.loginUser(username, password);
  if (result.error)
    return res.status(result.status).json({ message: result.error });

  return res
    .header("Authorization", `Bearer ${result.token}`)
    .status(200)
    .json({
      message: "Login successful",
      role: result.role,
      redirectTo: result.redirectTo,
      token: result.token,
    });
};

const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const result = await userService.registerUser(
    username,
    email,
    password,
    role
  );
  if (result.error)
    return res.status(result.status).json({ message: result.error });

  return res.status(201).json({
    token: result.token,
    role: result.role,
    message: "Registration successful",
  });
};

module.exports = { login, register };
