---
layout: default
title: Aufbau GDI
---

## Aufbau Geodateninfrastruktur
### Architektur
Die Geoinfrastruktur des Corona Dashboards besteht aus einem Backend und einem Frontend. Die folgende Visualisierung zeigt die Architektur des Corona Dashboard:
![Architektur](Bilder/Architektur.png)

Die Daten werden von verschiedenen Datenquellen als Shapefile, CSV oder Excel-Datei heruntergeladen (mehr dazu im Abschnitt [Daten](./GDI_Daten)).  
Anschliessend werden die Daten mithilfe verschiedener Python-Skripte verarbeitet, bereinigt und in die PostgreSQL/PostGIS-Datenbank geschrieben (mehr dazu im Abschnitt [Backend](./GDI_Backend)).  
Bemerkung: PostGIS erweitert PostgreSQL um Funktionen zur Speicherung und Analyse räumlicher Geodaten.  
Die Kantonsflächen werden über den GeoServer als WMS-Dienst bereitgestellt. Alle weiteren Daten werden über eine FastAPI-Schnittstelle an das Frontend übertragen (mehr dazu im Abschnitt [Backend](./GDI_Backend)).   
Das Frontend basiert auf HTML, CSS und JavaScript. React wird für die komponentenbasierte Benutzeroberfläche verwendet. Das Design und Layout der Webseite werden mit CSS umgesetzt, während die Benutzeroberfläche teilweise mit der Bibliothek MUI erstellt wird. Diagramme werden mit Vega-Altair erstellt und mit VegaLite eingebunden. Die interaktive Karte wird mit OpenLayers visualisiert (mehr dazu im Abschnitt [Frontend](./GDI_Frontend)).
Das Backend wude lokal entwickelt und wird jetzt auf einem Raspberry Pi betrieben.

Mehr informationen zur vorangeganenen Recherche und den Processing der Daten ist im Abschnitt [Recherche und Preprocessing](./GDI_Recherche_Preprocessing) zu finden.

Bereiche:
- [Daten](./GDI_Daten)
- [Recherche und Preprocessing](./GDI_Recherche_Preprocessing)
- [Backend](./GDI_Backend)
- [Frontend](./GDI_Frontend)


