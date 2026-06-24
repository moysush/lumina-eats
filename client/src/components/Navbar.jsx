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
import { logout } from "../services/auth";
import { notifications } from "@mantine/notifications";

const Navbar = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, , removeUser] = useLocalStorage({
    key: "user",
    defaultValue: null,
  });
  const [cart, , removeCart] = useLocalStorage({
    key: "lumina-cart",
    defaultValue: [],
  });

  const handleLogout = () => {
    logout();
    removeUser();
    removeCart();
    navigate("/");

    notifications.show({
      title: "Logged out",
      message: "You have been successfully logged out.",
      color: "yellow",
    });
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  let displayLinks = [];

  if (!user) {
    displayLinks = [
      { link: "/login", label: "Login" },
      { link: "/register", label: "Register" },
    ];
  } else if (user.role === "admin") {
    displayLinks = [
      { link: "/admin/orders", label: "Orders" },
      { link: "/admin/customers", label: "Customers" },
      { link: "/admin/foods", label: "Manage Foods" },
      { link: "/logout", label: "Logout" },
    ];
  } else {
    displayLinks = [
      { link: "/menu", label: "Menu" },
      { link: "/cart", label: "Cart" },
      { link: "/logout", label: "Logout" },
    ];
  }

  const items = displayLinks.map((link) => {
    const isActive = location.pathname.includes(link.link);

    return (
      <Button
        key={link.label}
        onClick={() => {
          if (link.label === "Logout") {
            handleLogout();
          } else {
            navigate(link.link);
          }
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

        <Group gap={3} visibleFrom="sm">
          <Text c="luminaYellow.4" mr={8}>
            {user ? `Hello, ${user.name.split(" ")[0]}!` : null}
          </Text>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          aria-label="Toggle navigation"
        />
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="xs"
        padding="md"
        title={<Text fw={700}>Navigation</Text>}
        hiddenFrom="md"
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
