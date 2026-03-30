import IconButton from '@mui/material/IconButton';
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import FilterListIcon from '@mui/icons-material/FilterList';
import Stack from '@mui/material/Stack';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";


import "./Header_display.css";

function Header({thema, setThema}) { 

  return (
    <header>
      <h1>Corona Dashboard</h1>

      <Stack className="Buttons" direction="row" spacing={1}>
        <IconButton aria-label='home'>
          <HomeIcon fontSize='large'/>
        </IconButton>

        <FormControl size="small" sx={{minWidth: 250}}>
          <InputLabel id="thema-label">Thema</InputLabel>
          <Select label="Thema" value={thema} onChange={(e) => setThema(e.target.value)}>
            <MenuItem value="Ansteckungen"> Ansteckungen </MenuItem>
            <MenuItem value="Taegliche_Neuansteckungen"> Tägliche Neuansteckungen </MenuItem>
            <MenuItem value="Todesfaelle"> Todesfälle </MenuItem>
            <MenuItem value="Hospitalisierungen"> Hospitalisierungen </MenuItem>
          </Select>
        </FormControl>
        
        <IconButton aria-label="filter">
          <FilterListIcon fontSize="large"/>
        </IconButton>
        
        <IconButton aria-label="info">
          <InfoIcon fontSize="large"/>
        </IconButton>
      </Stack>
    </header>
  );
}
export default Header;
