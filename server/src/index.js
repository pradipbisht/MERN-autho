const express = require("express");
const dbConnect = require("./config/db.js");
const authRoutes = require("./routers/authRoutes.js");
const userRoutes = require("./routers/userRoutes.js");
const adminUserRoutes = require("./routers/adminUserRoutes.js");
const managerUserRoutes = require("./routers/managerUserRoutes.js");
const itemsRoutes = require("./routers/itemRoutes.js");

const cors = require("cors");
require("dotenv").config();

dbConnect();

const app = express();
app.use(cors());

// middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/manager/users", managerUserRoutes);
app.use("/api/items", itemsRoutes);
app.use("/uploads", express.static("uploads")); // Serve images publicly

// start server
const PORT = process.env.PORT || 6002;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
