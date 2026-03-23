import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Header from "./components/Header/Header_display.jsx";
import Footer from "./components/Footer/Footer_display.jsx";
import Map from "./components/Map/Map_display.jsx";
import Sidebar from "./components/Sidebar/Sidebar_display.jsx";

function CoronaDashboard(){

  return (
    <> 
      <Header /> 
      <main className="main"> 
        <div className="map">
          <Map/> 
        </div>
        <div className="sidebar">
          <Sidebar/>
        </div>
      </main>
      <Footer/>
  </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode> 
    <CoronaDashboard/>
  </StrictMode>);
