require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const errorHandler = require("./utils/errorHandler");
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));

app.get("/", (req, res) => {
  res.send("Welcome to the User Management API");
});
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
  console.log(`Server running on port ${PORT}`);
});
