import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const VerticalNavbar = () => {
  return (
    <nav className="d-flex flex-column bg-dark vh-100 p-3">
      {/* Brand */}
      <Link className="navbar-brand text-white mb-4" to="/dashboard">
        SMT
      </Link>

      {/* Navigation Links */}
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard">
            SMT
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard/manage-employees">
            Manage Employees
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard/category">
            Category
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard/profile">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/dashboard/logout">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default VerticalNavbar;
