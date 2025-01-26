const cloudinary = require("cloudinary").v2;
const multer = require("multer");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage configuration
const storage = new multer.memoryStorage();

async function imageUploadUtil(fileBuffer, mimeType) {
  const base64File = `data:${mimeType};base64,${fileBuffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(base64File, {
    resource_type: "auto", // Automatically detects the resource type
  });

  return result;
}

// Multer middleware for file uploads
const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
