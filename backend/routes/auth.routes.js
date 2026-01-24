const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controller/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);


module.exports = router;
