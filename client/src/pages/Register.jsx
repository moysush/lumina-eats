import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";
import { notifications } from "@mantine/notifications";

export default function Register() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "customer",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 5
          ? null
          : "Password should be longer than five characters",
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async (values) => {
    try {
      const { confirmPassword, ...dataToSend } = values;
      await register(dataToSend);

      notifications.show({
        title: "Account Created",
        message: "Your account has been successfully created. Please log in.",
        color: "green",
      });

      navigate("/login");
    } catch (err) {
      notifications.show({
        title: "Registration failed",
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
        color: "red",
      });
    }
  };

  return (
    <Container size="xs">
      <Title align="center">Create Account</Title>
      <Paper withBorder p={30} mt={30}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="Your preferred name"
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            mt="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="••••••••"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="••••••••"
            required
            mt="md"
            {...form.getInputProps("confirmPassword")}
          />
          {/* <Select
            label="Register as"
            data={[
              { value: "customer", label: "Customer" },
              { value: "admin", label: "Admin" },
            ]}
            mt="md"
            {...form.getInputProps("role")}
          /> */}
          <Button fullWidth mt="xl" type="submit">
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
