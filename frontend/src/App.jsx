import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';





export default function App(){
  const [flag, setFlag] = useState(0);
  const [user, setUser] = useState('');
  const [id, setid] = useState('');
  const [s_key, sets_key] = useState('');



  // for login
  function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const onLoginClick = () => {

      const url = 'http://127.0.0.1:8000/login/';
      const data = {
        username: username,
        password: password
      };

      axios.post(url, data)
        .then(response => {
          sets_key(response.data.session_key)
          setUser(username);
          setid(response.data.user.id);
          setFlag(1);
        })
        .catch(error => {
          console.error('There was a problem with the request:', error);
        });
    };
  
    return (
      <>
        <div className={'mainContainer'}>
          <div className={'titleContainer'}>
            <div>Login</div>
          </div>
          <br />
          <div className={'inputContainer'}>
            <input
              placeholder="Enter your Username here"
              className={'inputBox'}
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <br />
          <div className={'inputContainer'}>
            <input
              placeholder="Enter your password here"
              className={'inputBox'}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <div className={'inputContainer'}>
            <button className='btn' onClick={onLoginClick}>Login</button>
          </div>
        </div>
      </>
    );
  }
// end login  



function ImageList() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/models/');
      setModels(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleModelClick = (model) => {
    setSelectedModel(model);
  
  };

  if (selectedModel==null){
  return (
    <div className="container">
      <div className="column">
        <h2>Image Names</h2>
        <ul>
          {models.map(model => (
            <li key={model.id} onClick={() => handleModelClick(model)}>
              {model.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );}
  else {
    return (
      <>
      <Get_profile selectedModel={selectedModel}/>
      
      </>
    );
  }
}

//
function Get_profile({ selectedModel }){
  const [data, setdata] = useState({});
  const [model_data, setModel_data] = useState({});
  const [user_rating, setUser_rating] = useState(0);
  const [model_id,setModel_id]=useState(0);
  const base_url = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchData(selectedModel.id); // Fetch data for initial ID (e.g., 4)
    setModel_id(selectedModel.id);
  }, []);

  const fetchData = async (m_id) => {
    try {
      const send_data = {
        u_id: id,
        m_id: m_id
      };
      const res = await axios.post(`http://127.0.0.1:8000/get/`,send_data);
      setdata(res.data);
      setModel_data(res.data.model_name);
      setUser_rating(res.data.rating);
      setModel_id(res.data.model_name.id);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const next = () => {
    const inc = model_id + 1;
    fetchData(inc); 
  };

  const previous = ()=> {
    const dic = model_id - 1;
    fetchData(dic);
  };

  const increase = (incs)=>{
    const updatedRating = user_rating + incs;
    if (updatedRating<=10){
     axios.patch(`http://127.0.0.1:8000/rating/${data.id}/`, {rating:updatedRating})
     .then(res => setUser_rating(res.data.rating))
     .catch(error => console.error(error));
    }
    else {
      console.log('Maximum Rating is 10')
    }

  };
  
  
  return (
    <>
    <div className="container">
      <div className='top'> 
      <h1>&#9782;</h1>
      <div className="image-container">
        <div className='text1'>
          <h3>{model_data.discriptions}</h3>
        </div>
        <img src={`${base_url}${model_data.img}`} alt={model_data.name} width={700} height={400}/>
        <div className='text2'>
          <ul>
            <li><h2>Name:{model_data.name}</h2></li>
            <li><h2>Age :18</h2></li>
            <li><h2>Height :5'4"</h2></li>
            <li><h2>Weight :50 kg</h2></li>
          </ul>
          </div>
      </div>
      <h2>Rating : {user_rating}</h2>
      </div>
      <div className='btncn'>
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
    
    <button className='btn b1' onClick={next}>{'>'}</button>
    </div>
    </div>

    </>
  );
}


  // for logout
  function Logout(){

    const onButtonClick = () => {
      const url = 'http://127.0.0.1:8000/logout/';
      const data = {
        session_key: s_key
      };
      try {
        axios.post(url,data);
        setUser('');
        setFlag(0);
      } catch (error) {
        console.error('There was a problem with the logout:', error);
      }
    };
  
    return (
        <>
        <div className="header">
          <button className="btn" >Home</button>
          <h2>{user}</h2>
          <button className="btn" onClick={onButtonClick}>Logout</button>
        </div>
        </>
  
    );
  }

  // end logout

  if (flag==0){
  return(
    <>
    <Login/>
    </>

  );}
  else{
    return(
      <>
      <div>
      <Logout/>
      </div>
      <div>
        <ImageList/>
      </div>
      
  
      </>
    );
  }
}


// my comp  for getting rating
// function MyComponent() {
//   // Define state to store the fetched data
//   const [userIds, setUserIds] = useState([]);
//   const my_id = 5; // Replace '5' with your desired user ID

//   // Function to fetch data
//   const fetchData = async () => {
//     try {
//       // Make GET request to fetch data
//       const response = await axios.get('http://127.0.0.1:8000/rating/');

//       // Filter data based on user.id === my_id and extract only the 'id' values
//       const filteredIds = response.data.filter(item => item.user.id === my_id).map(item => item.id);

//       // Set the filtered IDs in state
//       setUserIds(filteredIds);
//     } catch (error) {
//       // Handle error
//       console.error('Error fetching data:', error);
//     }
//   };

//   // Fetch data when component mounts
//   useEffect(() => {
//     fetchData();
//   }, []); // Empty dependency array ensures useEffect runs only once

//   return (
//     <div>
//       {userIds.length > 0 ? (
//         <div>
//           {/* Render the filtered IDs */}
//           <ul>
//             {userIds.map(id => (
//               <li key={id}>{id}</li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>No data found</p>
//       )}
//     </div>
//   );
// }


// end my
// function ImageInfo({ selectedModel }) {
//   console.log("hdf");
//   return (
//     <div className="image-info">

//       {selectedModel && (
//         <>
//           <h2>Image Info</h2>
//           <img src={selectedModel.img} alt={selectedModel.name} />
//           <p>ID: {selectedModel.id}</p>
//           <p>Name: {selectedModel.name}</p>
//         </>
//       )}
//     </div>
//   );
// }



  // function Home(){

  //   if (flag==0){
  //     console.log("login")
  //   return(
  //     <>
  //     <Login/>
  //     </>
  
  //   );}
  //   else{
  //     return(
  //       <>
  //       <div>
  //       <Logout/>
  //       </div>
  //       <div>
  //         <ImageList/>
  //       </div>
        
    
  //       </>
  //     );
  //   }
  // }


  // for profile
  // function Profile(){

  //   return(
  //     <>
  //     <div className="profile">
  //     <img
  //       src="https://i.imgur.com/MK3eW3As.jpg"
  //       alt="Katherine Johnson"
  //     />
  //     </div>
  //     <MyComponent/>
    
  //     </>
  //   );
  // }
// end profile