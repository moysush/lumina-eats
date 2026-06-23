import {
  AppShell,
  Burger,
  Container,
  Group,
  Title,
  Text,
  Table,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getAllOrders } from "../services/orders";
import { useEffect, useState } from "react";

const AdminDashboard = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      console.log(data);

      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Map over the 'orders' array and use 'order' as the parameter name for clarity
  const orderRows = orders.map((order) => (
    <Table.Tr key={order._id}>
      {/* Displaying a shortened version of the MongoDB ID for cleaner UI */}
      {/* <Table.Td>{order._id.slice(-6).toUpperCase()}</Table.Td> */}
      <Table.Td>{order._id}</Table.Td>

      {/* Formatting the amount as a proper currency string */}
      <Table.Td>${order.totalAmount.toFixed(2)}</Table.Td>

      <Table.Td>{order.orderStatus}</Table.Td>
      <Table.Td>{order.paymentStatus}</Table.Td>

      {/* Converting the ISO date string to a readable format */}
      <Table.Td>{new Date(order.createdAt).toLocaleDateString()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container>
      <Title>Admin Dashboard</Title>
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

          <div>Logo</div>
        </AppShell.Header>

        <AppShell.Navbar>Navbar</AppShell.Navbar>

        <AppShell.Main>
          <Table withTableBorder withColumnBorders striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Order ID</Table.Th>
                <Table.Th>Total Amount</Table.Th>
                <Table.Th>Order Status</Table.Th>
                <Table.Th>Payment Status</Table.Th>
                <Table.Th>Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{orderRows}</Table.Tbody>
          </Table>
        </AppShell.Main>
      </AppShell>
    </Container>
  );
};

export default AdminDashboard;
