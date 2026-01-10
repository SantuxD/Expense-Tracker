const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/jpg") || file.mimetype.startsWith("image/png") || file.mimetype.startsWith("image/jpeg")) {
    cb(null, true);
    } else {
    cb(new Error("only .jpg, .png,and .jpeg files are allowed"), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
