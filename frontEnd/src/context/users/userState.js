import React, { useState } from "react";
import UserContext from "./userContext";

const NoteState = (props) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  return (
    <UserContext.Provider
      value={{ authToken, setAuthToken }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default NoteState;
