const userService = require("../services/user.service");
const logger = require("../utils/logger");

const authorize = async (req, res) => {
  try {
    if (req.user) {
      res
        .status(200)
        .json({ success: true, user: req.user, message: "Authorized" });
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    logger.error(`Authorization error: ${error.message}`);
    res.status(401).json({ success: false, message: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const token = await userService.signup(username, email, password);

    res
      .status(201)
      .json({ success: true, message: "User created successfully", token });
  } catch (error) {
    logger.error(`Signup error: ${error.message}`);
    res.status(400).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await userService.login(email, password);

    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = { signup, login, authorize };
