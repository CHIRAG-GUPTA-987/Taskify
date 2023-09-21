import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/users/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUnlock, faUser } from "@fortawesome/free-solid-svg-icons";
import PasswordStrengthBar from 'react-password-strength-bar';

const SignUp = (props) => {
  let navigateTo = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigateTo("/");
  }, []);
  const userContext = useContext(UserContext);
  const { setAuthToken } = userContext;
  const [registerCredentials, setRegisterCredentials] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
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
    const strength = calculatePasswordStrength(e.target.value);
    console.log(strength);
    setPasswordStrength(strength);
  };
  const calculatePasswordStrength = (password) => {
    // 1 - Very Weak, 2 - Weak, 3 - Moderate, 4 - Strong, 5 - Very Strong
    const lengthScore1 = password.length >= 8 ? 1 : 0;
    const lengthScore2 = password.length >= 12 ? 1 : 0;
    const complexityScore1 = /[A-Z]+/.test(password);
    const complexityScore2 = /[a-z]+/.test(password);
    const complexityScore3 = /[0-9]+/.test(password);
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const containsSpecialChar = specialCharRegex.test(password);
    const specialCharScore = containsSpecialChar ? 1 : 0;
    const complexScore = complexityScore1 + complexityScore2 + complexityScore3 + specialCharScore;
    return lengthScore1 == 0 ? 0 : lengthScore2 == 0 ? complexScore : 1 + complexScore;
  };

  const loginFailure = () => {
    const loginButton = document.querySelector(".login-button");
    const loginText = document.querySelector("#loginText");
    loginButton.disabled = false;
    loginText.innerText = "Access";
    loginButton.style.backgroundColor = "#36953f";
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const loginButton = document.querySelector(".login-button");
    const loginText = document.querySelector("#loginText");
    loginText.innerText = "Accessing...";
    loginButton.style.backgroundColor = "#166726";
    loginButton.disabled = true;
    if (registerCredentials.userName.length < 5) {
      loginFailure();
      props.showAlert(`Minimum length of Username: 5 \n Captured: ${registerCredentials.userName.length}`, "info");
      return;
    }
    if (registerCredentials.password != confirmPassword.confirmPassword) {
      loginFailure();
      props.showAlert("Passwords don't match", "info");
      return;
    }
    if (passwordStrength < 4) {
      loginFailure();
      console.log(passwordStrength);
      props.showAlert("Please choose a stronger password", "warning");
      return;
    }
    const port = process.env.REACT_APP_PORT;
    const url = `${port}/auth/register`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      loginFailure();
      props.showAlert(
        "Error encountered while registering new user",
        "danger"
      );
    }
  };
  return (
    <div className="container d-flex flex-column align-items-center">
      <form
        className="card shadow p-4 col-lg-6 col-md-8 col-sm-12 mt-2 app-form"
        onSubmit={handleRegister}
      >
        <div className="mb-1">
          <h2>Unlock productivity with Taskify</h2>
        </div>
        <div className="mb-3 input-item-taskify">
          <FontAwesomeIcon icon={faUser} className="input-icon-taskify" />
          <input
            type="text"
            // className="form-control"
            name="userName"
            id="signupUserName"
            placeholder="Username"
            onChange={handleCredChange}
            required
          />
        </div>
        <div className="mb-3 input-item-taskify">
          <FontAwesomeIcon icon={faEnvelope} className="input-icon-taskify" />
          <input
            type="email"
            // className="form-control"
            onChange={handleCredChange}
            name="email"
            placeholder="Email"
            id="signupEmail"
            required
          />
        </div>
        <div className="input-item-taskify">
          <FontAwesomeIcon icon={faLock} className="input-icon-taskify" />
          <input
            type="password"
            // className="form-control"
            name="password"
            onChange={handleCredChange}
            placeholder="Password"
            id="signupPassword"
            required
          />
        </div>
        <PasswordStrengthBar password={registerCredentials.password} />
        <div className="mb-1 input-item-taskify">
          <FontAwesomeIcon icon={faLock} className="input-icon-taskify" />
          <input
            type="password"
            // className="form-control"
            name="confirmPassword"
            id="signupConfirmPassword"
            placeholder="Confirm Password"
            onChange={handleConfirmPassword}
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
            <span id="loginText">Access</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
