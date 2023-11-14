import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./layouts/common/login/Login";
import Register from "./layouts/common/register/Register";
import Dashboard from "./layouts/dashboard/Dashboard";
import { ToastContainer } from "react-toastify";

import BasicTable from "./layouts/dashboard/user/UserTable";
import ServiceTable from "./layouts/dashboard/service/ServiceTables";
import PetTable from "./layouts/dashboard/pet/PetTables";
import ProductTable from "./layouts/dashboard/product/ProductTables";
import OrderTable from "./layouts/dashboard/order/OrderTable";
import LandingPage from "./layouts/LandingPage/LandingPage";
import ServiceList from "./layouts/dashboard/service/ServiceList";
import Header from "./components/Header/Header";
import ProductList from "./layouts/dashboard/product/ProductList";
import BookingTable from "./layouts/dashboard/booking/BookingTable";
import CartService from "./layouts/Cart/CartService";
import CartProduct from "./layouts/Cart/CartProduct";

import RequireAuth from "./components/RequireAuth";
import ChangePassword from "./layouts/User/ChangePassword";
import UserPRofile from "./layouts/User/UserProfile";

// import AdminLayout from "./layouts/dashboard/layouts/Admin"

const ROLES = {
  User: 2001,
  CUSTOMER: "customer",
  ADMIN: "admin",
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="/dashboard/user-list" element={<BasicTable />} />
              <Route path="/dashboard/order-list" element={<OrderTable />} />
              <Route
                path="/dashboard/booking-list"
                element={<BookingTable />}
              />
              <Route
                path="/dashboard/service-list"
                element={<ServiceTable />}
              />
              <Route path="/dashboard/pet-list" element={<PetTable />} />
              <Route
                path="/dashboard/product-list"
                element={<ProductTable />}
              />
            </Route>
          </Route>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/" element={<Header />}>
            <Route index element={<LandingPage />} />
            <Route path="service-homepage" element={<ServiceList />} />
            <Route path="product-homepage" element={<ProductList />} />
            <Route path="cart-service" element={<CartService />} />
            <Route path="cart-product" element={<CartProduct />} />
            <Route path="user-profile" element={<UserPRofile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
