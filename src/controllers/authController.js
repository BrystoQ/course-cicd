const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateToken } = require("../utils/authUtils");

async function getLoginPage(req, res) {
  const user = req.user;
  res.render("login", { user, body: null });
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = generateToken(user.id);
    req.session.token = token;
    res.redirect("/user");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
}

async function getRegisterPage(req, res) {
  const user = req.user;
  res.render("register", { user, body: null });
}

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.sync({ force: true });
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.redirect("/auth/login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while registering" });
  }
}

function logout(req, res) {
  req.session.destroy();
  res.redirect("/auth/login");
}

module.exports = {
  getLoginPage,
  login,
  getRegisterPage,
  register,
  logout,
};
