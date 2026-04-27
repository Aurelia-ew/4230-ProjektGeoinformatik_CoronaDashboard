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
  const[datum, setDatum] = useState("2020-01-25")
  const[mapData, setMapData] = useState([]);

  const[value, setValue] = useState(0);
  const[playing, setPlaying] = useState(false);
  const startDate = new Date("2020-01-25");

  useEffect(() => {
  fetch(`http://localhost:8000/corona-map?datum=${datum}`)
    .then((res) => res.json())
    .then((data) => setMapData(data))
    .catch(() => setMapData([]));
}, [datum]);
 
  const valueToDate = (value) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + value - 1);
    return date.toISOString().split("T")[0];
    };
  
  useEffect(() => {
  const neuesDatum = valueToDate(value);
  setDatum(neuesDatum);}, [value]);

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
      setInfo={setInfo}
      kanton={kanton}
      setKanton={setKanton}/> 
      <main className="main"> 
        <div className="map">
          <Map 
          kanton={kanton}
          setKanton={setKanton}
          thema={thema}
          mapData={mapData}/> 
        </div>
        <div className="sidebar">
          <Sidebar
          thema={thema}
          value={value}
          kanton={kanton}/>
        </div>
      </main>
      <Footer
      value={value}
      setValue={setValue}
      playing={playing}
      setPlaying={setPlaying}
      datum={datum}/>  
  </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode> 
    <CoronaDashboard/>
  </StrictMode>);
