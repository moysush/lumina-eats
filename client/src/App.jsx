import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { Home } from "./pages/Home";
import Layout from "./Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Notifications />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* <Route index element={<Menu />} /> */}
          {/* <Route path="cart" element={<Cart />} /> */}

          <Route path="/admin" element={<AdminDashboard />} />
          {/* <Route path="/admin/orders" element={<ManageItems />} /> */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
