import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [category, setCategory] = useState();
  const navigateTo = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/addCategory", { category })
      .then((result) => {
        // console.log(result);
        if (result.data.Status) {
          toast.success("Category added Successfully");
          navigateTo("/dashboard/category");
        } else {
          //   alert(result.data.Error);
          toast.error(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        padding: "20px",
      }}
    >
      <div
        className="p-4 rounded shadow-sm w-25 bg-white"
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            color: "#333",
            fontWeight: "600",
            borderBottom: "2px solid #28a745",
            paddingBottom: "10px",
          }}
        >
          Add Category
        </h2>
        <form className="container py-2" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="category"
              className="form-label"
              style={{
                fontWeight: "500",
                color: "#555",
              }}
            >
              <strong style={{ fontSize: "14px" }}>Category Name</strong>
            </label>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Enter your Category"
              className="form-control rounded-3"
              style={{
                border: "1px solid #ced4da",
                padding: "10px",
                fontSize: "14px",
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 rounded-3 mt-3"
            style={{
              background: "#f7df59",
              border: "none",
              fontWeight: "600",
              fontSize: "16px",
              padding: "10px",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#edcd19")}
            onMouseLeave={(e) => (e.target.style.background = "#f7df59")}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
