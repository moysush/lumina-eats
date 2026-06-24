import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Paper,
  Divider,
  Center,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/orders";
import { generatePaymentHash } from "../services/payment";

const Cart = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const merchantId = import.meta.env.VITE_PAYHERE_MERCHANT_ID;
  const [user] = useLocalStorage({
    key: "user",
    defaultValue: null,
  });

  const [cart, setCart] = useLocalStorage({
    key: "lumina-cart",
    defaultValue: [],
  });

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const removeFromCart = (foodId) => {
    setCart((currentCart) => currentCart.filter((item) => item._id !== foodId));
  };

  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in to checkout!");
      return;
    }

    if (cart.length === 0) return;
    setIsSubmitting(true);

    try {
      // 1. Save to database
      const dbOrder = await createOrder({
        items: cart.map((item) => ({
          foodItemId: item._id,
          quantity: item.quantity,
        })),
      });

      const generatedHash = await generatePaymentHash(
        dbOrder._id,
        cartTotal,
        "USD",
      );

      window.payhere.onCompleted = () => {
        setCart([]);
        navigate("/menu");
      };
      window.payhere.onDismissed = () => alert("Payment cancelled.");
      window.payhere.onError = (error) => alert("Payment failed: " + error);

      window.payhere.startPayment({
        sandbox: true,
        merchant_id: merchantId,
        return_url: "http://localhost:5173/menu",
        cancel_url: "http://localhost:5173/cart",
        notify_url:
          "https://prorate-pluck-moonwalk.ngrok-free.dev/api/payment/webhook",
        order_id: dbOrder._id,
        items: "LuminaEats Order",
        amount: cartTotal.toFixed(2),
        currency: "USD",
        hash: generatedHash,
        first_name: user.name,
        last_name: "",
        email: user.email,
        phone: user.phone,
        address: "",
        city: "",
        country: "",
      });
    } catch (error) {
      alert("Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container size={"sm"}>
      <Group mb="xl">
        <Button variant="subtle" onClick={() => navigate("/menu")} p={5}>
          ← Back to Menu
        </Button>
      </Group>

      <Title order={2} mb="xl" c="luminaYellow.6">
        Your Cart
      </Title>

      <Paper shadow="sm" radius="md" p="xl" withBorder>
        {cart.length === 0 ? (
          <Center h={200}>
            <Stack align="center">
              <Text c="dimmed" size="lg">
                Your cart is empty.
              </Text>
              <Button variant="outline" onClick={() => navigate("/menu")}>
                Browse Food
              </Button>
            </Stack>
          </Center>
        ) : (
          <>
            <Stack gap="md">
              {cart.map((item) => (
                <Group key={item._id} justify="space-between" wrap="nowrap">
                  <div style={{ flex: 1 }}>
                    <Text fw={500}>{item.name}</Text>
                    <Text size="sm" c="dimmed">
                      {item.quantity} x ${item.price}
                    </Text>
                  </div>

                  <Group gap="md">
                    <Text fw={700}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    <Button
                      color="red"
                      variant="light"
                      size="xs"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </Button>
                  </Group>
                </Group>
              ))}
            </Stack>

            <Divider my="lg" />

            <Group justify="space-between" mb="xl">
              <Text fw={700} size="xl">
                Total
              </Text>
              <Text fw={900} size="xl" c="luminaYellow.6">
                ${cartTotal.toFixed(2)}
              </Text>
            </Group>

            <Button
              fullWidth
              size="lg"
              loading={isSubmitting}
              onClick={handleCheckout}
            >
              Checkout & Pay
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Cart;
