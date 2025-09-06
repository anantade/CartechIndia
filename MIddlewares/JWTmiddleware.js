

const jwt = require("jsonwebtoken");
const JWT_SECRET = "g7vbj^*&^*&^24gfoiwrbgG";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Expected format: Bearer <token>
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET); // keep secret in .env
    req.user = decoded; // attach decoded payload to req for later use

    next(); // proceed
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;