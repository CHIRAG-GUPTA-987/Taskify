import React from 'react';
import About from './components/about'
import Home from './components/home'
import Navbar from './components/navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/noteState';

const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Routes>
            <Route exact path="/about" element={<About/>} />
            <Route exact path="/" element={<Home/>} />
          </Routes>
        </Router>
      </NoteState>
    </>
  )
}
export default App