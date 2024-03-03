import React, { useEffect, useState } from 'react';

export default function SingleImg() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/images/4/");
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
    
      <div >
        <img src={data.hotel_Main_Img}width='720px'/>
      </div>
      <dev className='details'>
        <p>Name: {data.name}</p>
        <p>Rating: {data.rating}</p>
        <button className='btn'>+</button>
        <button className='btn'>-</button>
      </dev>
    </div>
  );
}

