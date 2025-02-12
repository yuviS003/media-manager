const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const path = require("path");

const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./routes/user.routes");
const mediaRoutes = require("./routes/media.routes");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(cors());

app.use(express.json());

app.use("/api/auth/", userRoutes);
app.use("/api/media/", mediaRoutes);

app.use(errorHandler);

module.exports = app;
