import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/users/userContext";

const SignUp = (props) => {
  const userContext = useContext(UserContext);
  const { setAuthToken } = userContext;
  let navigateTo = useNavigate();
  const [registerCredentials, setRegisterCredentials] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    confirmPassword: "",
  });
  const handleCredChange = (e) => {
    setRegisterCredentials({
      ...registerCredentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleConfirmPassword = async (e) => {
    setConfirmPassword({
      ...confirmPassword,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const port = "https://taskback-jyx5.onrender.com";
    const url = `${port}/auth/register`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //   "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(registerCredentials),
    });
    const loginToken = await response.json();
    if (loginToken.success) {
      //redirect
      localStorage.setItem("token", loginToken.authToken);
      setAuthToken(localStorage.getItem("token"));
      navigateTo("/");
      props.showAlert("Registered and Logged In successfully", "success");
    } else {
      props.showAlert(
        "Error encountered while registering new user",
        "warning"
      );
    }
  };
  return (
    <div className="container d-flex flex-column align-items-center">
      <form
        className="card shadow p-4 col-lg-6 col-md-8 col-sm-12 mt-2"
        onSubmit={handleRegister}
      >
        <div className="mb-1">
          <h2>Create an account to use i-NoteBook</h2>
        </div>
        <div className="mb-3">
          <label htmlFor="signupUserName" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            name="userName"
            id="signupUserName"
            onChange={handleCredChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signupEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={handleCredChange}
            name="email"
            id="signupEmail"
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="signupPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleCredChange}
            id="signupPassword"
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="signupConfirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            id="signupConfirmPassword"
            onChange={handleConfirmPassword}
            required
          />
        </div>
        <div className="form-text">
          We'll never share your credentials with anyone else.
        </div>
        <button
          disabled={
            registerCredentials.userName.length < 5 ||
            registerCredentials.password.length < 8 ||
            registerCredentials.password !== confirmPassword.confirmPassword
          }
          type="submit"
          className="btn btn-primary btn-block mt-2"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
