const express = require("express");
const {
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
  deleteUser,
} = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

// Logged-in user routes
router.get("/me", auth, getProfile);
router.put("/me", auth, updateProfile);

// Admin routes
router.get("/", auth, role(["admin"]), getAllUsers);
router.get("/:id", auth, role(["admin"]), getUserById);
router.delete("/:id", auth, role(["admin"]), deleteUser);

module.exports = router;
