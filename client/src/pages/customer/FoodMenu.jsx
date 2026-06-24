import { useState, useEffect } from "react";
import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Loader,
  Center,
} from "@mantine/core";
import { getFood } from "../../services/food";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

const FoodMenu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useLocalStorage({
    key: "user",
    defaultValue: null,
  });
  const [cart, setCart] = useLocalStorage({
    key: "lumina-cart",
    defaultValue: [],
  });

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getFood();
        setFoods(data);
      } catch (error) {
        console.error("Failed to load menu", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleAddToCart = (foodItem) => {
    if (!user) {
      notifications.show({
        title: "Action Required",
        message: "Please log in to add items to your cart.",
        color: "orange",
      });
      return;
    }

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item._id === foodItem._id,
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item._id === foodItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { ...foodItem, quantity: 1 }];
    });

    notifications.show({
      title: "Added to Cart",
      message: `${foodItem.name} has been added.`,
      color: "green",
    });
  };

  if (loading) {
    return (
      <Center h={400}>
        <Loader color="lumina-yellow" />
      </Center>
    );
  }

  return (
    <Container>
      <Title order={1} mb="xl" ta="center">
        Our Menu
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {foods.map((item) => (
          <Card
            key={item._id}
            h="100%"
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Image
                src={
                  item.imageUrl ||
                  `https://placehold.co/600x400?text=${encodeURIComponent(item.name)}`
                }
                height={160}
                alt={item.name}
              />
            </Card.Section>

            <Group mt="md" mb="xs" align="baseline">
              <Text fw={500} flex={1}>
                {item.name}
              </Text>
              <Badge variant="light">${item.price}</Badge>
            </Group>

            <Text size="sm" c="dimmed" lineClamp={3} mb="md">
              {item.description}
            </Text>

            {item.isAvailable ? (
              <Button mt="auto" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </Button>
            ) : (
              <Button mt="auto" color="red" variant="light" disabled>
                Out of Stock
              </Button>
            )}
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default FoodMenu;
