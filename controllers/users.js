// controllers/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// Get all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.render("users/index.ejs", {
      users: allUsers,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// Show a specific user's pantry
router.get("/:userId", async (req, res) => {
  try {
    const userToShow = await User.findById(req.params.userId);
    res.render("users/show.ejs", {
      user: userToShow,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

module.exports = router;
