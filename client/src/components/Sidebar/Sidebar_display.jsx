import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { VegaEmbed } from "react-vega";
import Faelle from "../Diagramm/Faelle.json";
import tagFaelle from "../Diagramm/tagFaelle.json"
import Tod from "../Diagramm/Tod.json"
import Hosp from "../Diagramm/Hosp.json"

import "./Sidebar_display.css";
import { None } from "vega";

function Sidebar({thema, value, kanton, chData, coronadata, durchschnitt}) {
  const specs = {Ansteckungen: Faelle, Taegliche_Neuansteckungen: tagFaelle, Hospitalisierungen: Hosp, Todesfaelle: Tod};
  const aktuelleSpec = specs[thema] || Faelle;
  
  const [info, setInfo] = useState(null)
  const durchschnittData = durchschnitt?.[0];
  const format = (num) => num ? num.toLocaleString('de-CH') : '-';
  
  const specMitDaten = {
    ...aktuelleSpec,
    data: {
      values: coronadata,
    },
  };

  return (
    <aside>
      <Card sx={{ minWidth: 300, boxShadow: None}} className="card">
        <CardContent>
          <Typography
            sx={{ color: "text.primary", fontSize: 18, fontWeight: "bold" }}>
            Informationen zum Kanton {kanton}
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 16 }}>
            Kantonsfläche: 
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 16 }}>
            Datenaufnahmetage: {format(durchschnittData?.aufzeichnungstage)}
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 16 }}>
            Einwohner: {format(durchschnittData?.einwohner)} Personen
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 16 }}>
            Totale Ansteckungen: {format(durchschnittData?.total_faelle)} Personen
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 16 }}>
            druchschnittliche Ansteckungen pro Tag: {format(durchschnittData?.durchschnitt)} Personen
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