import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { VegaEmbed } from "react-vega";
import Faelle_Be from "../Diagramm/Faelle_BE.json";
import Hosp_Be from "../Diagramm/Hosp_BE.json"

import "./Sidebar_display.css";

function Sidebar({thema}) {
  const specs = {Ansteckungen: Faelle_Be, Hospitalisierungen: Hosp_Be}
  const aktuelleSpec = specs[thema] || Faelle_Be;

  return (
    <aside>
      <Card sx={{ minWidth: 300 }}>
        <CardContent>
          <Typography
            sx={{ color: "text.primary", fontSize: 16, fontWeight: "bold" }}>
            Informationen zum Kanton
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 14 }}>
            Kanton: 
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 14 }}>
            Einwohner: 
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 14 }}>
            Totale Ansteckungen: 
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 14 }}>
            druchschnittliche Ansteckungen pro Tag:
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 14 }}>
            Totale Todesfälle: 
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 14 }}>
            Totale Hospitalisierungen:
          </Typography>
          <Typography sx={{ color: "text.primary", fontSize: 14 }}>
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