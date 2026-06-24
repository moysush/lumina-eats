import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Group,
  SimpleGrid,
  Image,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <Container size="lg">
      <SimpleGrid
        cols={{ base: 1, md: 2 }}
        spacing={60}
        verticalSpacing={60}
      >
        <Stack m="auto">
          <Title fw={700} size={45}>
            Dinner, delivered in{" "}
            <Text span c="luminaYellow.6" size="lg">
              minutes.
            </Text>
          </Title>
          <Text size="lg" c="dimmed">
            The best local restaurants, curated for your taste. Fresh, hot, and
            delivered directly to your door.
          </Text>
          <Button size="lg" onClick={() => navigate("/menu")}>
            Order now
          </Button>
        </Stack>

        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200"
          radius="md"
          alt="Delicious food"
        />
      </SimpleGrid>
    </Container>
  );
}
