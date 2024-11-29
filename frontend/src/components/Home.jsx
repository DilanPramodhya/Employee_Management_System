import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  const adminRecords = () => {
    axios.get("http://localhost:3000/auth/adminRecords").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        result.data.Error;
      }
    });
  };

  const adminCount = () => {
    axios.get("http://localhost:3000/auth/adminCount").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };
  const employeeCount = () => {
    axios.get("http://localhost:3000/auth/employeeCount").then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    });
  };
  const salaryCount = () => {
    axios.get("http://localhost:3000/auth/salaryCount").then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOfEmp);
      }
    });
  };

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // Makes it responsive
          gap: "20px",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "#f8f9fa",
        }}
      >
        {/* Admin Card */}
        <div
          style={{
            flex: "1 1 300px", // Flexbox for responsiveness
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            textAlign: "center",
            maxWidth: "350px",
          }}
        >
          <h4 style={{ color: "#007bff", fontWeight: "600" }}>Admin</h4>
          <hr style={{ border: "1px solid #dee2e6" }} />
          <div className="d-flex justify-content-between">
            <h5 style={{ color: "#495057" }}>Total: </h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>

        {/* Employee Card */}
        <div
          style={{
            flex: "1 1 300px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            textAlign: "center",
            maxWidth: "350px",
          }}
        >
          <h4 style={{ color: "#28a745", fontWeight: "600" }}>Employee</h4>
          <hr style={{ border: "1px solid #dee2e6" }} />
          <div className="d-flex justify-content-between">
            <h5 style={{ color: "#495057" }}>Total: </h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>

        {/* Salary Card */}
        <div
          style={{
            flex: "1 1 300px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            textAlign: "center",
            maxWidth: "350px",
          }}
        >
          <h4 style={{ color: "#dc3545", fontWeight: "600" }}>Salary</h4>
          <hr style={{ border: "1px solid #dee2e6" }} />
          <div className="d-flex justify-content-between">
            <h5 style={{ color: "#495057" }}>Total: </h5>
            <h5>Rs. {salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-5">
        <h3>List of Admins</h3>
        {admins.length === 0 ? (
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
          <table
            className="table"
            style={{
              width: "100%",
              margin: "20px auto",
              borderCollapse: "separate",
              borderSpacing: "0",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#343a40",
                  color: "white",
                  textAlign: "center", // Center-align header for better alignment with content
                }}
              >
                <th style={{ padding: "15px", fontSize: "16px" }}>Email</th>
                <th style={{ padding: "15px", fontSize: "16px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((element, index) => (
                <tr
                  key={element.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff",
                  }}
                >
                  <td
                    style={{
                      padding: "15px",
                      fontSize: "14px",
                      color: "#495057",
                      textAlign: "center", // Horizontally center-aligns text
                      verticalAlign: "middle", // Vertically centers text within the cell
                    }}
                  >
                    {element.email}
                  </td>

                  <td
                    style={{
                      padding: "15px",
                      textAlign: "center", // Center-align the actions
                    }}
                  >
                    <button
                      style={{
                        padding: "8px 15px",
                        marginRight: "10px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#0056b3")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#007bff")
                      }
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        padding: "8px 15px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#a71d2a")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#dc3545")
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
