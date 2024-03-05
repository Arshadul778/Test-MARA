// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [dataToUpdate, setDataToUpdate] = useState({});
//   const [buttonClicked, setButtonClicked] = useState(false);

//   const handleButtonClick = () => {
//     // Update dataToUpdate state with new data if needed
//     // Example: setDataToUpdate({ name: 'John', age: 30 });
//     setButtonClicked(true);
//   };

//   useEffect(() => {
//     if (buttonClicked) {
//       // Send PUT request to the database
//       axios.put('your_api_endpoint', dataToUpdate)
//         .then(response => {
//           console.log('Data updated successfully:', response.data);
//           // Reset buttonClicked state
//           setButtonClicked(false);
//         })
//         .catch(error => {
//           console.error('Error updating data:', error);
//         });
//     }
//   }, [buttonClicked, dataToUpdate]);

//   return (
//     <div>
//       <button onClick={handleButtonClick}>Update Data</button>
//     </div>
//   );
// }

// export default App;

// ////////////


// import React, { useEffect, useState } from 'react';
// import './single.css';

// export default function SingleImg() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/users/1/");
//         if (!res.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await res.json();
//         setData(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="container">
//     <h1>&#9782;</h1>
//      <h2>{data.name}</h2>
//      <h2>{data.count}</h2>
//      <button className='btn'>Increase</button>
//     </div>
//   );
// }








// import React, { useEffect, useState } from 'react';
// import './single.css';

// export default function SingleImg() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/images/4/");
//         if (!res.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await res.json();
//         setData(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="container">
    
//       <div className='img'>
//         <img src={data.hotel_Main_Img}width='720px'/>
//       </div>
//       <dev className='details'>
//         <p>Name: {data.name}</p>
//         <p>Rating: {data.rating}</p>
//         <button className='btn'>+</button>
//         <button className='btn'>-</button>
//       </dev>
//     </div>
//   );
// }

