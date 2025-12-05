const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "produtos",     // nome da pasta no Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"]
  }
});

const upload = multer({ storage });

module.exports = upload;