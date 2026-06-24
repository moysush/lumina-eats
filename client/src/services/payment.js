import api from "./api";

export const generatePaymentHash = async (
  orderId,
  amount,
  currency = "USD",
) => {
  try {
    const res = await api.post("/payment/hash", {
      order_id: orderId,
      amount: amount,
      currency: currency,
    });

    console.log(res.data.hash);
    return res.data.hash;
  } catch (error) {
    console.error("Payment Service Error: ", err);
    throw error;
  }
};
