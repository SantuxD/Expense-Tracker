const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const  upload  = require("../middleware/upload.middleware");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controller/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);


router.post("/uploadProfileImage", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const profileImageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    return res
      .status(200)
      .json({ message: "File uploaded successfully", profileImageUrl });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error uploading file: " + error.message });
  }
});

module.exports = router;
