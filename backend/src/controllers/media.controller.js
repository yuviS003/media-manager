const mediaService = require("../services/media.service");
const fs = require("fs");
const path = require("path");

const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const { userId, fileName } = req.body;
    const filePath = req.file.path;
    const fileType = req.file.mimetype;
    const media = await mediaService.saveMedia({
      userId,
      filePath,
      fileType,
      fileName,
    });

    res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

const getAllMediaForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });
    }
    const media = await mediaService.getAllMediaForUser(userId);
    res.status(200).json(media);
  } catch (error) {
    next(error);
  }
};

const deleteMedia = async (req, res, next) => {
  try {
    const { mediaId } = req.params;
    const media = await mediaService.getMediaById(mediaId);

    if (!media) {
      return res
        .status(404)
        .json({ success: false, message: "Media not found" });
    }

    const filePath = path.join(__dirname, "..", "..", media.filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      return res
        .status(404)
        .json({ success: false, message: "File not found on server" });
    }

    await mediaService.deleteMediaById(mediaId);

    res
      .status(200)
      .json({ success: true, message: "Media deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadMedia, getAllMediaForUser, deleteMedia };
