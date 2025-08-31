require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "xyza";

//http://localhost:4000/api/auth/register
register = async (req, res) => {
  try {
    const { name, email, password, role, bloodGroup, contact } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      bloodGroup,
      contact,
    });
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//http://localhost:4000/api/auth/login
login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { register, login };
