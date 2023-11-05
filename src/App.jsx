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

// import AdminLayout from "./layouts/dashboard/layouts/Admin"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="user-list" element={<BasicTable />} />
            <Route path="order-list" element={<OrderTable />} />
            <Route path="service-list" element={<ServiceTable />} />
            <Route path="pet-list" element={<PetTable />} />
            <Route path="product-list" element={<ProductTable />} />
          </Route>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
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
