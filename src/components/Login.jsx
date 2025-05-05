import React, { useState } from "react";
import SmallHero from "./constant/SmallHero";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentail, setCredential] = useState({
    email: "",
    password: "",
  });
  // const base_url = process.env.API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = credentail;
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response) {
        localStorage.setItem("token", data.authToken);
        navigate("/");
      }

      console.log(credentail);
    } catch (error) {
      console.error(error);
      // alert("error occured");
    }
  };
  const handleChange = (e) => {
    setCredential({ ...credentail, [e.target.name]: e.target.value });
  };
  return (
    <>
      <SmallHero />
      <div className="container">
        <h4>Welcome back !!</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              name="email"
              value={credentail.email}
              onChange={handleChange}
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Password
            </label>
            <input
              name="password"
              value={credentail.password}
              onChange={handleChange}
              type="password"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Your Password"
            />
          </div>

          <button type="submit" className="btn btn-primary mb-3">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
