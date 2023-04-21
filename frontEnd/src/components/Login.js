import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/users/userContext";

const Login = (props) => {
  let navigateTo = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigateTo("/");
  }, []);
  const userContext = useContext(UserContext);
  const { setAuthToken } = userContext;
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const handleCredChange = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const port = "https://taskback-jyx5.onrender.com";
      const url = `${port}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(loginCredentials),
      });
      const loginToken = await response.json();
      if (loginToken.success) {
        //redirect
        localStorage.setItem("token", loginToken.authToken);
        setAuthToken(localStorage.getItem("token"));
        navigateTo("/");
        props.showAlert("Logged In successfully", "success");
      } else {
        props.showAlert("Username or Password may be incorrect", "warning");
      }
    } catch (e) {
      props.showAlert("Login Failed", "danger");
    }
  };
  return (
    <div className="container d-flex flex-column align-items-center">
      <form
        className="card shadow p-4 col-lg-6 col-md-8 col-sm-12 mt-2"
        onSubmit={handleLogin}
      >
        <div className="mb-1">
          <h2>Login to use Taskify</h2>
        </div>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            placeholder="username@gmail.com"
            name="email"
            onChange={handleCredChange}
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="loginPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            placeholder="My strong password"
            name="password"
            onChange={handleCredChange}
            required
          />
        </div>
        <div className="form-text">
          We'll never share your credentials with anyone else.
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-2">
          LogIn
        </button>
      </form>
    </div>
  );
};

export default Login;
