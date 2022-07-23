import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState(null);
  const port = "http://localhost:4000";

  //fetching all notes
  const fetchNotes = async () => {
    const url = `${port}/notes/fetchNotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkNTExZWM4OTM5NGJhM2IwNWRmMzZiIn0sImlhdCI6MTY1ODIyMjAyNn0.SlA7tY08jR5t_i31DVXBkALdUOlaWWQTkAPeGKPov4g",
      },
    });
    const notesJSON = await response.json();
    setNotes(notesJSON);
  };

  //adding notes
  const addNote = async (note) => {
    const { title, description, tag } = note;
    const url = `${port}/notes/addNotes`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkNTExZWM4OTM5NGJhM2IwNWRmMzZiIn0sImlhdCI6MTY1ODIyMjAyNn0.SlA7tY08jR5t_i31DVXBkALdUOlaWWQTkAPeGKPov4g"
      },
      body: JSON.stringify({ title, description, tag })
    });
    fetchNotes();
  };

  //deleting notes
  const deleteNote = async (noteID) => {
    const url = `${port}/notes/deleteNote/${noteID}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkNTExZWM4OTM5NGJhM2IwNWRmMzZiIn0sImlhdCI6MTY1ODIyMjAyNn0.SlA7tY08jR5t_i31DVXBkALdUOlaWWQTkAPeGKPov4g",
      },
    });
    fetchNotes();
  };

  //updating notes
  const updateNote = async (noteID, description, tag) => {
    const url = `${port}/notes/updateNote/${noteID}`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkNTExZWM4OTM5NGJhM2IwNWRmMzZiIn0sImlhdCI6MTY1ODIyMjAyNn0.SlA7tY08jR5t_i31DVXBkALdUOlaWWQTkAPeGKPov4g",
      },
      body: JSON.stringify({description, tag})
    });
    fetchNotes();
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, updateNote, fetchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
