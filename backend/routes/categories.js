const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    res.status(500).json({
      success: false,
      message: "The category with given ID not found!",
    });
  }
  res.status(200).send(category);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, icon, color } = req.body;
  const category = await Category.findByIdAndUpdate(
    id,
    { name, icon, color },
    { new: true }
  );
  if (!category) {
    res
      .status(400)
      .json({
        success: false,
        message: "The category with given ID cannot be updated!",
      });
  }
  res.status(201).send(category);
});

router.post("/", async (req, res) => {
  const { name, icon, color } = req.body;
  let category = new Category({ name, icon, color });
  category = await category.save();

  if (!category) {
    return res.status(404).json({ error: "the category cannot be created!" });
  }
  res.status(200).send(category);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Category.findByIdAndDelete(id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found!" });
      }
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
});

module.exports = router;
