import { useState } from 'react';
import { 
  Container, Title, Text, Button, Group, Stack, Paper, 
  Divider, Center 
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orders';

export function Cart() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [cart, setCart] = useLocalStorage({
    key: 'lumina-cart',
    defaultValue: []
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const removeFromCart = (foodId) => {
    setCart((currentCart) => currentCart.filter(item => item._id !== foodId));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);
    
    try {
      const orderPayload = {
        items: cart.map(item => ({
          foodItemId: item._id,
          quantity: item.quantity
        }))
      };

      const response = await createOrder(orderPayload);
      console.log("Order created:", response);
      
      setCart([]);
      
      // TODO: We will trigger the PayHere Sandbox redirect here in the next step
      alert("Order placed successfully! Redirecting to payment...");
      
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Group mb="xl">
        <Button 
          variant="subtle" 
          color="gray" 
          onClick={() => navigate('/menu')}
          px={0}
        >
          ← Back to Menu
        </Button>
      </Group>

      <Title order={2} mb="xl" c="lumina-yellow.6">Your Cart</Title>

      <Paper shadow="sm" radius="md" p="xl" withBorder>
        {cart.length === 0 ? (
          <Center h={200}>
            <Stack align="center">
              <Text c="dimmed" size="lg">Your cart is empty.</Text>
              <Button color="lumina-yellow" variant="outline" onClick={() => navigate('/menu')}>
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
                      {item.quantity} x ৳{item.price}
                    </Text>
                  </div>
                  
                  <Group gap="md">
                    <Text fw={700}>৳{item.price * item.quantity}</Text>
                    <Button 
                      color="red" 
                      variant="subtle" 
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
              <Text fw={700} size="xl">Total</Text>
              <Text fw={900} size="xl" c="lumina-yellow.6">৳{cartTotal}</Text>
            </Group>

            <Button 
              fullWidth 
              color="lumina-yellow" 
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
}