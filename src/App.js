import React, {useState} from 'react';
import About from './components/about';
import Home from './components/home';
import Navbar from './components/navbar';
import Alert from './components/alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/noteState';

const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      message,
      type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 1700)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <div className="mt-2">
            <Alert alert={alert} showAlert={showAlert}/>
          </div>
          <div className="my-5">
            <Routes>
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  )
}
export default App