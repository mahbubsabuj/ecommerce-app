const express = require("express");
const router = express.Router();
const { OrderItem } = require("../models/orderItem");
const { Order } = require("../models/order");

router.get("/", async (req, res) => {
  const orderList = await Order.find().populate('user', 'name');
  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

router.post("/", async (req, res) => {
  const {
    orderItems,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user,
    dateOrdered,
  } = req.body;
  const orderItemIds = Promise.all(
    orderItems.map(async (orderItem) => {
      const { product, quantity } = orderItem;
      let newOrderItem = new OrderItem({ product, quantity });
      newOrderItem = await newOrderItem.save();
      return newOrderItem.id;
    })
  );
  const resolvedOrderItemIds = await orderItemIds;
  let order = new Order({
    orderItems: resolvedOrderItemIds,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user,
    dateOrdered,
  });
  order = await order.save();
  if (!order) {
    return res
      .status(500)
      .json({ success: false, message: "the order cannot be created!" });
  }
  return res.status(201).json({
    success: true,
    message: "order created successfully",
    order: order,
  });
});

// orderItems: [
//   { type: mongoose.Schema.Types.ObjectId, ref: "OrderItem", required: true },
// ],
// shippingAddress1: { type: String, required: true },
// shippingAddress2: { type: String },
// city: { type: String, required: true },
// zip: { type: String, required: true },
// country: { type: String, required: true },
// phone: { type: String, required: true },
// status: { type: String, required: true, default: "Pending" },
// totalPrice: { type: Number },
// user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// dateOrdered: { type: Date, default: Date.now },

module.exports = router;
