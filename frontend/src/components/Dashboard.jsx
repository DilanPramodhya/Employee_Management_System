import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

export const Dashboard = () => {
  const navigateTo = useNavigate();

  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        navigateTo("/adminLogin");
      }
    });
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">SMT</span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
              style={{
                gap: "20px",
                listStyle: "none",
                paddingLeft: "0",
                marginTop: "30px",
              }}
            >
              {/* Dashboard Link */}
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link px-3 py-2 d-flex align-items-center"
                  style={{
                    color: "#fff",
                    background: "linear-gradient(90deg, #0066ff, #00ccff)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    fontWeight: "600",
                    transition: "transform 0.2s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>

              {/* Manage Employees Link */}
              <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-3 py-2 d-flex align-items-center"
                  style={{
                    color: "#fff",
                    background: "linear-gradient(90deg, #28a745, #85e089)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    fontWeight: "600",
                    transition: "transform 0.2s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Employees
                  </span>
                </Link>
              </li>

              {/* Category Link */}
              <li className="w-100">
                <Link
                  to="/dashboard/category"
                  className="nav-link px-3 py-2 d-flex align-items-center"
                  style={{
                    color: "#fff",
                    background: "linear-gradient(90deg, #ffc107, #ffd857)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    fontWeight: "600",
                    transition: "transform 0.2s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>

              {/* Profile Link */}
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-3 py-2 d-flex align-items-center"
                  style={{
                    color: "#fff",
                    background: "linear-gradient(90deg, #dc3545, #f79aa1)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    fontWeight: "600",
                    transition: "transform 0.2s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
            </ul>

            {/* Logout Button */}
            <div className="mt-20px w-100" onClick={handleLogout}>
              <Link
                className="nav-link px-3 py-2 d-flex align-items-center text-white bg-danger rounded-3 mt-3 mb-2"
                to="/logout"
              >
                <i className="fs-4 bi-power ms-2"></i>
                <span className="ms-2 d-none d-sm-inline">Logout</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="col p-0 m-0">
          {/* Header Section */}
          <div
            className="p-3 d-flex justify-content-center align-items-center shadow-sm"
            style={{
              background: "linear-gradient(90deg, #007bff, #6610f2)",
              color: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h4
              style={{
                fontWeight: "700",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#000",
              }}
            >
              Employee Management System
            </h4>
          </div>

          {/* Main Content */}
          <div
            className="p-4"
            style={{
              backgroundColor: "#f8f9fa",
              minHeight: "calc(100vh - 70px)",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
