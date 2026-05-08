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
  const[datum, setDatum] = useState("2020-02-25")

  const[value, setValue] = useState(0);
  const[playing, setPlaying] = useState(false);
  const startDate = new Date("2020-02-01");

  // Corondaten für die Karte nach Datum 
  const[mapData, setMapData] = useState([]);
  useEffect(() => {
  fetch(`http://localhost:8000/corona-map?datum=${datum}`)
    .then((res) => res.json())
    .then((data) => setMapData(data))
    .catch(() => setMapData([]));
  }, [datum]);
 
  // Coronadaten der Schweiz nach Datum
  const[chData, setChData] = useState([]);
  useEffect(() => {
  fetch (`http://localhost:8000/schweiz?datum=${datum}`)
    .then((res) => res.json())
    .then((data) => setChData(data))
    .catch(() => setChData([]));
  }, [datum]);

  // Coronadaten Kanton und Schweiz einlesen für die Diagramme
  // je nach dem ob ein Kanton ausgewählt wird, wird die eine oder die andere Api aufgerufen
  const[coronadata, setCoronadata] = useState([]);
  useEffect(()=> {
    const url = kanton
    ? `http://localhost:8000/corona?kanton=${kanton}`
    : `http://localhost:8000/schweiz-verlauf`;
    fetch(url)
    .then((res) =>res.json())
    .then((data) => setCoronadata(data))
    .catch(() => setCoronadata([]));
  }, [kanton])

  // Flächen der Kantone für Sidebar
  const[flaeche, setflaeche] = useState([]);
  useEffect(() => {
  fetch (`http://localhost:8000/flaeche?kanton=${kanton}`)
    .then((res) => res.json())
    .then((data) => setflaeche(data))
    .catch(() => setflaeche([]));
  }, [kanton]);

  // Durchschnittliche Fälle pro Kanton für Sidebar
  const [durchschnitt, setDurchschnitt] = useState([]);
  useEffect(() => {
  fetch (`http://localhost:8000/durchschnitt?kanton=${kanton}`)
    .then((res) => res.json())
    .then((data) => setDurchschnitt(data))
    .catch(() => setDurchschnitt([]));
  }, [kanton]);

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
      kanton={kanton}/> 
      <main className="main"> 
        <div className="map">
          <Map 
          kanton={kanton}
          setKanton={setKanton}
          thema={thema}
          mapData={mapData}
          chData={chData}
          datum={datum}/> 
        </div>
        <div className="sidebar">
          <Sidebar
          thema={thema}
          value={value}
          kanton={kanton}
          setKanton={setKanton}
          chData={chData}
          coronadata={coronadata}
          durchschnitt={durchschnitt}
          flaeche={flaeche}
          datum={datum}/>
        </div>
      </main>
      <Footer
      value={value}
      setValue={setValue}
      playing={playing}
      setPlaying={setPlaying}
      datum={datum}
      coronadata={coronadata}/>  
  </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode> 
    <CoronaDashboard/>
  </StrictMode>);
