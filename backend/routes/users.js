const { User } = require("../models/user");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = process.env.SALT;

router.get("/", async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false, message: "" });
  }
  res.send(userList);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select("-passwordHash");
  if (!user) {
    res.status(404).json({
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
  } else {
    res.status(200).send(user);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const userPrev = await User.findById(id);
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
  const user = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      passwordHash: password
        ? bcrypt.hashSync(password, +salt)
        : userPrev.passwordHash,
      street,
      apartment,
      city,
      zip,
      country,
      phone,
      isAdmin,
    },
    { new: true }
  );
  if (!user) {
    res
      .status(400)
      .json({ success: false, message: "the user cannot be updated!" });
  } else {
    res.status(200).send(user);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(400).json({ success: false, message: "The user not found!" });
  }
  console.log(email, password);
  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
    res.status(200).json({
      success: true,
      message: "User is authenticated",
      user: user.email,
      token: token,
    });
  } else {
    res.status(400).json({ success: false, message: "The password is wrong!" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ success: false, message: "Invalid user id!" });
  }
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    res.status(404).json({
      success: false,
      message: "The user with given id cannot be deleted!",
    });
  }
  res.status(200).json({ success: true, message: "user deleted successfully" });
});

router.get("/get/count", async (req, res) => {
  const userCount = await User.countDocuments();
  if (!userCount) {
    res.status(500).json({ success: false, message: "" });
  }
  res.status(200).json({ success: true, userCount: userCount });
});

module.exports = router;
