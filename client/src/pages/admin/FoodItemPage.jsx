import {
  Button,
  Group,
  Modal,
  Paper,
  Select,
  Table,
  Textarea,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const FoodItemPage = ({
  foodItems,
  handleFoodChange,
  handleFoodDelete,
  handleFoodCreate,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  // Food creation
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      imageUrl: "",
      isAvailable: "True",
    },
  });

  const onSubmit = (values) => {
    handleFoodCreate({
      ...values,
      isAvailable: values.isAvailable === "True",
    });
    close();
    form.reset();
  };

  // Food item rows
  const foodItemRows = foodItems.map((item) => (
    <Table.Tr key={item._id}>
      <Table.Td>#{item._id.slice(-6)}</Table.Td>
      <Table.Td miw={150}>
        <Textarea
          defaultValue={item.name}
          onBlur={(e) => {
            const newValue = e.currentTarget.value;
            if (newValue !== item.name) {
              handleFoodChange(item._id, { name: newValue });
            }
          }}
          aria-label="Update Food Name"
        />
      </Table.Td>
      <Table.Td miw={150}>
        <Textarea
          defaultValue={item.description}
          onBlur={(e) => {
            const newValue = e.currentTarget.value;
            if (newValue !== item.description) {
              handleFoodChange(item._id, { description: newValue });
            }
          }}
          aria-label="Update Food Description"
        />
      </Table.Td>
      <Table.Td miw={100}>
        <TextInput
          defaultValue={item.price}
          onBlur={(e) => {
            const newValue = e.currentTarget.value;
            if (newValue !== item.price) {
              handleFoodChange(item._id, { price: newValue });
            }
          }}
          aria-label="Update Food Price"
        />
      </Table.Td>
      <Table.Td miw={90}>
        <TextInput
          defaultValue={item.category}
          onBlur={(e) => {
            const newValue = e.currentTarget.value;
            if (newValue !== item.category) {
              handleFoodChange(item._id, { category: newValue });
            }
          }}
          aria-label="Update Food Category"
        />
      </Table.Td>
      <Table.Td miw={150}>
        <Textarea
          defaultValue={item.imageUrl}
          onBlur={(e) => {
            const newValue = e.currentTarget.value;
            if (newValue !== item.imageUrl) {
              handleFoodChange(item._id, { imageUrl: newValue });
            }
          }}
          aria-label="Update Food ImageUrl"
        />
      </Table.Td>
      <Table.Td miw={110}>
        <Select
          placeholder="Pick status"
          data={["True", "False"]}
          defaultValue={item.isAvailable ? "True" : "False"}
          onChange={(newValue) =>
            handleFoodChange(item._id, { isAvailable: newValue === "True" })
          }
          aria-label="Update Food Availability"
        />
      </Table.Td>
      <Table.Td>
        <Button
          color="red"
          variant="light"
          onClick={(e) => {
            if (
              window.confirm(`Are you sure you want to delete the ${item.name}`)
            ) {
              handleFoodDelete(item._id);
            }
          }}
          aria-label={`Delete item ${item.name}`}
        >
          Delete
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Food items</Title>
        <Button onClick={open}>+ New Food</Button>
      </Group>
      <Table.ScrollContainer type="native">
        <Table withTableBorder withColumnBorders striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Food Item ID</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Image Url</Table.Th>
              <Table.Th>Available</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{foodItemRows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Modal
        opened={opened}
        onClose={close}
        title={<Text fw={700}>Add New Dish</Text>}
        centered
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Name"
            placeholder="e.g., Spicy Chicken Burger"
            required
            mb="sm"
            {...form.getInputProps("name")}
          />
          <Textarea
            label="Description"
            placeholder="Brief description of the dish"
            mb="sm"
            {...form.getInputProps("description")}
          />
          <Group grow mb="sm">
            <TextInput
              label="Price"
              placeholder="0.00"
              required
              type="number"
              step="0.01"
              {...form.getInputProps("price")}
            />
            <TextInput
              label="Category"
              placeholder="e.g., Burger"
              required
              {...form.getInputProps("category")}
            />
          </Group>
          <TextInput
            label="Image URL"
            placeholder="https://..."
            mb="md"
            {...form.getInputProps("imageUrl")}
          />
          <Select
            label="Availability"
            data={["True", "False"]}
            mb="xl"
            {...form.getInputProps("isAvailable")}
          />
          <Button fullWidth type="submit">
            Create Food Item
          </Button>
        </form>
      </Modal>
    </Paper>
  );
};

export default FoodItemPage;
