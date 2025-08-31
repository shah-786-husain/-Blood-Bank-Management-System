const express = require("express");
const {
  createRequest,
  getRequests,
  getMyRequests,
  approveRequest,
  rejectRequest,
} = require("../controllers/requestController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

// Patient creates a request
router.post("/", auth, role(["patient"]), createRequest);

// Patient views own requests
router.get("/my", auth, role(["patient"]), getMyRequests);

// Admin views all requests
router.get("/", auth, role(["admin"]), getRequests);

// Admin approves/rejects
router.put("/:id/approve", auth, role(["admin"]), approveRequest);
router.put("/:id/reject", auth, role(["admin"]), rejectRequest);

module.exports = router;
