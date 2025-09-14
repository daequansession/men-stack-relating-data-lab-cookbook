// controllers/foods.js

const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// router logic will go here - will be built later on in the lab
router.get("/", (req, res) => {
  res.render("foods/index.ejs");
});

router.get("/", (req, res) => {
  res.render("new.ejs");
});
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.sesion.user._id);
    res.render("foods/index.ejs", {
      pantry: currentUser.pantry,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect(`/user/${currentUser._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }

  router.delete("/:itemId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.usedr._id);
      currentUser.pantry.id(req.params.itemId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  });

  router.get("/:itemId/edit", async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.usedr._id);
      const foodToEdit = currentUser.pantry.id(req.params.itemId);
      res.render("foods/edit.ejs", {
        food: foodToEdit,
      });
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  });

  router.put("/:itemId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const foodToUpdate = currentUser.pantry.id(req.params.itemId);
      foodToUpdate.set(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  });
});
module.exports = router;
