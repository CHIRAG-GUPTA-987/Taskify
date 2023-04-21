import React from 'react'
import AddNote from './addNote'
import Notes from './notes'

const Home = (props) => {
    return (
        <div className="container">
            <AddNote showAlert={props.showAlert}/>
            <Notes showAlert={props.showAlert}/>
        </div>
    )
}

export default Home