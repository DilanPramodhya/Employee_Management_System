import { Link, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

export const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            {/* Brand */}
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Code With Me
              </span>
            </Link>

            {/* Navigation Links */}
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
              style={{ gap: "30px", marginTop: "40px" }}
            >
              {/* Dashboard Link */}
              <li className="w-100 mb-2">
                <Link
                  to="/dashboard"
                  className="nav-link px-3 py-2 d-flex align-items-center text-white bg-secondary rounded"
                >
                  <i className="fs-4 bi-speedometer2 me-3"></i>
                  <span className="d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>

              {/* Manage Employees Link */}
              <li className="w-100 mb-2">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-3 py-2 d-flex align-items-center text-white bg-secondary rounded"
                >
                  <i className="fs-4 bi-people me-3"></i>
                  <span className="d-none d-sm-inline">Manage Employees</span>
                </Link>
              </li>

              {/* Category Link */}
              <li className="w-100 mb-2">
                <Link
                  to="/dashboard/category"
                  className="nav-link px-3 py-2 d-flex align-items-center text-white bg-secondary rounded"
                >
                  <i className="fs-4 bi-columns me-3"></i>
                  <span className="d-none d-sm-inline">Category</span>
                </Link>
              </li>

              {/* Profile Link */}
              <li className="w-100 mb-2">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-3 py-2 d-flex align-items-center text-white bg-secondary rounded"
                  
                >
                  <i className="fs-4 bi-person me-3"></i>
                  <span className="d-none d-sm-inline">Profile</span>
                </Link>
              </li>
            </ul>

            <div className="mb-4 w-100">
              <Link
                className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
                to="/logout"
              >
                <i className="fs-5 bi-power me-2"></i>
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Employee Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
