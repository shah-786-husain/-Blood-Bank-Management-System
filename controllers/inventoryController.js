const Inventory = require("../models/Inventory");

// 🩸 Add blood stock (Admin only)
exports.addInventory = async (req, res) => {
  try {
    const { bloodGroup, units } = req.body;

    if (!bloodGroup || !units) {
      return res
        .status(400)
        .json({ message: "Blood group and units are required" });
    }

    // Check if blood group already exists in stock
    let inventory = await Inventory.findOne({ bloodGroup });

    if (inventory) {
      inventory.units += units; // update stock
    } else {
      inventory = new Inventory({ bloodGroup, units });
    }

    await inventory.save();

    res.status(201).json({
      message: "Blood stock updated successfully",
      inventory,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🩸 Update blood stock manually (Admin only)
exports.updateInventory = async (req, res) => {
  try {
    const { bloodGroup, units } = req.body;

    let inventory = await Inventory.findOne({ bloodGroup });
    if (!inventory) {
      return res
        .status(404)
        .json({ message: "Blood group not found in inventory" });
    }

    inventory.units = units; // overwrite with new value
    await inventory.save();

    res.json({ message: "Inventory updated successfully", inventory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🩸 Get all blood stock (All users can view)
exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🩸 Get single blood group stock (All users can view)
exports.getSingleInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      bloodGroup: req.params.bloodGroup,
    });
    if (!inventory) {
      return res
        .status(404)
        .json({ message: "Blood group not found in stock" });
    }
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🩸 Delete blood group from inventory (Admin only)
exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findOneAndDelete({
      bloodGroup: req.params.bloodGroup,
    });
    if (!inventory) {
      return res
        .status(404)
        .json({ message: "Blood group not found in stock" });
    }
    res.json({ message: "Blood group removed from inventory", inventory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
