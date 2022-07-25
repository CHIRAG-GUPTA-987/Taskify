import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/users/userContext";

const Login = props => {
  const userContext = useContext(UserContext);
  const {setAuthToken} = userContext;
  let navigateTo = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({email: "", password: ""});
  const handleCredChange = e => {
      setLoginCredentials({...loginCredentials, [e.target.name]: e.target.value});
  }
  const handleLogin = async e => {
    e.preventDefault();
    const port = "http://localhost:4000";
    const url = `${port}/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //   "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(loginCredentials)
    });
    const loginToken = await response.json();
    if(loginToken.success){
        //redirect
        localStorage.setItem('token', loginToken.authToken); 
        setAuthToken(localStorage.getItem('token'));
        navigateTo('/');
        props.showAlert('Logged In successfully', 'success')
    }
    else {
        props.showAlert('Username or Password may be incorrect', 'warning');
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <form className="card shadow p-4 col-lg-6 col-md-8 col-sm-12" onSubmit={handleLogin}>
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
        <button
          type="submit"
          className="btn btn-primary btn-block mt-2"
        >
          LogIn
        </button>
      </form>
    </div>
  );
};

export default Login;