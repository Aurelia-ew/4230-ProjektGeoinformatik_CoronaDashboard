import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import "./Footer_display.css";

function Footer( {value, setValue, playing, setPlaying, datum}) {
  // Slider
  const marks = [
  {value: 1, label: 'Start der Datenaufzeichnungen',},
  {value: 25, label: '25.02.2020',},
  {value: 28, label: '28.02.2020',},
  {value: 42, label: '13.03.2020',},
  {value: 45, label: '16.03.2020',},
  {value: 87, label: '27.04.2020',},
  {value: 101, label: '11.05.2020',},
  {value: 157, label: '06.07.2020',},
  {value: 293, label: '19.11.2020',},
  {value: 327, label: '23.12.2020',},
  {value: 353, label: '18.01.2021',},
  {value: 591, label: '13.09.2021',},
  {value: 689, label: '20.12.2021',},
  {value: 1556, label: 'Ende',},
];
  
  return (
    <footer >
      <div className="footer-content">
        <h3>Datum: {datum} </h3>
  
        <div className="slider-box">
          <IconButton onClick={() => setPlaying(!playing)}>
            {playing ? <PauseIcon fontSize="medium"/> : <PlayArrowIcon fontSize="medium"/>}
          </IconButton>

          <Box className="slider">
            <Slider
              aria-label="Custom marks"
              min={1}
              max={1556}
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
              defaultValue={0}
              step={1}
              valueLabelDisplay="off"
              marks={marks}
              color="balck"/>
          </Box>
        </div>
      </div>
    </footer>
  );
}

export default Footer;