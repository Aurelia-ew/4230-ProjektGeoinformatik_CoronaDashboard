import IconButton from '@mui/material/IconButton';
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Stack from '@mui/material/Stack';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';


import "./Header_display.css";

function Header({thema, setThema, info, setInfo}) { 

  return (
    <header>
      <div className='Titel'>
        <h1>Corona Dashboard</h1>
        <h2> Thema:</h2>
      </div>

      <Stack className="Buttons" direction="row" spacing={1}>
        <Tooltip title="Zurück zum Statbildschirm" arrow>
          <IconButton aria-label='home' onClick={() => window.location.reload()}>
            <HomeIcon fontSize='large'/>
          </IconButton>
        </Tooltip>

        <Tooltip title="Thema auswählen" arrow>
          <FormControl size="small" sx={{minWidth: 250}}>
            <InputLabel id="thema-label">Thema</InputLabel>
            <Select label="Thema" value={thema} onChange={(e) => setThema(e.target.value)}>
              <MenuItem value="Ansteckungen"> Ansteckungen </MenuItem>
              <MenuItem value="Taegliche_Neuansteckungen"> Tägliche Neuansteckungen </MenuItem>
              <MenuItem value="Todesfaelle"> Todesfälle </MenuItem>
              <MenuItem value="Hospitalisierungen"> Hospitalisierungen </MenuItem>
            </Select>
          </FormControl>
        </Tooltip>
        
        <Tooltip title="Kanton auswählen" arrow>
          <IconButton aria-label="filter">
            <FilterAltOutlinedIcon fontSize="large"/>
          </IconButton>
        </Tooltip>

        <Tooltip title="Datum auswählen" arrow>
          <IconButton aria-label="calendar">
            <CalendarMonthIcon fontSize="large"/>
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
        
      </Stack>
    </header>
  );
}
export default Header;
