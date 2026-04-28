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

function MapDisplay({kanton, setKanton, thema, mapData}) {
  const mapRef = useRef(null);
  const olMapRef = useRef(null);
  const [featureLayer, setFeatureLayer] = useState(null);
  const [selectInteraction, setSelectInteraction] = useState(null);
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);
  
  const themaAttribut = {
    Ansteckungen: "Ansteckungen", 
    Taegliche_Neuansteckungen: "Taegliche_Neuansteckungen", 
    Hospitalisierungen: "Hospitalisierungen", 
    Todesfaelle: "Todesfaelle",};
  
  const Color = (value, min, max) => {
    if (value == null || isNaN(value)) {
      return "rgba(220, 220, 220, 0.6)";
    }
    const ratio = (value - min) / (max - min);
    if (ratio > 0.8) return "rgba(128, 0, 38, 0.75)";
    if (ratio > 0.6) return "rgba(189, 0, 38, 0.75)";
    if (ratio > 0.4) return "rgba(240, 59, 32, 0.75)";
    if (ratio > 0.2) return "rgba(253, 141, 60, 0.75)";
  return "rgba(254, 224, 139, 0.75)";
  };

  const kantonNameMapping = {
  AG: "Aargau",
  AI: "Appenzell Innerrhoden",
  AR: "Appenzell Ausserrhoden",
  BE: "Bern",
  BL: "Basel-Landschaft",
  BS: "Basel-Stadt",
  FR: "Fribourg",
  GE: "Genève",
  GL: "Glarus",
  GR: "Graubünden",
  JU: "Jura",
  LU: "Luzern",
  NE: "Neuchâtel",
  NW: "Nidwalden",
  OW: "Obwalden",
  SG: "St. Gallen",
  SH: "Schaffhausen",
  SO: "Solothurn",
  SZ: "Schwyz",
  TG: "Thurgau",
  TI: "Ticino",
  UR: "Uri",
  VD: "Vaud",
  VS: "Valais",
  ZG: "Zug",
  ZH: "Zürich",
  FL: "Liechtenstein"
};
const kantonCodeMapping = Object.fromEntries(
  Object.entries(kantonNameMapping).map(([code, name]) => [name, code])
);

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

      const geoName = selectedFeature.get("name");
      const kantonCode = kantonCodeMapping[geoName];

      if (kantonCode) {
        setKanton(kantonCode);
      }
    } else {
      setSelectedFeatureId(undefined);
      setKanton("");
    }});

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

  useEffect(() => {
  if (!kanton || !featureLayer || !olMapRef.current) {
    return;
  }

  const source = featureLayer.getSource();

  const zoomToKanton = () => {
    const features = source.getFeatures();
    const geoserverName = kantonNameMapping[kanton];

    const selectedFeature = features.find((feature) => {
      return feature.get("name") === geoserverName;
    });

    if (selectedFeature) {
      setSelectedFeatureId(selectedFeature.getId());
    } else {
      console.log("Kein Kanton gefunden für:", kanton, geoserverName);
    }
  };

  if (source.getFeatures().length > 0) {
    zoomToKanton();
  } else {
    source.once("featuresloadend", zoomToKanton);
  }
}, [kanton, featureLayer]);

useEffect(() => {
  if (!featureLayer || !mapData || mapData.length === 0) return;

  const attribut = themaAttribut[thema];

  const values = mapData
    .map((d) => Number(d[attribut]))
    .filter((v) => !isNaN(v));

  if (values.length === 0) return;

  const min = Math.min(...values);
  const max = Math.max(...values);

  featureLayer.setStyle((feature) => {
    const geoName = feature.get("name");

    const daten = mapData.find((d) => {
      const name = kantonNameMapping[d.kanton] || d.kanton;
      return name === geoName;
    });

    const wert = daten ? Number(daten[attribut]) : null;
    const fillColor = Color(wert, min, max);

    return new Style({
      fill: new Fill({ color: fillColor }),
      stroke: new Stroke({
        color: "black",
        width: 1,
      }),
    });
  });

  featureLayer.changed();
}, [featureLayer, mapData, thema]);
  
  // Infos Schweiz Box
  const cards = [
    { id: 1, title: "Totale Ansteckungen:", description: "Wert" },
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
            <Card key={card.id} className="info-card">
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
