import React, {useContext, useState} from "react";
import NoteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const noteContext = useContext(NoteContext);
  const {addNote} = noteContext;
  const [newNote, setNewNote] = useState({title: "", description: "", tag: "default"})
  const [flag, setFlag] = useState(false);
  const addTheNote = async e =>{
    e.preventDefault();
    if(newNote.title && newNote.description  && flag){
        setFlag(false);
        document.querySelector('#title').value=document.querySelector('#description').value=document.querySelector('#tag').value=document.querySelector('#invalidCheck').value="";
        document.querySelector('#invalidCheck').checked=false;
        props.showAlert('Note added successfully', 'success');
        addNote(newNote);
    }
    else{
      props.showAlert('Error encountered while adding note', 'danger')
    }
  }
  const updateInfo = (e) =>{
    setNewNote({...newNote, [e.target.name]: e.target.value})
  }
  const updateFlag = e => {
      setFlag(!flag);
  }
  return (
    <div className="container">
      <h2 className="my-3">Add Your Notes</h2>
      <div className="form container my-3 d-flex justify-content-center align-items-center row">
        <form className="needs-validation card p-4 col-sm-12 col-md-10 col-lg-6 shadow">
          <div className="form-row">
            <div className="mb-3">
              <label htmlFor="title" className="mb-1">Title</label>
              <input
                type="text"
                className="form-control w-100"
                id="title"
                placeholder="Title of the Note"
                name="title"
                minLength="3"
                required
                onChange={updateInfo}
              />
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">
                Please provide a Title upto 3 places.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="mb-1">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Describe about your Note"
                name="description"
                required
                onChange={updateInfo}
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
          </div>
          <div className="form-row">
            <div className="mb-3">
              <label htmlFor="tag" className="mb-1">Tag</label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                placeholder="default"
                onChange={updateInfo}
              />
              <div className="invalid-feedback">
                Please provide a valid city.
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="invalidCheck"
                required
                onClick={updateFlag}
              />
              <label className="form-check-label" htmlFor="invalidCheck">
                I Agree to Add a Note on behalf of my name
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <button disabled={newNote.title.length < 3 || newNote.description.length < 10 ||  !flag} onClick={addTheNote} className="btn btn-primary btn-block mt-2" type="submit">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
