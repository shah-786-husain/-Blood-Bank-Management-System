const express = require("express");
const {
  addInventory,
  updateInventory,
  getInventory,
  getSingleInventory,
  deleteInventory,
} = require("../controllers/inventoryController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin adds or updates stock
router.post("/add", auth, role(["admin"]), addInventory);
router.put("/update", auth, role(["admin"]), updateInventory);

// View stock (all users)
router.get("/", auth, getInventory);
router.get("/:bloodGroup", auth, getSingleInventory);

// Delete stock (admin only)
router.delete("/:bloodGroup", auth, role(["admin"]), deleteInventory);

module.exports = router;
