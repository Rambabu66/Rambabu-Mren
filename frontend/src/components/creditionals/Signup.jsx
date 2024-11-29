import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../ErrorHandle/ErrorHandle";
const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = signupInfo;
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    const copySignInfo = { ...signupInfo };
    copySignInfo[name] = value;
    setSignupInfo(copySignInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name,email, passsword are required");
    }
    
    try {
      const url = "http://localhost:8000/auth/signup";
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await resp.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;

        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      <div className="Container">
        <div className="main">
          <h1>Enter your signup credentials</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="first">Username:</label>
            <input
              type="text"
              id="first"
              name="name"
              placeholder="Enter your Username"
              value={name}
              onChange={handleChange}
              // required
            />
            <label htmlFor="second">UserEmail:</label>
            <input
              type="email"
              id="second"
              name="email"
              placeholder="Enter your UserEmail"
              value={email}
              onChange={handleChange}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
              value={password}
              onChange={handleChange}
            />

            <div className="wrap">
              <button className="button" type="submit">Submit</button>
            </div>
          </form>

          <p>
            registered?
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
