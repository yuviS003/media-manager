const multer = require("multer");
const path = require("path");

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store files in 'uploads/' directory
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Rename the file to avoid name conflicts
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Save with unique name
  },
});

// File filter to allow only certain file types (image/video)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images and videos are allowed!"), false);
  }
};

// Create the multer middleware for handling the upload
const upload = multer({ storage, fileFilter });

module.exports = upload;
