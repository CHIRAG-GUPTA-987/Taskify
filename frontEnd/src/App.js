import React, { useState } from "react";
import About from "./components/about";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import UserState from "./context/users/userState";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

const App = () => {
  const notify = (type, content) => {
    switch (type) {
      case 'success': toast.success(content);
        break;
      case 'warning': toast.warn(content);
        break;
      case 'danger': toast.error(content);
        break;
      case 'info': toast.info(content);
    }
  };
  const showAlert = (message, type) => {
    notify(type, message);
  };
  return (
    <>
      <UserState>
        <NoteState>
          <Router>
            <Navbar showAlert={showAlert} />
            <ToastContainer
              position="bottom-left"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored" />
            <div className="my-4 mainSection">
              <Routes>
                <Route
                  exact
                  path="/Login"
                  element={<Login showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/SignUp"
                  element={<SignUp showAlert={showAlert} />}
                />
                <Route exact path="/about" element={<About />} />
                <Route
                  exact
                  path="/"
                  element={<Home showAlert={showAlert} />}
                />
              </Routes>
            </div>
          </Router>
        </NoteState>
      </UserState>
    </>
  );
};
export default App;
