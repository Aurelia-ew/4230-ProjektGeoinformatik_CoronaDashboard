import * as React from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from '@mui/material/CardActionArea';

import "./Footer_display.css";

function Footer() {
  // Infos Schweiz Box
  const cards = [
    {
      id: 1,
      title: 'Totale Anschteckungen:',
      description: 'Wert',
    },
    {
      id: 2,
      title: 'Tägliche Neuansteckungen:',
      description: 'Wert',
    },
    {
      id: 3,
      title: 'Totale Todesfälle:',
      description: 'Wert',
    },
    {
      id: 4,
      title: 'Totale Hospitalisierungen:',
      description: 'Wert',
    },
  ];

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
        
        <div className="info">
          <h4>Infos zur Schweiz:</h4>
          <Box className="info-box">
            {cards.map((card) => (
              <Card key={card.id}>
                <CardContent className="info-text">
                  <Typography variant="inherit">
                    {card.title}
                  </Typography>
                  <Typography variant="Subtitle1" color="black">
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </div>
        
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