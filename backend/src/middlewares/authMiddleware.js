const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticateJWT = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found." });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err?.message || "Invalid or expired token.",
    });
  }
};

module.exports = authenticateJWT;
