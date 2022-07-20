import React from 'react'

const Note = (props) => {
    const {note} = props;
    return (
        <div className="col-md-4">
            <div className="card my-3">
                <div className="card-header">
                    {note.title}
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>{note.description}</p>
                        <footer className="blockquote-footer"><cite title="Source Title">{note.tag}</cite></footer>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

export default Note
