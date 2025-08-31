const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bloodGroup: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BloodRequest", requestSchema);
