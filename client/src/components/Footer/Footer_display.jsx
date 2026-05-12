import { useRef, useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Popover, Card, CardContent, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./Footer_display.css";

function Footer({value, setValue, playing, setPlaying, datum, coronadata}) {

  const [popoverPosition, setPopoverPosition] = useState(null);
  const [activeMark, setActiveMark] = useState(null);
  
  const marks = [
  { value: 1, label: 'Start' },     // 01.02.2020
  { value: 24, label: '' },    // 25.02.2020
  { value: 27, label: '' },    // 28.02.2020
  { value: 41, label: '' },    // 13.03.2020
  { value: 44, label: '' },    // 16.03.2020
  { value: 78, label: '' },    // 19.04.2020
  { value: 86, label: '' },    // 27.04.2020
  { value: 100, label: '' },   // 11.05.2020
  { value: 139, label: '' },   // 19.06.2020
  { value: 156, label: '' },   // 06.07.2020
  { value: 260, label: '' },   // 18.10.2020
  { value: 326, label: '' },   // 23.12.2020
  { value: 335, label: '2021' }, // 01.01.2021
  { value: 352, label: '' },   // 18.01.2021
  { value: 394, label: '' },   // 01.03.2021
  { value: 557, label: '' },   // 11.08.2021
  { value: 590, label: '' },   // 13.09.2021
  { value: 688, label: '' },   // 20.12.2021
  { value: 700, label: '2022' }, // 01.01.2022
  { value: 746, label: '' },   // 17.02.2022
  { value: 789, label: '' },   // 01.04.2022
  { value: 1065, label: '2023' }, // 01.01.2023
  { value: 1430, label: '2024' }, // 01.01.2024
  { value: 1555, label: 'Ende' },  // 05.05.2024
 ];

  const markContent = {
  1: {
    title: "01.02.2020",
    text: ` - Start der Datenaufzeichung im Kanton Genf, Jura, Basel-Landschaft und Tessin `
  },
  24: {
    title: "25.02.2020: Erster Fall",
    text: ` - Erster bestätigter COVID-19-Fall in der Schweiz (Kanton Tessin) `
  },
  27: {
    title: "28.02.2020: Erste Massnahmen",
    text: ` - Veranstaltungen mit über 1000 Personen schweizweit verboten 
            - Bundesrat erklärt die «besondere Lage» `
  },
  41: {
    title: "13.03.2020: Schulschliessungen",
    text: ` - Schulen werden schweizweit geschlossen
            - Veranstaltungen über 100 Personen verboten 
            - Erste starke Einschränkungen des öffentlichen Lebens `
  },
  44: {
    title: "16.03.2020: Lockdown",
    text: ` - Bundesrat erklärt die «ausserordentliche Lage» 
            - Restaurants, Bars und Läden (ausser Grundversorgung) geschlossen
            - Homeoffice empfohlen
            - Öffentliche Veranstaltungen verboten
            - Grenzkontrollen eingeführt `
  },
  78: {
    title: "19.04.2020: Verlängerung Lockdown",
    text: ` - Lockdown-Massnahmen verlängert
            - Weiterhin starke Einschränkungen im öffentlichen Leben `
  },
  86: {
    title: "27.04.2020: Erste Lockerung",
    text: ` - Coiffeure, Gartencenter und Baumärkte öffnen wieder
            - Spitäler dürfen nicht dringende Eingriffe wieder durchführen `
  },
  100: {
    title: "11.05.2020: Weitere Lockerung",
    text: ` - Schulen öffnen wieder
            - Restaurants und Geschäfte dürfen unter Schutzkonzepten öffnen
            - Museen und Bibliotheken öffnen wieder `
  },
  139: {
    title: "19.06.2020: Ende ausserordentliche Lage",
    text: ` - Rückkehr von der ausserordentlichen zur besonderen Lage
            - Viele nationale Einschränkungen aufgehoben `
  },
  156: {
    title: "06.07.2020: Maskenpflicht ÖV",
    text: ` - Maskenpflicht im öffentlichen Verkehr eingeführt `
  },
  260: {
    title: "18.10.2020: Maskenpflicht Innenräume",
    text: ` - Maskenpflicht in allen öffentlich zugänglichen Innenräumen
            - Private Treffen eingeschränkt `
  },
  326: {
    title: "23.12.2020: Impfstart",
    text: ` - Start der COVID-19-Impfkampagne in der Schweiz
            - Erste Impfungen für Risikogruppen `
  },
  352: {
    title: "18.01.2021: Verschärfung",
    text: ` - Läden (ausser Grundversorgung) wieder geschlossen
            - Homeoffice-Pflicht eingeführt
            - Private Treffen stark eingeschränkt `
  },
  394: {
    title: "01.03.2021: Lockerung",
    text: ` - Erste Lockerungen treten in Kraft
            - Geschäfte, Museen und Aussenbereiche öffnen wieder
            - Treffen im Freien erlaubt `
  },
  557: {
    title: "11.08.2021: Delta-Welle",
    text: ` - Bund hält bestehende Massnahmen wegen Delta-Variante aufrecht `
  },
  590: {
    title: "13.09.2021: Zertifikatspflicht",
    text: ` - COVID-Zertifikat Pflicht in Restaurants, Bars und Innenräumen
            - Gilt für Kultur-, Freizeit- und Sporteinrichtungen innen `
  },
  688: {
    title: "20.12.2021: 2G-Regel",
    text: ` - 2G-Regel für viele Innenräume
            - Teilweise zusätzliche Masken- oder Sitzpflicht
            - Homeoffice wieder empfohlen bzw. ausgeweitet `
  },
  746: {
    title: "17.02.2022: Aufhebung fast aller Massnahmen",
    text: ` - Aufhebung der meisten Corona-Massnahmen
            - Keine Zertifikatspflicht mehr
            - Keine Maskenpflicht in den meisten Bereichen `
  },
  789: {
    title: "01.04.2022: Ende der besonderen Lage",
    text: ` - Letzte nationalen Massnahmen aufgehoben
            - Verantwortung geht weitgehend an die Kantone über `
  },
  1555: {
    title: "05.05.2024",
    text: ` Ende der lezten Datenaufzeichung (Kanton Genf, alle anderen haben schon fürher aufgehört alles zur Pandemie zu dokumentieren) `
  },
};

const startDate = new Date("2020-02-01");

const dateToValue = (dateString) => {
  const selectedDate = new Date(dateString);
  const diffTime = selectedDate - startDate;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
};

const handleDateChange = (e) => {
  const selectedDate = e.target.value;
  setValue(dateToValue(selectedDate));
  setPlaying(false);
};

const closeTimerRef = useRef(null);

const closePopoverDelayed = () => {
  closeTimerRef.current = setTimeout(() => {
    setActiveMark(null);
    setPopoverPosition(null);
  }, 150);
};

const keepPopoverOpen = () => {
  if (closeTimerRef.current) {
    clearTimeout(closeTimerRef.current);
  }
};

const handleMouseMove = (event) => {
  keepPopoverOpen();

  const slider = event.currentTarget;
  const rect = slider.getBoundingClientRect();

  const percent = (event.clientX - rect.left) / rect.width;
  const value = Math.round(percent * (coronadata.length - 1));

  const found = marks.find((m) => Math.abs(m.value - value) <= 6);

  if (found) {
    const markPercent = found.value / (coronadata.length - 1);
    let left = rect.left + rect.width * markPercent;

    const POPUP_WIDTH = 100;
    const margin = 16;

    left = Math.max(
      margin + POPUP_WIDTH / 2,
      Math.min(window.innerWidth - margin - POPUP_WIDTH / 2, left)
    );

    setActiveMark(found.value);

    const gap = rect.height - 30 ;
    setPopoverPosition({
      top: rect.top - gap,
      left,
    });
  }
};
  
const handleMouseLeave = () => {
  closePopoverDelayed();
};
  
  return (
    <footer >
      <div className="footer-content">
        <div className="datum">
          <h3> 
            Datum: {new Date(datum).toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'})} 
          </h3>
          <Box className="kalender">
            <DatePicker
              selected={new Date(datum)}
              onChange={(date) => {
                const formatted = date.toISOString().split("T")[0];
                handleDateChange({ target: { value: formatted } });
              }}
              minDate={new Date("2020-01-31")}
              maxDate={new Date("2024-05-05")}
              popperPlacement="top"
              customInput={
                <IconButton aria-label="calendar">
                  <CalendarMonthIcon fontSize="large" />
                </IconButton>
              }
            />
          </Box>
        </div>

      <div className="slider-box">
        <IconButton onClick={() => setPlaying(!playing)}>
          {playing ? <PauseIcon fontSize="medium"/> : <PlayArrowIcon fontSize="medium"/>}
        </IconButton>

        <Box className="slider" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <Slider
            aria-label="Custom marks"
            min={0}
            max={coronadata.length - 1}
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            step={1}
            valueLabelDisplay="off"
            marks={marks}
            color="black"/>
        </Box>
        </div>
       <Popover
          open={Boolean(activeMark)}
          anchorReference="anchorPosition"
          anchorPosition={popoverPosition}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          disableRestoreFocus
          sx={{
            pointerEvents: "none",
          }}
          PaperProps={{
            onMouseEnter: keepPopoverOpen,
            onMouseLeave: handleMouseLeave,
            sx: {
              pointerEvents: "auto",
            },
          }}
        >
          {activeMark && (
            <Card sx={{ maxWidth: 500 }}>
              <CardContent>
                <Typography variant="subtitle2">
                  {markContent[activeMark]?.title}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                  {markContent[activeMark]?.text}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Popover>
      </div>
    </footer>
  );
}

export default Footer;