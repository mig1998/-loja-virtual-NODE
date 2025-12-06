const multer = require("multer");
const path = require("path");

// Armazena a imagem temporariamente no servidor
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads/"); // pasta temporária
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;