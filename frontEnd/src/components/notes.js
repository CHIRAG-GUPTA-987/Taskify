import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import UserContext from "../context/users/userContext";
import Note from "./note";

const Notes = (props) => {
  const contextNotes = useContext(NoteContext);
  const { notes, fetchNotes, deleteNote, updateNote } = contextNotes;
  const userContext = useContext(UserContext);
  const { authToken } = userContext;
  const [editNote, setEditNote] = useState({
    title: "",
    editDescription: "",
    editTag: "",
    description: "",
    tag: "",
    _id: "",
  });
  const [delNote, setDelNote] = useState({
    title: "",
    _id: "",
  });

  const refDel = useRef(null),
    refEdit = useRef(null);

  const DeleteNote = (currNote) => {
    setDelNote({
      title: currNote.title,
      _id: currNote._id,
    });
    refDel.current.click();
  };
  const UpdateNote = (currNote) => {
    setEditNote({
      title: currNote.title,
      editDescription: currNote.description,
      editTag: currNote.tag,
      description: currNote.description,
      tag: currNote.tag,
      _id: currNote._id,
    });
    refEdit.current.click();
  };
  const updateInfo = (e) => {
    setEditNote({ ...editNote, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchNotes();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#deleteModal"
        ref={refDel}
      ></button>

      <div
        className="modal fade"
        id="deleteModal"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                {delNote.title}...
              </h5>
            </div>
            <div className="modal-body">
              Are you sure the task <strong>{delNote.title}</strong> is
              completed?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  deleteNote(delNote._id);
                  props.showAlert(
                    `Task ${delNote.title} completed Successfully`,
                    "warning"
                  );
                }}
                data-bs-dismiss="modal"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
        ref={refEdit}
      ></button>

      <div
        className="modal fade"
        id="editModal"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                {editNote.title}...
              </h5>
            </div>
            <div className="modal-body">
              <form className="needs-validation">
                <div className="form-row">
                  <div className="mb-3">
                    <label htmlFor="editDescription" className="mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editDescription"
                      value={editNote.editDescription}
                      name="editDescription"
                      required
                      onChange={updateInfo}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="mb-3">
                    <label htmlFor="editTag" className="mb-1">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editTag"
                      name="editTag"
                      value={editNote.editTag}
                      onChange={updateInfo}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  document.querySelector("#editDescription").value =
                    editNote.description;
                  document.querySelector("#editTag").value = editNote.tag;
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  updateNote(
                    editNote._id,
                    editNote.editDescription,
                    editNote.editTag
                  );
                  props.showAlert(
                    `${editNote.title} Updated Successfully`,
                    "info"
                  );
                  document.querySelector("#editDescription").value =
                    document.querySelector("#editTag").value = "";
                }}
                disabled={editNote.editDescription.length < 10}
                data-bs-dismiss="modal"
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {authToken != null && notes && notes.length > 0 && (
        <div className="container mt-3">
          <h2>Your Tasks</h2>
          <div className="row">
            {notes.map((note) => {
              return (
                <Note
                  key={note._id}
                  note={note}
                  UpdateNote={UpdateNote}
                  DeleteNote={DeleteNote}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
