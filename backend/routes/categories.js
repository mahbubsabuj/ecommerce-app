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



router.post("/", async (req, res) => {
  const { name, icon, color } = req.body;
  let category = new Category({ name, icon, color });
  category = await category.save();

  if (!category) {
    return res.send(404).json({ error: "the category cannot be created!" });
  }
  res.send(category);
});
module.exports = router;
