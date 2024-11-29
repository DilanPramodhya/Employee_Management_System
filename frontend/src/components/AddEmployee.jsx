import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    category_id: "",
    salary: "",
    image: null,
  });
  const [category, setCategory] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("address", employee.address);
    formData.append("salary", employee.salary);
    formData.append("category_id", employee.category_id);
    if (employee.image) {
      formData.append("image", employee.image);
    }

    axios
      .post("http://localhost:3000/auth/addEmployee", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((result) => {
        if (result.data.Status) {
          toast.success("Employee added successfully");
          navigateTo("/dashboard/employee");
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="p-4 rounded shadow w-100 bg-white"
        style={{
          maxWidth: "500px", 
          borderRadius: "12px",
        }}
      >
        <h2 className="text-center mb-4 text-success">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Employee Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Employee Name"
              className="form-control"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Employee Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Employee Email"
              className="form-control"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Employee Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Employee Password"
              className="form-control"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
              required
            />
          </div>

          {/* Salary */}
          <div className="mb-3">
            <label htmlFor="salary" className="form-label">
              Employee Salary
            </label>
            <input
              type="number"
              id="salary"
              placeholder="Enter Employee Salary"
              className="form-control"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
              required
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Employee Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter Employee Address"
              className="form-control"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
              required
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Select Category
            </label>
            <select
              id="category"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {category.map((element) => (
                <option value={element.id} key={element.id}>
                  {element.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Select Image
            </label>
            <input
              type="file"
              id="image"
              className="form-control"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 mt-3"
            style={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
