import React, {useContext, useEffect} from 'react'
import NoteContext from '../context/notes/noteContext'

const About = () => {
    const a = useContext(NoteContext);
    useEffect(() => {
            setTimeout(()=>{
                a.update('Aditya', '20');
            }, 1000)
            // eslint-disable-next-line
    }, [])
    return (
        <>
            This is about {a.state.name} and he is currently {a.state.age} years old.
        </>
    )
}

export default About