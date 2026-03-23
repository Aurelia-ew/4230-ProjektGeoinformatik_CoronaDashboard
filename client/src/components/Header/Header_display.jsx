import IconButton from '@mui/material/IconButton';
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import FilterListIcon from '@mui/icons-material/FilterList';
import Stack from '@mui/material/Stack';

import "./Header_display.css";

function Header() {

  return (
    <header>
      <h1>Corona Dashboard</h1>

      <Stack className="Buttons" direction="row" spacing={1}>
        <IconButton aria-label='home'>
          <HomeIcon fontSize='large'/>
        </IconButton>
        
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
