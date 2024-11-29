import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/auth/deleteEmployee/` + id)
        .then((result) => {
          if (result.data.Status) {
            toast.success("Employee Deleted");
            window.location.reload();
          } else {
            toast.error(result.data.Error || "Failed to delete employee.");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div
      style={{
        padding: "20px 15px",
        marginTop: "20px",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
      }}
    >
      {/* Centered Card */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
          maxWidth: "90%",
          margin: "auto",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <h3
            style={{
              fontWeight: "600",
              color: "#343a40",
              marginBottom: "20px",
            }}
          >
            Employee List
          </h3>
        </div>

        {/* Add Employee Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "15px",
          }}
        >
          <Link
            to="/dashboard/addEmployee"
            style={{
              textDecoration: "none",
              padding: "10px 20px",
              backgroundColor: "#38e557",
              color: "white",
              borderRadius: "6px",
              fontWeight: "500",
              fontSize: "14px",
              transition: "background-color 0.3s ease",
              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1bd53d")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#38e557")}
          >
            + Add Employee
          </Link>
        </div>

        {employee.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: "#6c757d",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            No employee found.
          </div>
        ) : (
          <div
            style={{
              overflowX: "auto", // Enable horizontal scroll
            }}
          >
            <table
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                width: "100%",
                textAlign: "center",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderCollapse: "separate",
                borderSpacing: "0",
              }}
            >
              <thead style={{ backgroundColor: "#343a40", color: "white" }}>
                <tr>
                  <th style={{ padding: "10px", fontSize: "14px" }}>
                    Employee Name
                  </th>
                  <th style={{ padding: "10px", fontSize: "14px" }}>
                    Employee Image
                  </th>
                  <th
                    style={{ padding: "10px", fontSize: "14px" }}
                    className="d-none d-sm-table-cell"
                  >
                    Employee Email
                  </th>
                  <th
                    style={{ padding: "10px", fontSize: "14px" }}
                    className="salary-column d-none d-sm-table-cell"
                  >
                    Employee Salary
                  </th>
                  <th
                    style={{ padding: "10px", fontSize: "14px" }}
                    className="address-column d-none d-sm-table-cell"
                  >
                    Employee Address
                  </th>
                  <th style={{ padding: "10px", fontSize: "14px" }}>
                    Edit / Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {employee.map((element, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td style={{ padding: "10px", fontSize: "14px" }}>
                      {element.name}
                    </td>
                    <td style={{ padding: "10px", fontSize: "14px" }}>
                      <img
                        src={`http://localhost:3000/Images/${element.image}`}
                        alt="Employee"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td
                      style={{ padding: "10px", fontSize: "14px" }}
                      className="d-none d-sm-table-cell"
                    >
                      {element.email}
                    </td>
                    <td
                      style={{ padding: "10px", fontSize: "14px" }}
                      className="d-none d-sm-table-cell"
                    >
                      {element.salary}
                    </td>
                    <td
                      style={{ padding: "10px", fontSize: "14px" }}
                      className="d-none d-sm-table-cell"
                    >
                      {element.address}
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <Link
                        to={`/dashboard/editEmployee/` + element.id}
                        style={{
                          padding: "6px 12px",
                          marginRight: "10px",
                          backgroundColor: "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </Link>
                      <Link
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(element.id)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employee;
