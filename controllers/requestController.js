const BloodRequest = require("../models/BloodRequest");
const User = require("../models/User");

// 🩸 Create a new blood request (Patient only)
exports.createRequest = async (req, res) => {
  try {
    const { bloodGroup, quantity } = req.body;

    if (!bloodGroup || !quantity) {
      return res
        .status(400)
        .json({ message: "Blood group and quantity are required" });
    }

    const newRequest = await BloodRequest.create({
      patient: req.user.id,
      bloodGroup,
      quantity,
    });

    res.status(201).json({
      message: "Blood request submitted successfully",
      request: newRequest,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🩸 Get all blood requests (Admin only)
exports.getRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().populate(
      "patient",
      "name email bloodGroup contact"
    );

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🩸 Get logged-in patient’s own requests
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ patient: req.user.id });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🩸 Approve a request (Admin only)
exports.approveRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "approved";
    await request.save();

    res.json({ message: "Request approved successfully", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🩸 Reject a request (Admin only)
exports.rejectRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "rejected";
    await request.save();

    res.json({ message: "Request rejected successfully", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
