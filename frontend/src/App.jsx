import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [data, setData] = useState([])

  
  //fetch("http://127.0.0.1:8000/").then(res => res.json()).then(json => console.log(json));

  useEffect(()=> {
    const fun = async () => {
      const res = await fetch("http://127.0.0.1:8000/");
      const data = await res.json();
      setData(data);
      
    }
    fun();
  },1000)

  return (
    <>
      <h2>{
        data.map((x) => (<h2>{x.employee} - {x.department}</h2>))
        }</h2>
    </>
  )
}

export default App
