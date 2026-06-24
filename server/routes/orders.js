const express = require("express");
const FoodItem = require("../models/FoodItem");
const Order = require("../models/Order");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Customer functions
// receive only items from the client
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order cannot be empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (let item of items) {
      const food = await FoodItem.findById(item.foodItemId);
      if (!food || !food.isAvailable) {
        return res
          .status(400)
          .json({ message: "Item is unavailable or does not exist" });
      }

      orderItems.push({
        foodItem: food._id,
        quantity: item.quantity,
        price: food.price,
      });

      totalAmount += food.price * item.quantity;
    }

    const newOrder = new Order({
      customer: req.user.id,
      items: orderItems,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Order creation error: ", err);
    res.status(500).json({ message: "Server error while creating order" });
  }
});

// todo: implement a my-orders in the client side
router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id }).populate(
      "items.foodItem",
      "name imageUrl",
    );

    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders: ", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin functions
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.foodItem", "name price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching all orders: ", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { returnDocument: true, runValidators: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (err) {
    console.error("Error updating order: ", err);
    res.status(500).json({ message: "Server error updating order" });
  }
});

module.exports = router;
