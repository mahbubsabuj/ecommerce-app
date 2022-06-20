const express = require("express");
const router = express.Router();
const { OrderItem } = require("../models/orderItem");
const { Order } = require("../models/order");

router.get("/", async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .populate({ path: "orderItems", populate: "product" })
    .sort({ dateOrdered: -1 });
  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    });
  if (!order) {
    res.status(500).json({ success: false, message: "" });
  }
  res.status(200).send(order);
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
  const prices = await Promise.all(
    resolvedOrderItemIds.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product"
      );
      console.log(orderItem);
      return orderItem.quantity * orderItem.product.price;
    })
  );
  const price = prices.reduce((res, current) => res + current, 0);
  let order = new Order({
    orderItems: resolvedOrderItemIds,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice: price,
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

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  const order = await Order.findByIdAndUpdate(
    id,
    {
      status: status,
    },
    { new: true }
  );
  if (!order) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(200).send(order);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  const deletedOrderItemsIds = Promise.all(
    order.orderItems.map(async (orderItemId) => {
      const deletedOrderItem = await OrderItem.findByIdAndDelete(orderItemId);
      return deletedOrderItem.id;
    })
  );
  const deletedOrderItemsIdsResolved = await deletedOrderItemsIds;
  if (!deletedOrderItemsIdsResolved) {
    return res
      .status(500)
      .json({ success: false, message: "orderitems cannot be deleted" });
  }
  const deletedOrder = await Order.findByIdAndDelete(id);
  if (!deletedOrder) {
    return res
      .status(500)
      .json({ success: false, message: "order cannot be deleted!" });
  }
  return res
    .status(200)
    .json({ success: true, message: "order successfully deleted " });
});

router.get("/get/userorders/:userId", async (req, res) => {
  const id = req.params.userId;
  const userOrderList = await Order.find({user: id})
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    })
    .sort({ dateOrdered: -1 });
  if (!userOrderList) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).send(userOrderList);
});


module.exports = router;
