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

import "./Map_display.css";

function MapDisplay() {
  const mapRef = useRef(null);

  useEffect(() => {
    const vectorSource = new VectorSource({
      url: "/kantone.geojson",
      format: new GeoJSON({
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857"}),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: "rgba(0, 100, 255, 0.3)",
        }),
        stroke: new Stroke({
          color: "#0033aa",
          width: 1.5,
        }),
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [vectorLayer],
      view: new View({
        center:[0, 0], 
        zoom: 2
      }),
    });

    vectorSource.on("change", () => {
      if (vectorSource.getState() === "ready") {
        map.getView().fit(vectorSource.getExtent(), {
          padding: [20, 20, 20, 20],
          maxZoom: 12,
        });
      }
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

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