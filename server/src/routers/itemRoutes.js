const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/ItemController.js");
const verifyToken = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/rolemiddleware.js");
const upload = require("../middleware/uploads.js");

// ✅ Public Routes
router.get("/", ItemController.getItems); // Get all items
router.get("/:id", ItemController.getItem); // Get single item by ID

// ✅ Protected Routes
router.post(
  "/",
  verifyToken,
  upload.array("image", 5),
  ItemController.createItem
); // Create (any logged-in user)

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "manager"),
  ItemController.updateItem
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "manager"),
  ItemController.deleteItem
);

module.exports = router;
