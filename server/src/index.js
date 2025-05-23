const express = require("express");
// const dotenv = require("dotenv").config();
const dbConnect = require("./config/db.js");
const authRoutes = require("./routers/authRoutes.js");
const userRoutes = require("./routers/userRoutes.js");
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

// start server
const PORT = process.env.PORT || 6002;
app.listen(PORT, () => {
  console.log(`Server is Running at port ${PORT}`);
});
