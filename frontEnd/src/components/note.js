import React from "react";

const Note = (props) => {
  const { note, UpdateNote, DeleteNote } = props;
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card my-3 shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          {note.title}
          <div className="options">
            <i onClick={()=>{DeleteNote(note)}} className="mx-2 fa-solid fa-trash-can" />
            <i
              onClick={()=>{UpdateNote(note)}}
              className="mx-1 fa-solid fa-pen-to-square"
            />
          </div>
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{note.description}</p>
            <footer className="blockquote-footer">
              <cite title="Source Title">{note.tag}</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Note;
