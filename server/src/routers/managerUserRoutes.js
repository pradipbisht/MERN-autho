const express = require("express");
const verifyToken = require("../middleware/authMiddleware.js");
const { authorizeRoles } = require("../middleware/rolemiddleware.js");
const User = require("../models/User.js");
const router = express.Router();

// Manager routes
router.get("/all", verifyToken, authorizeRoles("manager"), async (req, res) => {
  try {
    const users = await User.find().select("-password -__v");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
