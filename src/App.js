import React, { useState } from "react";
import About from "./components/about";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Alert from "./components/alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import UserState from "./context/users/userState";

const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message,
      type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1700);
  };
  return (
    <>
      <UserState>
        <NoteState>
          <Router>
            <Navbar showAlert = {showAlert} />
            <div className="mt-2">
              <Alert alert={alert} showAlert={showAlert} />
            </div>
            <div className="my-5">
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
