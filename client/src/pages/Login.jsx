import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { useLocalStorage } from "@mantine/hooks";

export default function Login() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const [, setUser] = useLocalStorage({
    key: "user",
    defaultValue: null,
  });

  const handleSubmit = async (values) => {
    try {
      const data = await login(values);
      setUser(data.user);

      // Redirect based on role
      if (data.user.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      alert("Login failed: " + err);
    }
  };

  return (
    <Container size="xs">
      <Title ta="center">Welcome back!</Title>
      <Paper withBorder p={30} mt={30}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="••••••••"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
