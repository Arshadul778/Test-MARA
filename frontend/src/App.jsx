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
      <h1>{
        data.map((x) => (<h1>{x.employee} - {x.department}</h1>))
        }</h1>
    </>
  )
}

export default App
