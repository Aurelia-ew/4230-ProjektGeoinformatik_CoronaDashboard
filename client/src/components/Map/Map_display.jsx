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

function MapDisplay({kanton, setKanton, thema, mapData, chData}) {
  const mapRef = useRef(null);
  const olMapRef = useRef(null);
  const [featureLayer, setFeatureLayer] = useState(null);
  const [selectInteraction, setSelectInteraction] = useState(null);
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);
  const [tooltip, setTooltip] = useState ({visible:false, x:0, y:0, text: "",});
  const dataCh = chData?.[0]
  
  const themaAttribut = {
    Ansteckungen: "Ansteckungen", 
    Taegliche_Neuansteckungen: "Taegliche_Neuansteckungen", 
    Hospitalisierungen: "Hospitalisierungen", 
    Todesfaelle: "Todesfaelle",};
  
  const colorPalettes = {
  Ansteckungen: [
    "rgba(250, 245, 255, 0.85)",
    "rgba(233, 213, 255, 0.85)",
    "rgba(216, 180, 254, 0.85)",
    "rgba(192, 132, 252, 0.85)",
    "rgba(147, 51, 234, 0.85)",
    "rgba(88, 28, 135, 0.85)",
  ],
  Taegliche_Neuansteckungen: [
    "rgba(239, 246, 255, 0.85)",
    "rgba(191, 219, 254, 0.85)",
    "rgba(147, 197, 253, 0.85)",
    "rgba(96, 165, 250, 0.85)",
    "rgba(59, 130, 246, 0.85)",
    "rgba(30, 64, 175, 0.85)",
  ],
  Hospitalisierungen: [
    "rgba(255, 247, 237, 0.85)",
    "rgba(254, 230, 206, 0.85)",
    "rgba(253, 208, 162, 0.85)",
    "rgba(253, 174, 107, 0.85)",
    "rgba(241, 105, 19, 0.85)",
    "rgba(140, 45, 4, 0.85)",
  ],
  Todesfaelle: [
    "rgba(255, 245, 247, 0.85)",
    "rgba(254, 224, 229, 0.85)",
    "rgba(252, 197, 192, 0.85)",
    "rgba(240, 128, 128, 0.85)",
    "rgba(177, 24, 43, 0.85)",
    "rgba(103, 0, 31, 0.85)",
  ],
};

const getClassBreaks = (values, classCount = 6) => {
  const cleanValues = values
    .filter(v => v !== null && v !== undefined && !isNaN(v))
    .map(Number);

  const min = Math.min(...cleanValues);
  const max = Math.max(...cleanValues);

  const step = (max - min) / classCount;

  return Array.from({ length: classCount }, (_, i) => ({
    min: min + step * i,
    max: i === classCount - 1 ? max : min + step * (i + 1),
  }));
};

const Color = (value, classes, thema) => {
  if (value === null || value === undefined || isNaN(value)) {
    return "rgba(220, 220, 220, 0.6)";
  }

  const palette = colorPalettes[thema] || colorPalettes.Ansteckungen;

  const classIndex = classes.findIndex(c =>
    value >= c.min && value <= c.max
  );

  return palette[classIndex === -1 ? 0 : classIndex];
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
    
  map.on("pointermove", (event) => {
  const feature = map.forEachFeatureAtPixel(
    event.pixel,
    (feature) => feature);

  map.getTargetElement().style.cursor = feature ? "pointer" : "";

  if (feature) {
    setTooltip({
      visible: true,
      x: event.originalEvent.clientX + 12,
      y: event.originalEvent.clientY + 12,
      text: feature.get("name"),
    });
  } else {
    setTooltip({
      visible: false,
      x: 0,
      y: 0,
      text: "",
    });
  }
});

    olMapRef.current = map;
    setFeatureLayer(kantonLayer);

    const kantonSelectInteraction = new Select({
      condition: click,
      layers: [kantonLayer],
      style: (feature) => {
        const currentStyle = kantonLayer.getStyle()(feature);
        const currentFill = currentStyle.getFill().getColor();
        return new Style({
          fill: new Fill({
            color: currentFill,
          }),
          stroke: new Stroke({
            color: "#00f7ff",
            width: 3,
        }),
        zIndex: 999,
      });
      },
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

  const classes = getClassBreaks(values, 6)

  featureLayer.setStyle((feature) => {
    const geoName = feature.get("name");

    const daten = mapData.find((d) => {
      const name = kantonNameMapping[d.kanton] || d.kanton;
      return name === geoName;
    });

    const wert = daten ? Number(daten[attribut]) : null;
    const fillColor = Color(wert, classes, thema);

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
  const format = (num) => num ? num.toLocaleString('de-CH') : '-';
  const cards = [
    { id: 1, title: "Totale Ansteckungen:", description: `${format(dataCh?.Ansteckungen)} Personen`},
    { id: 2, title: "Tägliche Neuansteckungen:", description: `${format(dataCh?.Taegliche_Neuansteckungen)} Personen`},
    { id: 3, title: "Totale Todesfälle:", description: `${format(dataCh?.Todesfaelle)} Personen`},
    { id: 4, title: "Totale Hospitalisierungen:", description: `${format(dataCh?.Hospitalisierungen)} Personen`},
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
      <div ref={mapRef} className="map-container"/>
      {tooltip.visible && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            background: "rgba(0, 0, 0, 0.75)",
            color: "white",
            padding: "6px 10px",
            borderRadius: "6px",
            fontSize: "13px",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}

export default MapDisplay;
