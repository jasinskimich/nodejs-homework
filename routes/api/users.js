const express = require("express");
const {
  signup,
  login,
  logout,
  getCurrentUser,
} = require("../../controllers/usersController");

const authMiddleware = require("../../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, getCurrentUser);

module.exports = router;
