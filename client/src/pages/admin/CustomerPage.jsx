import { Paper, Table, Title } from "@mantine/core";

const CustomerPage = ({ customers }) => {
  const customerRows = customers.map((customer) => (
    <Table.Tr key={customer._id}>
      <Table.Td>#{customer._id.slice(-6)}</Table.Td>
      <Table.Td>{customer.name}</Table.Td>
      <Table.Td>{customer.email}</Table.Td>
      <Table.Td>{customer.phone}</Table.Td>
      <Table.Td>{new Date(customer.createdAt).toLocaleDateString()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper>
      <Title order={3} mb="lg">
        Customer Details
      </Title>
      <Table.ScrollContainer type="native">
        <Table withTableBorder withColumnBorders striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Customer ID</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{customerRows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  );
};

export default CustomerPage;
