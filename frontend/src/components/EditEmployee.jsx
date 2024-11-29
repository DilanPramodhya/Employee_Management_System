import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    address: "",
    category_id: "",
    salary: "",
  });
  const [category, setCategory] = useState([]);

  const navigateTo = useNavigate();

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

    axios
      .get("http://localhost:3000/auth/editEmployee/" + id)
      .then((result) => {
        // console.log(result);
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          address: result.data.Result[0].address,
          salary: result.data.Result[0].salary,
          category_id: result.data.Result[0].category_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/auth/updateEmployee/` + id, employee)
      .then((result) => {
        // console.log(result);
        if (result.data.Status) {
          toast.success("Employee Updated Successfully");
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
        <h2 className="text-center mb-4 text-success">Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Employee Name
            </label>
            <input
              type="text"
              id="name"
              value={employee.name}
              placeholder="Enter Employee Name"
              className="form-control"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
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
              value={employee.email}
              placeholder="Enter Employee Email"
              className="form-control"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
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
              value={employee.salary}
              placeholder="Enter Employee Salary"
              className="form-control"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
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
              value={employee.address}
              placeholder="Enter Employee Address"
              className="form-control"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
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

          <button
            type="submit"
            className="btn btn-success w-100 mt-3"
            style={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
