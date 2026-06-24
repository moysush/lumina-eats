import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { Home } from "./pages/Home";
import Layout from "./Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OrderPage from "./pages/admin/OrderPage";
import FoodItemPage from "./pages/admin/FoodItemPage";
import FoodMenu from "./pages/customer/FoodMenu";
import Cart from "./pages/customer/Cart";
import Navbar from "./components/Navbar";
import { Paper } from "@mantine/core";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Navbar />
        <Notifications />
        <Paper py={100}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/menu" element={<FoodMenu />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/admin/*" element={<AdminDashboard />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Paper>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
