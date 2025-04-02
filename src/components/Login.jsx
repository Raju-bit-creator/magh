import React, { useState } from "react";
import SmallHero from "./constant/SmallHero";

const Login = () => {
  const [credentail, setCredential] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("api");
      if (response) {
        console.log(response);
      }
      const data = response.json();
      console.log(data);

      console.log(credentail);
    } catch (error) {
      console.error(error);
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
