import AllImg from './components/imgshows';
import './App.css';
import SingleImg from './components/single_imageshow';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({count:0});

  const handleclick =  () => {

    axios.get('http://127.0.0.1:8000/users/1/')
      .then(res => setData(res.data))
      .catch(error => console.error(error));
      //const x=res.json();
      //console.log(res.count);
      //setData(res.count);
  };
  

  return (
    <div className='App'>
      <h2><button onClick={handleclick}>btn1</button></h2>
      <h2>{data.count}</h2>
      <h2><button>btn2</button></h2>
    </div>
     
  );
}

export default App;