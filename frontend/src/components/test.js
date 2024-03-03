import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/hotel_images_see/");
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
      {data.map((item, index) => {
        try {
          const a ="http://127.0.0.1:8000/media/";
          const imageUrl = `${a}/${item.url}`;
          return <div>
            <h3>Image Name : {item.name}</h3>
            <button className='pls'>Plus <p>{item.rating}</p></button>
            <div>
           <img key={index} src={imageUrl} alt="Hotel" className="image12" /></div>
           </div>;
        } catch (error) {
          //console.error(`Invalid image URL at index ${index}: ${item.img}`);
          return null; // Render nothing if the image URL is invalid
        }
      })}
      
    </div>
  );
}

export default App;




// useEffect(()=> {
//   const fun = async () => {
//     const res = await fetch("http://127.0.0.1:8000/");
//     const data = await res.json();
    
//     (setData(data));
    
//   }
//   fun();
// })

// return (
//   <>
//     <h2>{
//       data.map((x) => (<h2>{x.employee} - {x.department}</h2>))
//       }</h2>
//   </>
// )

 //fetch("http://127.0.0.1:8000/").then(res => res.json()).then(json => console.log(json));
  // useEffect(()=> {
  //   const fun = async () => {
  //     const res = await fetch("http://127.0.0.1:8000/hotel_images_see/");
  //     const data = await res.json();
  //     //setData(data);
  //     console.log(setData(data));
      
  //   }
  //   //fun();
  // })

  // return (
  //   <>
  //     <h2>fkfmv
        
  //       </h2>
  //   </>
  // )
