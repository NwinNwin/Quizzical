import React, {useState,useEffect} from "react"
import './App.css';
import Home from './components/Home';
import Quiz from "./components/Quiz";
import blob2 from "./images/blob2.png"
import blobs from "./images/blobs.png"

function App() {
  const [start, setStart] = useState(false)

  const handleStart = () => {
    setStart(!start)
  }

  return (
    <div className="App">
       <img className="home-img2" src={blob2} alt="" />
        <img className="home-img1" src={blobs} alt="" />
      {!start ? 
      <Home handleStart = {handleStart}/> 
      : 
      <Quiz/>
      }
    </div>
  );
}

export default App;


