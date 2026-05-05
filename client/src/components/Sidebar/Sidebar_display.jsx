import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { VegaEmbed } from "react-vega";
import Faelle from "../Diagramm/Faelle.json";
import tagFaelle from "../Diagramm/tagFaelle.json"
import Tod from "../Diagramm/Tod.json"
import Hosp from "../Diagramm/Hosp.json"

import "./Sidebar_display.css";
import { None } from "vega";

function Sidebar({thema, value, kanton, setKanton, chData, coronadata, durchschnitt, flaeche, datum}) {
  const specs = {Ansteckungen: Faelle, Taegliche_Neuansteckungen: tagFaelle, Hospitalisierungen: Hosp, Todesfaelle: Tod};
  const aktuelleSpec = specs[thema] || Faelle;
  
  const [info, setInfo] = useState(null)
  const durchschnittData = durchschnitt?.[0];
  const flaecheData = flaeche?.[0]
  const format = (num) => num ? num.toLocaleString('de-CH') : '-';

  const chartData = coronadata.map((d) => ({
  ...d,
  __selected: String(d.date).slice(0, 10) === datum
  }));
  
  const specMitDaten = {
    ...aktuelleSpec,
    data: {
      values: chartData,
    },
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handelClick = (event) => {setAnchorEl(event.currentTarget);};
  const handleClose=() => {setAnchorEl(null);};
  const handleSelect = (value) => {setKanton(value); handleClose();};
  
  const kantone = [
  { code: "AG", name: "Aargau" },
  { code: "AI", name: "Appenzell Innerrhoden" },
  { code: "AR", name: "Appenzell Ausserrhoden" },
  { code: "BE", name: "Bern" },
  { code: "BL", name: "Basel-Landschaft" },
  { code: "BS", name: "Basel-Stadt" },
  { code: "FR", name: "Fribourg" },
  { code: "GE", name: "Genève" },
  { code: "GL", name: "Glarus" },
  { code: "GR", name: "Graubünden" },
  { code: "JU", name: "Jura" },
  { code: "LU", name: "Luzern" },
  { code: "NE", name: "Neuenburg" },
  { code: "NW", name: "Nidwalden" },
  { code: "OW", name: "Obwalden" },
  { code: "SG", name: "St. Gallen" },
  { code: "SH", name: "Schaffhausen" },
  { code: "SO", name: "Solothurn" },
  { code: "SZ", name: "Schwyz" },
  { code: "TG", name: "Thurgau" },
  { code: "TI", name: "Tessin" },
  { code: "UR", name: "Uri" },
  { code: "VD", name: "Waadt" },
  { code: "VS", name: "Wallis" },
  { code: "ZG", name: "Zug" },
  { code: "ZH", name: "Zürich" },
  { code: "FL", name: "Liechtenstein" }];

  const kantonName = kantone.find(k => k.code === kanton)?.name;

  return (
    <aside>
      <Card sx={{ minWidth: 300, boxShadow: None}} className="card">
        <CardContent>
          <div className="titel">
            <Typography
              sx={{ color: "text.primary", fontSize: 18, fontWeight: "bold", fontFamily:"Arial" }}>
              Informationen zum Kanton: {" "}
                {kanton ? (kantonName) : (
                  <span style={{ color: "#aaa", fontWeight: "lighter", fontFamily:"Arial"}}>
                    "Bitte wähle einen Kanton aus"
                  </span>)}
            </Typography>
            <Tooltip title="Kanton auswählen" arrow>
              <IconButton aria-label="filter" onClick={handelClick}>
                <FilterAltOutlinedIcon fontSize="large"/>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
                {kantone.map((item) => (<MenuItem key={item.code} onClick={() => handleSelect(item.code)}>
                {item.name}
                </MenuItem>))}
              </Menu>
            </Tooltip>
          </div>
          <Typography sx={{ color: "text.primary", fontSize: 16 }}>
            Kantonsfläche: {format(flaecheData?.flaeche)} km^2
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