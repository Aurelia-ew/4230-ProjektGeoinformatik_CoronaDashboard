import React, {StrictMode, useState, useEffect} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Header from "./components/Header/Header_display.jsx";
import Footer from "./components/Footer/Footer_display.jsx";
import Map from "./components/Map/Map_display.jsx";
import Sidebar from "./components/Sidebar/Sidebar_display.jsx";

function CoronaDashboard(){
  const[thema, setThema] = useState("Ansteckungen")
  const[kanton, setKanton] = useState("")
  const[info, setInfo] = useState(false);

  const[value, setValue] = useState(0);
  const[playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
        setValue((prev) => {
          if (prev >= 1556) return 0; 
          return prev + 1;
        });
      }, 200);
      return() => clearInterval(interval);}, [playing])
  
  return (
    <div className="app-container"> 
      <Header 
      thema={thema}
      setThema={setThema}
      info = {info}
      setInfo={setInfo}/> 
      <main className="main"> 
        <div className="map">
          <Map/> 
        </div>
        <div className="sidebar">
          <Sidebar
          thema={thema}
          value={value}/>
        </div>
      </main>
      <Footer
      value={value}
      setValue={setValue}
      playing={playing}
      setPlaying={setPlaying}/>  
  </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode> 
    <CoronaDashboard/>
  </StrictMode>);
