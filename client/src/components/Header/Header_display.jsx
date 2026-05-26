import {useState} from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from "@mui/icons-material/Close";
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

  // Mappt die Kantonskürzel auf die Namen der Kantone, damit der Zoom auf den ausgewählten Kanton in der Karte funktioniert
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

  // Reactfunktion für das Öffnen des Easter Eggs
  const [virusOpen, setVirusOpen] = useState(false);

  // Liste mit allen Themen für die Buttons später
  const buttons = [
    {id: "Ansteckungen", label:"Ansteckungen"},
    {id: "Taegliche_Neuansteckungen", label:"Tägliche Neuansteckungen"},
    {id: "Todesfaelle", label:"Todesfälle"},
    {id: "Hospitalisierungen", label:"Hospitalisierungen"}
  ]

  // Beim Starten der Webseite oder beim Zurücksetzen auf den Anfang ist das Thema Ansteckungen ausgewählt
  const [activeButton, setActiveButton] = useState("Ansteckungen");

  return (
    <header>
      {/* Bild vom Virus im Header anzeigen. Beim Draufcklicken kommt das Easteregg (weiter unten definiert)*/}
      <img src="public/virus.png" alt="Virus" width="70" height="70"
      style={{cursor: "pointer"}}
      onClick={() => setVirusOpen(true)}/>

      {/*  Erstellen des Titels und der Buttons zur Themenauswahl*/}
      <div className='titel'>
        <h1>Corona Dashboard</h1>
        <div className="thema">
              {buttons.map((btn) => ( /* Mapfunktion die über die Liste buttons iterriert und diese erstellt */
                <Button
                  key={btn.id}
                  onClick={() => {setActiveButton(btn.id); setThema(btn.id);}}
                  className={activeButton === btn.id ? "active" : ""}>
                  {btn.label}
                </Button>
              ))}
            </div>
      </div>

      {/* Die zwei Buttons auf der Rechten Seite vom Header*/}
      <Stack className="buttons" direction="row" spacing={1}>
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

        {/* Fenster mit den Infos zur Webseite, öffnet sich wenn auf das Infoicon geklickt wird */}
        <Dialog open={info}>
          <DialogTitle>
            <h3>Informationen zur Webseite</h3>
            <IconButton
              aria-label="close"
              onClick={() => setInfo(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "grey",
              }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography>
              Autorinnen: Aurelia Weickgenannt und Pascal Schmid
              <br />
              <br />
              Fokusfrage: Wie hat sich die Coronapandemie in der Schweiz ausgebreitet bzw. verlaufen?
              <br />
              <br />
              <a
                href="https://github.com/Aurelia-ew/4230-ProjektGeoinformatik_CoronaDashboard/tree/main"
                target="_blank"
                rel="noopener noreferrer">
                Hier gehts zum GitHub Repository
              </a>
              <br />
              Die Instalationsanleitung für die Webseite und alle zugehörigen Tools ist im Readme im GitHub Repository zu finden.
              <br />
              <br />
              <a
                href="https://aurelia-ew.github.io/4230-ProjektGeoinformatik_CoronaDashboard/"
                target="_blank"
                rel="noopener noreferrer">
                Hier gehts zur GitHub Page
              </a>
              <br />
              Auf der GitHub Page sind die Funktionen der einzelnen Komponenten nochmal beschrieben. 
              Zusätzlich sind auch Informationen zu den Daten, dem Backend und den Schnittstellen zu finden.
              <br />
            </Typography>
          </DialogContent>
        </Dialog>

        {/* Fenster öffnet sich wenn man auf das Virusicon glickt */}
        <Dialog open={virusOpen}  maxWidth="md">
          <DialogTitle> 
            <h3>Cheers und bleibt gesund :)</h3>
            <IconButton
              aria-label="close"
              onClick={() => setVirusOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "grey",
              }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <img src="public/Scrat_Flasche.png" alt="Scrat mit Flasche" style={{ width:"100%", height: "auto"}}/>
          </DialogContent>
        </Dialog>
      </Stack>
    </header>
  );
}
export default Header;
