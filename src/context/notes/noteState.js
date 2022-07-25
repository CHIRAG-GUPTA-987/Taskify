import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState(null);
  const port = "http://localhost:4000";
  const authToken = localStorage.getItem("token");
  //fetching all notes
  const fetchNotes = async () => {
    if (authToken) {
      const url = `${port}/notes/fetchNotes`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          "auth-token": authToken,
        },
      });
      const notesJSON = await response.json();
      setNotes(notesJSON);
    }
  };

  //adding notes
  const addNote = async (note) => {
    if (authToken) {
      const { title, description, tag } = note;
      const url = `${port}/notes/addNotes`;
      // eslint-disable-next-line
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });
      fetchNotes();
    }
  };

  //deleting notes
  const deleteNote = async (noteID) => {
    const url = `${port}/notes/deleteNote/${noteID}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "auth-token": authToken,
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
        "auth-token": authToken,
      },
      body: JSON.stringify({ description, tag }),
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
