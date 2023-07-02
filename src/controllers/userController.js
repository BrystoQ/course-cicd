const User = require("../models/User");

async function getUser(req, res) {
  try {
    const { userId } = req.user;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });
    res.render("profile", { user, body: "Profile content goes here" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user information" });
  }
}

module.exports = {
  getUser,
};
