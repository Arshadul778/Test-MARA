import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './single.css';

export default function SingleImg() {
  const [data, setData] = useState({});
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/users/1/");
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const X = await res.json();
        setData(X);
        setCnt(X.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleclick = () => {
    const updatedCount = cnt + 1;
    setCnt(updatedCount);
    setData({...data, count: updatedCount});

    axios.patch('http://127.0.0.1:8000/users/1/', {count:updatedCount})
      .then(res => console.log("Successfully updated count"))
      .catch(error => console.error(error));
  }

  return (
    <div className="container">
      <h1>&#9782;</h1>
      <h2>{data.name}</h2>
      <h2>{data.count}</h2>
      <button className='btn' onClick={handleclick}>Increase</button>
    </div>
  );
}









// import React, { useEffect, useState } from 'react';
// import axios from 'axios'
// import './single.css';

// export default function SingleImg() {
//   const [data, setData] = useState({});
//   const [cnt, setCnt] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/users/1/");
//         if (!res.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const X = await res.json();
//         setData(X);
//         setCnt(e => X.count);
//         //console.log(cnt);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleclick = () => {
//     setCnt(cnt+1);
//     setData({...data, count:cnt});
    
//   }

//   useEffect(() => {
//     axios.patch('http://127.0.0.1:8000/users/1/', data).then( res => console.log("FUCK")).catch(error => console.error(error));
//   },[handleclick]);

//   return (
//     <div className="container">
//     <h1>&#9782;</h1>
//      <h2>{data.name}</h2>
//      <h2>{data.count}</h2>
//      <button className='btn' onClick={handleclick}>Increase</button>
//     </div>
//   );
// }





// import React, { useEffect, useState } from 'react';

// function ImageDetails() {
//   const [imageData, setImageData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/images/1/");
//         if (!res.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await res.json();
//         setImageData(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleIncreaseRating = () => {
//     if (imageData) {
//       const updatedRating = imageData.rating + 1;
//       setImageData({ ...imageData, rating: updatedRating });

//       // Update the rating in the database (send a PUT request)
//       fetch(`http://127.0.0.1:8000/images/${imageData.id}/`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ ...imageData, rating: updatedRating })
//       }).then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to update rating');
//         }
//       }).catch(error => {
//         console.error('Error updating rating:', error);
//       });
//     }
//   };

//   return (
//     <div>
//       {imageData && (
//         <div>
//           <img src={imageData.hotel_Main_Img} alt={imageData.name} />
//           <h2>{imageData.name}</h2>
//           <p>Rating: {imageData.rating}</p>
//           <button onClick={handleIncreaseRating}>Increase Rating</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImageDetails;
