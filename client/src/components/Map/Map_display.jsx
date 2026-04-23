import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import TileWMS from "ol/source/TileWMS.js";
import GeoJSON from "ol/format/GeoJSON.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import Fill from "ol/style/Fill.js";
import Stroke from "ol/style/Stroke.js";
import Style from "ol/style/Style.js";
import Select from "ol/interaction/Select.js";
import { click } from "ol/events/condition.js";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import proj4 from "proj4";
import { register } from "ol/proj/proj4.js";

import "./Map_display.css";

function MapDisplay() {
  const mapRef = useRef(null);
  const olMapRef = useRef(null);
  const [featureLayer, setFeatureLayer] = useState(null);
  const [selectInteraction, setSelectInteraction] = useState(null);
  const [selectedFeatureId, setSelectedFeatureId] = useState();

  useEffect(() => {
    if (olMapRef.current) return;

    proj4.defs(
      "EPSG:2056",
      "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
    );
    register(proj4);

    const wmsSource = new TileWMS({
      url: "http://localhost:8080/geoserver/CoronaDashboard/wms",
      params: {
        LAYERS: "CoronaDashboard:kantonsflaechen",
        TILED: true,
      },
      serverType: "geoserver",
      crossOrigin: "anonymous",
    });

    const wmsLayer = new TileLayer({
      source: wmsSource,
    });

    const kantonSource = new VectorSource({
      format: new GeoJSON(),
      url:
        "http://localhost:8080/geoserver/CoronaDashboard/ows?" +
        "service=WFS&version=1.0.0&request=GetFeature&typeName=CoronaDashboard:kantonsflaechen" +
        "&outputFormat=application/json&srsname=EPSG:2056",
    });

    const kantonLayer = new VectorLayer({
      source: kantonSource,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.01)",
        }),
        stroke: new Stroke({
          color: "black",
          width: 1,
        }),
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [wmsLayer, kantonLayer],
      view: new View({
        projection: "EPSG:2056",
        center: [2659632, 1191208],
        zoom: 8.5,
      }),
    });

    olMapRef.current = map;
    setFeatureLayer(kantonLayer);

    const kantonSelectInteraction = new Select({
      condition: click,
      layers: [kantonLayer],
      style: () =>
        new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.01)",
          }),
          stroke: new Stroke({
            color: "#00f7ff",
            width: 3,
          }),
        }),
    });

    kantonSelectInteraction.on("select", (event) => {
      if (event.selected.length) {
        const selectedFeature = event.selected[0];
        setSelectedFeatureId(selectedFeature.getId());
      } else {
        setSelectedFeatureId(undefined);
      }
    });

    map.addInteraction(kantonSelectInteraction);
    setSelectInteraction(kantonSelectInteraction);

    return () => {
      map.removeInteraction(kantonSelectInteraction);
      map.setTarget(null);
      olMapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!selectInteraction || !featureLayer || !olMapRef.current) {
      return;
    }

    selectInteraction.getFeatures().clear();

    const selectedFeature = featureLayer
      .getSource()
      .getFeatures()
      .find((feature) => feature.getId() === selectedFeatureId);

    if (selectedFeature) {
      selectInteraction.getFeatures().push(selectedFeature);
      olMapRef.current.getView().fit(selectedFeature.getGeometry(), {
        padding: [60, 60, 60, 60],
        duration: 600,
        maxZoom: 10,
      });
    }
  }, [featureLayer, selectInteraction, selectedFeatureId]);

  // Infos Schweiz Box
  const cards = [
    { id: 1, title: "Totale Anschteckungen:", description: "Wert" },
    { id: 2, title: "Tägliche Neuansteckungen:", description: "Wert" },
    { id: 3, title: "Totale Todesfälle:", description: "Wert" },
    { id: 4, title: "Totale Hospitalisierungen:", description: "Wert" },
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
