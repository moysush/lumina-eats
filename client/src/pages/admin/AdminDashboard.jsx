import {
  AppShell,
  Burger,
  Container,
  Group,
  Title,
  Text,
  Table,
  Select,
  NavLink,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getAllOrders, updateOrderStatus } from "../../services/orders";
import { useEffect, useState } from "react";
import { getAllCustomers } from "../../services/user";
import OrderPage from "./OrderPage";
import CustomerPage from "./CustomerPage";
import {
  createFood,
  deleteFood,
  getFood,
  updateFood,
} from "../../services/food";
import FoodItemPage from "./FoodItemPage";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { notifications } from "@mantine/notifications";

const AdminDashboard = ({ children }) => {
  const location = useLocation();
  const [opened, { toggle }] = useDisclosure();
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const fetchData = async () => {
    try {
      const orderData = await getAllOrders();
      const customerData = await getAllCustomers();
      const foodItemsData = await getFood();

      setOrders(orderData);
      setCustomers(customerData);
      setFoodItems(foodItemsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order,
        ),
      );
      notifications.show({
        title: "Success",
        message: "Order status updated.",
        color: "blue",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to update order status.",
        color: "red",
      });
      console.error("Error updating status: ", error);
    }
  };

  const handleFoodChange = async (foodId, newStatus) => {
    try {
      await updateFood(foodId, newStatus);

      setFoodItems((prev) =>
        prev.map((food) =>
          food._id === foodId ? { ...food, ...newStatus } : food,
        ),
      );
      notifications.show({
        title: "Success",
        message: "Food item updated.",
        color: "blue",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to update food item.",
        color: "red",
      });
      console.error("Error updating status: ", error);
    }
  };

  const handleFoodDelete = async (foodId) => {
    try {
      await deleteFood(foodId);

      setFoodItems((prev) => prev.filter((food) => food._id !== foodId));
      notifications.show({
        title: "Deleted",
        message: "Food item removed from menu.",
        color: "red",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to delete food item.",
        color: "red",
      });
      console.error("Error deleting food item: ", error);
    }
  };

  const handleFoodCreate = async (foodData) => {
    try {
      const createdFood = await createFood(foodData);

      setFoodItems((prev) => [createdFood, ...prev]);
      notifications.show({
        title: "Success",
        message: "New food item added to the menu.",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to create food item.",
        color: "red",
      });
      console.error("Error creating food item: ", error);
    }
  };

  return (
    <Container>
      <Title order={2}>Admin Dashboard</Title>
      <Routes>
        <Route path="/" element={<Navigate to="orders" replace />} />
        <Route
          path="orders"
          element={
            <OrderPage
              orders={orders}
              handleStatusChange={handleStatusChange}
            />
          }
        />
        <Route
          path="customers"
          element={<CustomerPage customers={customers} />}
        />
        <Route
          path="foods"
          element={
            <FoodItemPage
              foodItems={foodItems}
              handleFoodChange={handleFoodChange}
              handleFoodDelete={handleFoodDelete}
              handleFoodCreate={handleFoodCreate}
            />
          }
        />
      </Routes>
    </Container>
  );
};

export default AdminDashboard;
