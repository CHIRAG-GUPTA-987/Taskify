import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/users/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons';

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
    const loginButton = document.querySelector(".login-button");
    const loginText = document.querySelector("#loginText");
    try {
      e.preventDefault();
      loginText.innerText = "Verifying...";
      loginButton.style.backgroundColor = "#166726";
      const port = process.env.REACT_APP_PORT;
      const url = `${port}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(loginCredentials),
      });
      const loginToken = await response.json();
      if (loginToken.success) {
        //redirect
        localStorage.setItem("token", loginToken.authToken);
        setAuthToken(localStorage.getItem("token"));
        navigateTo("/");
        props.showAlert("You're in! Access granted.", "success");
      } else {
        loginText.innerText = "Access my account";
        setTimeout(() => {
          loginButton.style.backgroundColor = "#36953f";
        }, 500);
        props.showAlert("Oops! The username or password you entered might be incorrect", "warning");
      }
    } catch (e) {
      loginText.innerText = "Access my account";
      setTimeout(() => {
        loginButton.style.backgroundColor = "#36953f";
      }, 500);
      props.showAlert("Something went wrong. Please try again later.", "danger");
    }
  };
  return (
    <div className="container d-flex flex-column align-items-center">
      <form
        className="card shadow p-4 col-lg-6 col-md-8 col-sm-12 mt-2 app-form"
        onSubmit={handleLogin}
      >
        <div className="mb-1">
          <h2>Get Started by Logging In</h2>
        </div>
        <div className="mb-3 d-flex align-items-center input-item-taskify">
          <FontAwesomeIcon icon={faUser} className="input-icon-taskify" />
          <input
            type="email"
            // className="form-control"
            id="loginEmail"
            placeholder="Username"
            name="email"
            onChange={handleCredChange}
            required
          />
        </div>
        <div className="mb-1 input-item-taskify">
          <FontAwesomeIcon icon={faLock} className="input-icon-taskify" />
          <input
            type="password"
            // className="form-control"
            id="loginPassword"
            placeholder="Password"
            name="password"
            onChange={handleCredChange}
            required
          />
        </div>
        <div className="form-text login-text">
          Your credentials are secure with us.
        </div>
        <div id="loginButtonDiv">
          <button
            type="submit"
            className="btn btn-block mt-2 login-button"
          >
            <FontAwesomeIcon icon={faUnlock} className="input-icon-taskify" />
            <span id="loginText">Access my account</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
