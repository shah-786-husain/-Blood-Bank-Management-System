const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "1h",
    required: true, // Token will expire after 1 hour
  },
});
const Token = mongoose.model("tokens", tokenSchema);
module.exports = Token;
