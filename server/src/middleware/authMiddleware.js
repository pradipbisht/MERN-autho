const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  // Correct header name is 'authorization' (case-insensitive)
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(decoded);
      next();
    } catch (error) {
      res.status(401).json({ message: "Token is not valid" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

module.exports = verifyToken;
