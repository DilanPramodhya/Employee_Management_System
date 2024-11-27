import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Correct import
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminLogin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer position="top-right" theme="dark" />
    </BrowserRouter>
  );
}
export default App;
