import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/employeeDetails/" + id)
      .then((result) => {
        // console.log(result.data.Result);
        setEmployee(result.data.Result[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get("http://localhost:3000/employee/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigateTo("/");
      }
    });
  };
  return (
    <div className="container mt-5">
      {/* Main Heading */}
      <div className="text-center mb-4">
        <h3 className="fw-bold text-primary" style={{ fontSize: "40px" }}>
          Employee Management System
        </h3>
      </div>

      {/* Employee Card */}
      <div className="card mx-auto shadow-lg" style={{ maxWidth: "800px" }}>
        {/* Employee Image */}
        <div className="text-center mt-4">
          <img
            src={`http://localhost:3000/Images/` + employee.image}
            alt="Employee"
            className="rounded-circle shadow-sm"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              border: "4px solid #0d6efd",
            }}
          />
        </div>

        {/* Employee Details */}
        <div className="card-body text-center">
          <h3
            className="card-title text-dark fw-semibold"
            style={{ fontSize: "40px" }}
          >
            {employee.name}
          </h3>
          <p className="text-muted mb-1" style={{ fontSize: "20px" }}>
            Email: {employee.email}
          </p>
          <p className="text-muted mb-3" style={{ fontSize: "20px" }}>
            Salary: ${employee.salary}
          </p>

          {/* Action Buttons */}
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-primary shadow-sm px-4">Edit</button>
            <button
              className="btn btn-danger shadow-sm px-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
