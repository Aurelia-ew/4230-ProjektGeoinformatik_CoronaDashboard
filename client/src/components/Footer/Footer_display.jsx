import * as React from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import "./Footer_display.css";

function Footer() {
  // Slider
  const [value, setValue] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  
  const marks = [
  {value: 0, label: '',},
  {value: 25, label: '',},
  {value: 50, label: '',},
  {value: 75, label: '',},
  {value: 1556, label: '',},];

  React.useEffect(() => {
    if (!playing) return;
    
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= 1556) return 0; 
        return prev + 1;
      });
    }, 200);
    
    return() => clearInterval(interval);
  }, [playing])

  return (
    <footer >
      <div className="footer-content">
        <h3>Datum: </h3>
  
        <div className="slider-box">
          <IconButton onClick={() => setPlaying(!playing)}>
            {playing ? <PauseIcon fontSize="medium"/> : <PlayArrowIcon fontSize="medium"/>}
          </IconButton>

          <Box className="slider">
            <Slider
              aria-label="Custom marks"
              min={0}
              max={1556}
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
              defaultValue={0}
              step={1}
              valueLabelDisplay="auto"
              marks={marks}/>
          </Box>
        </div>
      </div>
    </footer>
  );
}

export default Footer;