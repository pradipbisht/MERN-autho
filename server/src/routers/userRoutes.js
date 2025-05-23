const express = require("express");
const verifyToken = require("../middleware/authMiddleware.js");
const { authorizeRoles } = require("../middleware/rolemiddleware.js");
const router = express.Router();

// admin  routes
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// admin manager users
router.get(
  "/manager",
  verifyToken,
  authorizeRoles("admin", "manager"),
  (req, res) => {
    res.json({ message: "Welcome Manager" });
  }
);

// admin manager users
router.get(
  "/users",
  verifyToken,
  authorizeRoles("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "Welcome User" });
  }
);

module.exports = router;
