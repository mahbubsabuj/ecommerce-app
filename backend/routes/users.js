const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("dotenv/config");
const salt = process.env.SALT;

router.get("/", async (req, res) => {
  const userList = await User.find().select('-passwordHash');

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select('-passwordHash');
  if (!user) {
    res
      .status(404)
      .json({
        success: false,
        message: "user does not exist in the database. ",
      });
  }
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const {
    name,
    email,
    password,
    street,
    apartment,
    city,
    zip,
    country,
    phone,
    isAdmin,
  } = req.body;
  let user = new User({
    name,
    email,
    passwordHash: bcrypt.hashSync(password, +salt),
    street,
    apartment,
    city,
    zip,
    country,
    phone,
    isAdmin,
  });
  user = await user.save();
  if (!user) {
    res
      .status(400)
      .json({ success: false, message: "the user cannot be created!" });
  }
  res.send(user);
});

module.exports = router;
