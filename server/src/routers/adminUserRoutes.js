const express = require("express");
const verifyToken = require("../middleware/authMiddleware.js");
const { authorizeRoles } = require("../middleware/rolemiddleware.js");
const router = express.Router();
const User = require("../models/User.js");

// Admin routes
router.get("/all", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password -__v");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete user
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const deletedUser = await User.findbyIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

//Update user role
router.put(
  "/:id/role",
  verifyToken,
  authorizeRoles("admin"),
  async (req, res) => {
    const { role } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
module.exports = router;
