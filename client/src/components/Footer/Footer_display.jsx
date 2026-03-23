import * as React from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import "./Footer_display.css";

function Footer() {
  // Slider
  const [value, setValue] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  
  const marks = [
  {value: 0, label: '2020',},
  {value: 25, label: '2021',},
  {value: 50, label: '2022',},
  {value: 75, label: '2023',},
  {value: 100, label: '2024',},];

  React.useEffect(() => {
    if (!playing) return;
    
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) return 0; 
        return prev + 1;
      });
    }, 200);
    
    return() => clearInterval(interval);
  }, [playing])

  return (
    <footer >
      <div className="footer-content">
        <h3>Zeitstrahl</h3>
        
        <div className="slider-box">
          <IconButton onClick={() => setPlaying(!playing)}>
            {playing ? <PauseIcon fontSize="large"/> : <PlayArrowIcon fontSize="large"/>}
          </IconButton>

          <Box className="slider">
            <Slider
              aria-label="Custom marks"
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
              defaultValue={0}
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </Box>
        </div>
      </div>
    </footer>
  );
}

export default Footer;