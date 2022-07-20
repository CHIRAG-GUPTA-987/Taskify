import React, {useContext} from 'react'
import NoteContext from '../context/notes/noteContext';
import Note from './note';

const Notes = () => {
    const contextNotes = useContext(NoteContext);
    const {notes, setNotes} = contextNotes;
    return (
        <div className="row">
            {notes.map(note=>{
                return <Note note={note}/>
            })}
        </div>
    )
}

export default Notes