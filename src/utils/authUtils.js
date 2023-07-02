const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

function authenticateToken(req, res, next) {
  const token = req.session.token;
  if (!token) {
    return res.redirect("/auth/login");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.redirect("/auth/login");
    }
    req.user = user;
    next();
  });
}

module.exports = {
  generateToken,
  authenticateToken,
};
