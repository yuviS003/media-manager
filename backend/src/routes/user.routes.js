const express = require("express");
const { signup, login, authorize } = require("../controllers/user.controller");
const authenticateJWT = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/authorize", authenticateJWT, authorize);

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
