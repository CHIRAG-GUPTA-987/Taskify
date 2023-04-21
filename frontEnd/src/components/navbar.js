import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../context/users/userContext";

const Navbar = (props) => {
  const ref = useRef();
  const navigateTo = useNavigate();
  const userContext = useContext(UserContext);
  const { authToken, setAuthToken } = userContext;
  const location = useLocation();
  const LogOut = async () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    props.showAlert("Logged out successfully", "success");
    navigateTo("/Login");
  };
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getUserDetails = async () => {
      if (authToken != null) {
        const port = "https://taskback-jyx5.onrender.com";
        const url = `${port}/auth/getUserDetails`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });
        const userJSON = await response.json();
        setEmail(userJSON.email);
        setUserName(userJSON.userName);
      }
    };
    getUserDetails();
  }, [authToken]);
  const userDetails = () => {
    ref.current.click();
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#userDModal"
        ref={ref}
      ></button>

      <div
        className="modal fade"
        id="userDModal"
        aria-labelledby="userDModalLabel"
        aria-hidden="true"
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userDModalLabel">
                User Details
              </h5>
            </div>
            <div className="modal-body">
              <div className="userName">
                <strong>Username</strong>: <em>{userName}</em>
              </div>
              <div className="email">
                <strong>Contact</strong>: <em>{email}</em>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-light sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Taskify
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {authToken === null && (
              <div>
                <Link
                  className="btn btn-primary mx-1"
                  to="/Login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to="/SignUp"
                  role="button"
                >
                  Register
                </Link>
              </div>
            )}
            {authToken != null && (
              <div className="d-flex align-items-center">
                <i
                  className="fa-solid fa-user-tie mx-2"
                  onClick={userDetails}
                ></i>
                <div
                  className="btn btn-primary mx-1"
                  onClick={LogOut}
                  role="button"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
