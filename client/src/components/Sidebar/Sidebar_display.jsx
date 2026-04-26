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

function Sidebar({thema, value}) {
  const specs = {Ansteckungen: Faelle, Taegliche_Neuansteckungen: tagFaelle, Hospitalisierungen: Hosp, Todesfaelle: Tod};
  const aktuelleSpec = specs[thema] || Faelle;

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
          <VegaEmbed spec={aktuelleSpec} options={{actions:false}} style={{ width: "100%"}}/>
        </div>
      
    </aside>
  );
}

export default Sidebar;