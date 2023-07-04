const express = require("express");
const {
  signup,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
} = require("../../controllers/usersController");
const avatarUploadMiddleware = require("../../middlewares/avatarUploadMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, getCurrentUser);
router.patch("/avatars", authMiddleware, avatarUploadMiddleware, updateAvatar);

module.exports = router;
