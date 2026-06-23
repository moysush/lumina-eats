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
import { getFood } from "../services/food";
import { useDisclosure } from "@mantine/hooks";

const FoodMenu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  
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

  if (loading) {
    return (
      <Center h={400}>
        <Loader color="lumina-yellow" />
      </Center>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="xl" ta="center">
        Our Menu
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {foods.map((item) => (
          <Card key={item._id} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src={
                  item.imageUrl ||
                  "https://placehold.co/600x400?text=Food+Image"
                }
                height={160}
                alt={item.name}
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{item.name}</Text>
              <Badge variant="light">${item.price}</Badge>
            </Group>

            <Text size="sm" c="dimmed" lineClamp={3}>
              {item.description}
            </Text>

            <Button mt="md">Add to Cart</Button>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default FoodMenu;
