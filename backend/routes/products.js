const { Product } = require("../models/product");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const IMAGE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = IMAGE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileExtention = IMAGE_TYPE_MAP[file.mimetype];
    const fileName = file.originalname
      .replace(" ", "")
      .replace("." + fileExtention, "");
    cb(null, fileName + "-" + Date.now() + "." + fileExtention);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const productList = await Product.find(filter).populate("category");
  if (!productList) {
    res.status(500).json({ success: false, message: "" });
  }
  res.send(productList);
});

router.get("/get/featured/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const productList = await Product.find({ isFeatured: true }).limit(+count);
  if (!productList) {
    res.status(500).json({ success: false, message: "" });
  }
  res.send(productList);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id).populate("category");

  if (!product) {
    res
      .status(404)
      .json({ success: false, message: "product with this ID not found!" });
  }
  res.send(product);
});

router.post("/", upload.single("image"), async (req, res) => {
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  const fileName = req.file.filename;
  const {
    name,
    description,
    richDescription,
    images,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
    dateCreated,
  } = req.body;
  const cat = await Category.findById(category);
  if (!cat) {
    res.status(400).json({ success: false, message: "Invalid category!" });
  }
  const file = req.file;
  if (!file) {
    return res.status(400).send("No image in the request");
  }
  let product = new Product({
    name,
    description,
    richDescription,
    image: basePath + fileName,
    images,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
    dateCreated,
  });
  product = await product.save();
  if (!product) {
    res
      .status(500)
      .json({ success: false, message: "The product cannot be created" });
  }
  res.status(200).send(product);
});

router.put("/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ success: false, message: "Invalid product id!" });
  }
  const {
    name,
    description,
    richDescription,
    images,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  } = req.body;
  const cat = await Category.findById(category);
  if (!cat) {
    res.status(400).json({ success: false, message: "Invalid category!" });
  }
  const file = req.file;
  if (!file) {
    return res.status(400).send("No image in the request");
  }
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  const fileName = req.file.filename;
  const product = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      richDescription,
      image: basePath + fileName,
      images,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    },
    { new: true }
  );
  if (!product) {
    res.status(500).json({
      success: false,
      message: "proudct with given ID cannot be updated!",
    });
  }
  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ success: false, message: "Invalid product id!" });
  }
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    res.status(404).json({
      success: false,
      message: "The product with given id cannot be deleted!",
    });
  }
  res
    .status(200)
    .json({ success: true, message: "product deleted successfully" });
});

router.get("/get/count", async (req, res) => {
  const productCount = await Product.countDocuments();
  if (!productCount) {
    res.status(500).json({ success: false, message: "" });
  }
  res.status(200).json({ productCount: productCount });
});

module.exports = router;
