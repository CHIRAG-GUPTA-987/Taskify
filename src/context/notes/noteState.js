import React, {useState} from 'react'
import NoteContext from './noteContext'

const NoteState = (props)=>{
    const InitialNotes = [
        {
            "_id": "62d7d97bd5d84c372df498a9",
            "user": "62d511ec89394ba3b05df36b",
            "title": "User 2 notes",
            "description": "These are the notes of user 2",
            "tag": "User2 tag",
            "date": "2022-07-20T07:33:20.051Z",
            "__v": 0
        },
        {
            "_id": "62d7d98ed5d84c372df498ab",
            "user": "62d511ec89394ba3b05df36b",
            "title": "User 2 notes II",
            "description": "These are the notes of user 2 II",
            "tag": "User2 II tag",
            "date": "2022-07-20T07:33:20.051Z",
            "__v": 0
        },
        {
            "_id": "62d7d97bd5d84c372df498a9",
            "user": "62d511ec89394ba3b05df36b",
            "title": "User 2 notes",
            "description": "These are the notes of user 2",
            "tag": "User2 tag",
            "date": "2022-07-20T07:33:20.051Z",
            "__v": 0
        },
        {
            "_id": "62d7d97bd5d84c372df498a9",
            "user": "62d511ec89394ba3b05df36b",
            "title": "User 2 notes",
            "description": "These are the notes of user 2",
            "tag": "User2 tag",
            "date": "2022-07-20T07:33:20.051Z",
            "__v": 0
        },
        {
            "_id": "62d7d97bd5d84c372df498a9",
            "user": "62d511ec89394ba3b05df36b",
            "title": "User 2 notes",
            "description": "These are the notes of user 2",
            "tag": "User2 tag",
            "date": "2022-07-20T07:33:20.051Z",
            "__v": 0
        },
        {
            "_id": "62d7d98ed5d84c372df498ab",
            "user": "62d511ec89394ba3b05df36b",
            "title": "User 2 notes II",
            "description": "These are the notes of user 2 II",
            "tag": "User2 II tag",
            "date": "2022-07-20T07:33:20.051Z",
            "__v": 0
        },
        {
            "_id": "62d7d97bd5d84c372df498a9",
            "user": "62d511ec89394ba3b05df36b",
            "title": "User 2 notes",
            "description": "These are the notes of user 2",
            "tag": "User2 tag",
            "date": "2022-07-20T07:33:20.051Z",
            "__v": 0
        },
        {
            "_id": "62d7d97bd5d84c372df498a9",
            "user": "62d511ec89394ba3b05df36b",
            "title": "User 2 notes",
            "description": "These are the notes of user 2",
            "tag": "User2 tag",
            "date": "2022-07-20T07:33:20.051Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(InitialNotes);
    return (
    <NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
    </NoteContext.Provider>
)}

export default NoteState;