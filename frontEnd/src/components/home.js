import React, { useEffect } from "react";
import AddNote from "./addNote";
import Notes from "./notes";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  let navigateTo = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(token);
    if (!token) navigateTo("/Login");
  }, []);
  return (
    <div className="container">
      <AddNote showAlert={props.showAlert} />
      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
