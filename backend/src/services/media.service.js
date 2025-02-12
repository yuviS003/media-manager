const prisma = require("../utils/prisma");

const saveMedia = async ({ userId, filePath, fileType, fileName }) => {
  return await prisma.media.create({
    data: {
      userId,
      filePath,
      fileType,
      fileName,
    },
  });
};

const getAllMediaForUser = async (userId) => {
  return await prisma.media.findMany({ where: { userId } });
};

const getMediaById = async (mediaId) => {
  return await prisma.media.findUnique({ where: { id: mediaId } });
};

const deleteMediaById = async (mediaId) => {
  return await prisma.media.delete({ where: { id: mediaId } });
};

module.exports = {
  saveMedia,
  getAllMediaForUser,
  getMediaById,
  deleteMediaById,
};
