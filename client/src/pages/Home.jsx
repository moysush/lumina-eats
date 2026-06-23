import { Container, Title, Text, Button, Stack, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <Container py={100}>
      <Stack gap="xl">
        <Title fw={900}>
          Dinner, delivered in{" "}
          <Text span c="luminaYellow.6">
            minutes.
          </Text>
        </Title>
        <Text size="lg" c="dimmed" maw={600}>
          The best local restaurants, curated for your taste. Fresh, hot, and
          delivered directly to your door in Dhaka.
        </Text>
        <Group>
          <Button size="lg" onClick={() => navigate("/menu")}>
            Order now
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/menu")}>
            Browse Menu
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
