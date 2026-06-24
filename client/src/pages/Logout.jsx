import {
  Alert,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@mantine/hooks";

const Logout = () => {
  const [, , removeUser] = useLocalStorage({
    key: "user",
    defaultValue: null,
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    removeUser();
    navigate("/");
  };
  return (
    <Container size="xs">
      <Paper shadow="sm" radius="md" p="xl" withBorder>
        <Text>Are you sure you want to logout?</Text>
        <Group justify="right" mt={15}>
          <Button onClick={handleLogout} variant="subtle" w={100}>
            Yes
          </Button>
          <Button onClick={() => navigate("/")} variant="light">
            Go Home
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default Logout;
