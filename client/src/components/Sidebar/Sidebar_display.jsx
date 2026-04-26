import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { VegaEmbed } from "react-vega";
// import { VegaLite } from "react-vega";
import Faelle from "../Diagramm/Faelle.json";
import tagFaelle from "../Diagramm/tagFaelle.json"
import Tod from "../Diagramm/Tod.json"
import Hosp from "../Diagramm/Hosp.json"

import "./Sidebar_display.css";
import { None } from "vega";

function Sidebar({thema, value, kanton}) {
  const specs = {Ansteckungen: Faelle, Taegliche_Neuansteckungen: tagFaelle, Hospitalisierungen: Hosp, Todesfaelle: Tod};
  const aktuelleSpec = specs[thema] || Faelle;
  
  const [data, setData] = useState([]);
  const [info, setInfo] = useState(null);

  useEffect(()=> {
    if (!kanton) return;
    fetch(`http://localhost:8000/corona?kanton=${kanton}`)
    .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {console.log("API Daten:", data);setData(data)})
      .catch((err) => {console.error("Fehler Beim Laden der Daten:", err);
      setData([]);});
  }, [kanton, thema]);

  const specMitDaten = {
    ...aktuelleSpec,
    data: {
      values: data,
    },
  };

  return (
    <aside>
      <Card sx={{ minWidth: 300, boxShadow: None}} className="card">
        <CardContent>
          <Typography
            sx={{ color: "text.primary", fontSize: 18, fontWeight: "bold" }}>
            Informationen zum Kanton
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 16 }}>
            Kanton: 
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 16 }}>
            Kantonsfläche: 
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 16 }}>
            Einwohner: 
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 16 }}>
            Totale Ansteckungen: 
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 16 }}>
            druchschnittliche Ansteckungen pro Tag:
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 16 }}>
            Totale Todesfälle: 
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 16 }}>
            Totale Hospitalisierungen:
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 16 }}>
            Massnahmen die der Kanton getroffen hat:
          </Typography>

        </CardContent>
      </Card>
        
        <div className="chart">
          <VegaEmbed 
            spec={specMitDaten} 
            options={{actions:false}} 
            style={{ width: "100%"}}/>
        </div>
      
    </aside>
  );
}

export default Sidebar;