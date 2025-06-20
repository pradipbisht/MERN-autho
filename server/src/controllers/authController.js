const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function register(req, res) {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: `User registered successfully ${username}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: `User not found: ${username}` });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, secret, {
      expiresIn: "24h",
    });

    // Prepare user data without password
    const { password: _, ...userWithoutPassword } = user._doc;

    // Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Login error:", err.message || err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout
const logout = (req, res) => {
  // If you're using cookies, clear them
  res.clearCookie("token"); // Optional if you're using cookies

  // If you're using localStorage/sessionStorage, the client will handle token removal
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { logout };

module.exports = {
  register,
  login,
  logout,
};
