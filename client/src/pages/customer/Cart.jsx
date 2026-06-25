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
import { createOrder } from "../../services/orders";
import { generatePaymentHash } from "../../services/payment";
import { notifications } from "@mantine/notifications";

const Cart = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const merchantId = import.meta.env.VITE_PAYHERE_MERCHANT_ID;
  const notifyUrl = import.meta.env.VITE_PAYHERE_NOTIFY_URL;
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
    const itemToRemove = cart.find((item) => item._id === foodId);

    setCart((currentCart) => currentCart.filter((item) => item._id !== foodId));

    notifications.show({
      title: "Removed",
      message: `${itemToRemove?.name} removed from cart.`,
      color: "red",
    });
  };

  const handleCheckout = async () => {
    if (!user) {
      notifications.show({
        title: "Action Required",
        message: "Please log in to checkout.",
        color: "orange",
      });
      return;
    }

    if (cart.length === 0) return;
    setIsSubmitting(true);

    try {
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
        notifications.show({
          title: "Payment Successful",
          message: "Your order has been placed successfully!",
          color: "green",
        });
        navigate("/menu");
      };
      window.payhere.onDismissed = () =>
        notifications.show({
          title: "Payment Cancelled",
          message: "You cancelled the payment process.",
          color: "yellow",
        });
      window.payhere.onError = (error) =>
        notifications.show({
          title: "Payment Failed",
          message: "Something went wrong with the payment: " + error,
          color: "red",
        });

      window.payhere.startPayment({
        sandbox: true,
        merchant_id: merchantId,
        return_url: "",
        cancel_url: "",
        notify_url: notifyUrl,
        order_id: dbOrder._id,
        items: "LuminaEats Order",
        amount: cartTotal.toFixed(2),
        currency: "USD",
        hash: generatedHash,
        first_name: user?.name,
        last_name: "",
        email: user?.email,
        phone: user?.phone,
        address: "",
        city: "",
        country: "",
      });
    } catch (error) {
      notifications.show({
        title: "Order Failed",
        message: "Could not initiate order. Please try again.",
        color: "red",
      });
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
