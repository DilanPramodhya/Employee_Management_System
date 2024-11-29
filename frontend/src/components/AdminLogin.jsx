import { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/auth/adminLogin", values)
      .then((result) => {
        if (result.data.loginStatus) {
          // console.log(result);
          localStorage.setItem("valid", true);
          toast.success("Admin Login Success");
          navigate("/dashboard");
        } else {
          // console.log(error);
          setError(result.data.Error);
          toast.error(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        {/* <div className="text-danger">{error && error}</div> */}
        <h2
          style={{
            textAlign: "center", 
            marginTop: "10px", 
          }}
        >
          Admin Login Page
        </h2>

        <form className="container py-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter your email"
              className="form-control rounded-3"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="form-control rounded-3"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              name="tick"
              id="tick"
              className="form-check-input"
            />
            <label htmlFor="tick" className="form-check-label">
              I agree with the terms & conditions
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 rounded-3 mt-3"
          >
            Log in
          </button>

          <div className="text-center mt-3">
            <small>
              <a href="/forgot-password" className="text-decoration-none">
                Forgot your password?
              </a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
