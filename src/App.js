import './App.css';
import React, {useState} from 'react';

function App() {
  const [name, setName] = useState('Chirag');
  const randomNameGenerate = async()=>{
    const nameURL = 'https://randomuser.me/api';
    const data = await fetch(nameURL);
    const parsedData = await data.json();
    const newName = parsedData.results[0].name;
    setName(newName.first + " " + newName.last);
  }
  return (
    <>
      <h1>{name}</h1>
      <button onClick={randomNameGenerate}>Generate another name</button>
    </>
  );
}

export default App;