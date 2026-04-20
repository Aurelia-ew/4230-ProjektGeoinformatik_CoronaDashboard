import {useEffect, useRef} from "react";
import "ol/ol.css";
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style.js';

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import TileLayer from "ol/layer/Tile.js";
import TileWMS from "ol/source/TileWMS.js"
import proj4 from "proj4";
import { register } from "ol/proj/proj4.js";

import "./Map_display.css";

function MapDisplay() {
  const mapRef = useRef(null);

  useEffect(() => {

    proj4.defs(
      "EPSG:2056",
      "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
    );
    register(proj4);

    const wmsLayer = new TileLayer({
      source: new TileWMS({
        url: "http://localhost:8080/geoserver/CoronaDashboard/wms",
        params: {
          LAYERS: "CoronaDashboard:kantonsflaechen",
          TILED: true,
        },
        serverType: "geoserver",
        crossOrigin: "anonymous"
      }),
    })

    const map = new Map({
      target: mapRef.current,
      layers: [wmsLayer],
      view: new View({
        projection: "EPSG:2056",
        center:[2659632, 1191208], 
        zoom: 1
      }),
    });

    map.getView().fit(
      [2485410.0, 1075268.125, 2833857.75, 1295933.75],
      {padding: [20, 20, 20, 20],}
    );

    return () => {
      map.setTarget(null);
    };
  }, []);

  // Infos Schweiz Box
    const cards = [
      {id: 1, title: 'Totale Anschteckungen:', description: 'Wert',},
      {id: 2, title: 'Tägliche Neuansteckungen:', description: 'Wert',},
      {id: 3, title: 'Totale Todesfälle:', description: 'Wert',},
      {id: 4, title: 'Totale Hospitalisierungen:', description: 'Wert',},
    ];

  return (
    <div>
      <div className="info">
        <h4>Informationen zur Schweiz:</h4>
        <Box className="info-box">
          {cards.map((card) => (
            <Card key={card.id}>
              <CardContent className="info-text">
                <Typography variant="inherit" fontSize={16}>
                  {card.title}
                </Typography>
                <Typography variant="Subtitle1" color="black" fontSize={16}>
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </div>
      <div ref={mapRef} className="map-container"></div>
    </div>
    );
}

export default MapDisplay;