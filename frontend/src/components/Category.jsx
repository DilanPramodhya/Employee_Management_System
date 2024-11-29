import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../index.css";
const Category = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        // console.log(result.data);
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      style={{
        padding: "20px 30px",
        marginTop: "50px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
        maxWidth: "600px",
        margin: "50px auto",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          textAlign: "center",
          // marginBottom: "15px",
        }}
      >
        <h3 style={{ fontWeight: "600", color: "#495057" }}>Category List</h3>
      </div>

      {/* Add Category Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "15px",
        }}
      >
        <Link
          to="/dashboard/addCategory"
          style={{
            textDecoration: "none",
            padding: "8px 16px",
            backgroundColor: "#f7df59",
            color: "white",
            borderRadius: "5px",
            fontWeight: "500",
            fontSize: "14px",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#edcd19")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#f7df59")}
        >
          + Add Category
        </Link>
      </div>

      {/* Table Section */}
      <div style={{ overflowX: "auto" }}>
        <table
          className="table table-hover"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "100%",
            textAlign: "center",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            borderCollapse: "separate",
            borderSpacing: "0",
          }}
        >
          <thead style={{ backgroundColor: "#343a40", color: "white" }}>
            <tr>
              <th
                style={{
                  padding: "8px",
                  fontWeight: "600",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {category.map((element, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #dee2e6",
                  transition: "background-color 0.2s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8f9fa")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                <td
                  style={{
                    padding: "8px",
                    fontSize: "14px",
                    color: "#495057",
                  }}
                >
                  {element.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
