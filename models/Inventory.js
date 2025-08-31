const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  bloodGroup: { type: String, required: true },
  units: { type: Number, required: true },
});

module.exports = mongoose.model("Inventory", inventorySchema);
