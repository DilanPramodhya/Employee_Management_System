import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Start = () => {
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/verify")
      .then((result) => {
        if (result.data.Status) {
          // console.log(result);
          if (result.data.role === "admin") {
            navigateTo("/dashboard");
          } else {
            navigateTo("/employeeDetails/" + result.data.Result.id);
          }
        } 
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2 className="text-center">Login As</h2>
        <div className="d-flex justify-content-between mt-5 mb-2">
          <Link to={"/employeeLogin"} className="btn btn-primary">
            Employee
          </Link>
          <Link to={"/adminLogin"} className="btn btn-success">
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
