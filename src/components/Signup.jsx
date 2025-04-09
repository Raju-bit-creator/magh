import React, { useState } from "react";
import SmallHero from "./constant/SmallHero";

const Signup = () => {
  const [credentail, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

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
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <input
              type="name"
              name="name"
              value={credentail.name}
              onChange={handleChange}
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter your name"
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Conform password
            </label>
            <input
              name="cpassword"
              value={credentail.cpassword}
              onChange={handleChange}
              type="password"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Confirm Password"
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

export default Signup;
