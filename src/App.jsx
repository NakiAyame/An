import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./layouts/common/login/Login";
import Register from "./layouts/common/register/Register";
import Dashboard from "./layouts/dashboard/Dashboard";
import { ToastContainer } from "react-toastify";

// import AdminLayout from "./layouts/dashboard/layouts/Admin"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />

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


