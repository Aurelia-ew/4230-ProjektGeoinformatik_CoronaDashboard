import {useState} from "react";
import IconButton from '@mui/material/IconButton';
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import Stack from '@mui/material/Stack';
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';

import "./Header_display.css";

function Header({thema, setThema, info, setInfo, kanton, setKanton}) { 

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
  { code: "FL", name: "Liechtenstein" }
];
  const [virusOpen, setVirusOpen] = useState(false);

  const buttons = [
    {id: "Ansteckungen", label:"Ansteckungen"},
    {id: "Taegliche_Neuansteckungen", label:"Tägliche Neuansteckungen"},
    {id: "Todesfaelle", label:"Todesfälle"},
    {id: "Hospitalisierungen", label:"Hospitalisierungen"}
  ]

  const [activeButton, setActiveButton] = useState("Ansteckungen");

  return (
    <header>
      <img src="public/virus.png" alt="Virus" width="70" height="70"
      /*style={{cursor: "pointer"}}*/
      onClick={() => setVirusOpen(true)}/>
      <div className='Titel'>
        <h1>Corona Dashboard</h1>
        
        <div className="thema">
          <h2> Thema:</h2>
          <div className="button-thema">
              {buttons.map((btn) => (
                <Button
                  key={btn.id}
                  onClick={() => {setActiveButton(btn.id); setThema(btn.id);}}
                  className={activeButton === btn.id ? "active" : ""}>
                  {btn.label}
                </Button>
              ))}
            </div>
        </div>
      </div>

      <Stack className="Buttons" direction="row" spacing={1}>
        <Tooltip title="Zurück zum Statbildschirm" arrow>
          <IconButton aria-label='home' onClick={() => window.location.reload()}>
            <HomeIcon fontSize='large'/>
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Infos zur Webseite" arrow>
          <IconButton aria-label="info" onClick={() => setInfo(true)}>
            <InfoIcon fontSize="large"/>
          </IconButton>
        </Tooltip>

        <Dialog open={info} onClose={() => setInfo(false)}>
          <DialogTitle>
            <h3>Informationen zur Webseite</h3>
          </DialogTitle>
          <DialogContent>
            <Typography>
              Autorinnen: Aurelia Weickgenannt und Pascal Schmid
              <br />
              <br />
              Fokusfrage: 
              <br />
              <br />
              Weitere Informationen siehe README.md file.
              <br />
              <br />
              Datenquelle Gesamtdatensatz: 
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setInfo(false)}>
              Schliessen
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={virusOpen} onClose={() => setVirusOpen(false)} maxWidth="md">
          <DialogTitle> Easter Egg</DialogTitle>
          <DialogContent>
            <img src="public/Scrat_Flasche.png" alt="Scrat mit Flasche" style={{ width:"100%", height: "auto"}}/>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setVirusOpen(false)}>
              Schliessen
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </header>
  );
}
export default Header;
