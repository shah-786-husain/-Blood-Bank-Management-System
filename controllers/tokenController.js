const Token = require("../models/Token");
router.post("/token", async (req, res) => {
  const token = req.body.token;
  try {
    const tokenData = await Token.findOne({ token });
    if (!tokenData) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res
        .status(200)
        .json({ message: "User found Successfully", user: tokenData });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = { router };
