const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const User = require("../models/User.models");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.post(
  "/uploadProfileImage",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const profileImageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;

      const user = await User.findById(req.user.id);
      user.profileImageUrl = profileImageUrl;
      await user.save();

      return res
        .status(200)
        .json({
          message: "File uploaded successfully",
          profileImageUrl,
          user,
          token: req.token,
        });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error uploading file: " + error.message });
    }
  },
);

module.exports = router;
