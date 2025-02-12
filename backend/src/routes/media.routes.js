const express = require("express");
const upload = require("../middlewares/uploadMulter");
const {
  uploadMedia,
  getAllMediaForUser,
  deleteMedia,
} = require("../controllers/media.controller");
const authenticateJWT = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:userId/user", authenticateJWT, getAllMediaForUser);
router.post("/upload", authenticateJWT, upload.single("media"), uploadMedia);
router.delete("/delete/:mediaId", authenticateJWT, deleteMedia);

module.exports = router;
