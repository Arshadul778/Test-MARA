import AllImg from './components/imgshows';
import './App.css';
import SingleImg from './components/single_imageshow';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [cnt, setCnt] = useState(0);
  const [cid, setCid] = useState(0);

  useEffect(() => {
    fetchData(8); // Fetch data for initial ID (e.g., 4)
  }, []);

  const fetchData = async (id) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/images/${id}/`);
      setData(res.data);
      setCnt(res.data.rating);
      setCid(res.data.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleclick = () => {
    const inc = data.id + 1;
    fetchData(inc); // Fetch data for the next ID
  };

  const previous = ()=> {
    const dic = data.id - 1;
    fetchData(dic);
  };

  const increase = (incs)=>{
    const updatedCount = cnt + incs;
    if (updatedCount<=10){
    setCnt(updatedCount);
     axios.patch(`http://127.0.0.1:8000/images/${cid}/`, {rating:updatedCount})
      .then(res => setData(res.data))
      .catch(error => console.error(error));
    }
    else {
      console.log('Maximum Rating is 10')
    }

  };

  return (
    <>
    <div className="container">
      <h1>&#9782;</h1>
      <h2>{data.name}</h2>
      <img src={data.hotel_Main_Img} alt={data.name} width={900}/>
      <h2>{data.rating}</h2>
      <div>
          <button className='btn' onClick={()=> increase(1)}>Increase 1</button>
          <button className='btn' onClick={()=> increase(2)}>Increase 2</button>
          <button className='btn' onClick={()=> increase(3)}>Increase 3</button>
          <button className='btn' onClick={()=> increase(4)}>Increase 4</button>
          <button className='btn' onClick={()=> increase(5)}>Increase 5</button>
      </div>
      
    </div>
    <div>
    <div className='pre'>
    <button className='btn b1' onClick={previous}>{'<'}</button>
    
    <button className='btn b1' onClick={handleclick}>{'>'}</button>
    </div>
    </div>
</>
  );
}

export default App;