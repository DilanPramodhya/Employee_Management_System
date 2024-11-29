import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Correct import
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Employee from "./components/Employee";
import Category from "./components/Category";
import Profile from "./components/Profile";
import AddCategory from "./components/AddCategory";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminLogin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route
            path="/dashboard/addCategory"
            element={<AddCategory />}
          ></Route>
          <Route
            path="/dashboard/addEmployee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/dashboard/editEmployee/:id"
            element={<EditEmployee />}
          ></Route>
        </Route>
      </Routes>
      <ToastContainer position="top-right" theme="dark" />
    </BrowserRouter>
  );
}
export default App;
