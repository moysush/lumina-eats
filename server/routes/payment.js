const express = require("express");
const md5 = require("md5");
const Order = require("../models/Order");

const router = express.Router();
const secret = "OTQ3NjM1Nzg5Mzk2ODExMjMzMDM0NjcwNjE3OTcyMjI0MjM4OTc2";
const merchantId = "1236490";

router.post("/hash", (req, res) => {
  try {
    const { order_id, amount, currency } = req.body;

    const formattedAmount = Number(amount).toFixed(2);

    const hashedSecret = md5(secret).toUpperCase();
    const hash = md5(
      merchantId + order_id + formattedAmount + currency + hashedSecret,
    ).toUpperCase();

    console.log("Generating Hash with values:", {
      merchantId,
      order_id,
      formattedAmount,
      currency,
      hash,
    });

    res.status(200).json({ hash });
  } catch (err) {
    console.error("Hash generation error:", err);
    res.status(500).json({ error: "Failed to generate hash" });
  }
});

router.post("/webhook", async (req, res) => {
  try {
    const {
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
    } = req.body;

    const hashedSecret = md5(secret).toUpperCase();

    const localSig = md5(
      merchant_id +
        order_id +
        payhere_amount +
        payhere_currency +
        status_code +
        hashedSecret,
    ).toUpperCase();

    if (localSig !== md5sig) {
      console.error("Payment signature mismatch!");
      return res.status(400).send("Invalid signature");
    }

    if (status_code === "2") {
      const updatedOrder = await Order.findByIdAndUpdate(
        order_id,
        {
          paymentStatus: "Paid",
          orderStatus: "Preparing",
        },
        { returnDocument: true },
      );
      console.log(updatedOrder);

      if (!updatedOrder) {
        console.error("Webhook verified, but order not found in database");
        return res.status(404).send("Order not found");
      }

      return res.status(200).send("Webhook processed successfully");
    } else {
      console.warn("Webhook signature mismatch or payment failed");
      return res.status(400).send("Invalid signature or payment failed");
    }
  } catch (err) {
    console.error("PayHere webhook error: ", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
