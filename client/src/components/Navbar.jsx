import {
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { useNavigate, useLocation } from "react-router-dom";

const links = [
  { link: "/menu", label: "Menu" },
  { link: "/cart", label: "Cart" },
  { link: "/logout", label: "Logout" },
];

const Navbar = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useLocalStorage({
    key: "user",
    defaultValue: null,
  });
  const [cart] = useLocalStorage({
    key: "lumina-cart",
    defaultValue: [],
  });

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredLinks = !user
    ? [
        { link: "/login", label: "Login" },
        { link: "/register", label: "Register" },
      ]
    : links;

  const items = filteredLinks.map((link) => {
    const isActive = location.pathname.includes(link.link);

    return (
      <Button
        key={link.label}
        onClick={() => {
          navigate(link.link);
          close();
        }}
        fw={500}
        variant={isActive ? "light" : "subtle"}
      >
        {link.label}
        {link.link === "/cart" && cartItemCount > 0 ? `(${cartItemCount})` : ""}
      </Button>
    );
  });

  return (
    <header style={{ borderBottom: "1px solid" }}>
      <Container
        size="lg"
        h={60}
        display="flex"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Text
          fw={900}
          size="xl"
          c="luminaYellow.6"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          LuminaEats
        </Text>

        <Group gap={10} visibleFrom="xs">
          <Text c="luminaYellow.3">
            {user ? `Welcome back, ${user.name.split(" ")[0]}!` : null}
          </Text>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="xs"
          size="sm"
          aria-label="Toggle navigation"
        />
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="sm"
        padding="md"
        title={<Text fw={700}>Navigation</Text>}
        hiddenFrom="xs"
        zIndex={1000000}
      >
        <Stack gap="sm" mt="md">
          {items}
        </Stack>
      </Drawer>
    </header>
  );
};

export default Navbar;
