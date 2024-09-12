const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    console.log(authHeader);
    return res.status(403).json({
      message: "Token is Missing",
    });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded.userId);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({
      message: error,
    });
  }
};

module.exports = authMiddleware;
