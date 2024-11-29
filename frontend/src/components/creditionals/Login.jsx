import "./Styles.css";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../ErrorHandle/ErrorHandle";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const {  email, password } = loginInfo;
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);

    const copySignInfo = { ...loginInfo };
    copySignInfo[name] = value;
    setLoginInfo(copySignInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {  email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email, passsword are required");
    }

    try {
      const url = "http://localhost:8000/auth/login";
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await resp.json();
      const { success, message, error,JWTtoken,user } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token',JWTtoken);
        localStorage.setItem('loggedInUser', user)
        setTimeout(() => {
          navigate("/home");
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
          <h1>Enter your Login credentials</h1>

          <form onSubmit={handleSubmit}>
            
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
          Does't have an account ?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Signup an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
