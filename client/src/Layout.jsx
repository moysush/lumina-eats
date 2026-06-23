import { Container, Stack } from "@mantine/core";
import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <Container fluid>
      <Navbar>
        <Container fluid py={100}>
          {children}
        </Container>
      </Navbar>
    </Container>
  );
};

export default Layout;
