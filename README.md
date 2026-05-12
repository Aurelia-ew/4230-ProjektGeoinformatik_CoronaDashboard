# Corona Dashboard

Webbasierte Geodatenplattform zur Visualisierung und Analyse von Corona-Daten. Für alle Kantone können Zahlen zu Ansteckungen, Hospitalisierungen und Todesfällen analysiert werden. Die Daten lassen sich nach verschiedenen Themen filtern und für bestimmte Zeiträume beziehungsweise Datumsangaben darstellen.

## Technologien

### Frontend

- React.js
- OpenLayers
- MUI

### Backend

- FastAPI
- GeoServer
- pgAdmin4

---

# Installation

## Voraussetzungen

- Git
- Node.js + npm
- Anaconda oder Miniconda
- Visual Studio Code (optional)

---

# Repository klonen

```bash
git clone < https://github.com/Aurelia-ew/4230-ProjektGeoinformatik_CoronaDashboard >
cd <PROJECT_FOLDER>
```

---

# Frontend starten

```bash
cd client
npm install
npm run dev
```

Frontend erreichbar unter:

```bash
http://localhost:5173
```

---

# Backend starten

## Conda Environment erstellen

```bash
cd server

conda config --add channels conda-forge

conda create --name coronadashboard python=3.10.9 --file app/requirements.txt
```

## Backend ausführen

```bash
cd server
conda activate coronadashboard
uvicorn app.main:app --reload
```

Backend erreichbar unter:

```bash
http://localhost:8000
```

Swagger API Dokumentation:

```bash
http://localhost:8000/docs
```

---

# Datenbanken

Die Daten werden in einer pgAdmin 4-Datenbank verwaltet. Dabei sind die Informationen in mehrere Tabellen gegliedert und nach Kantonskürzel sowie Datum strukturiert. Die einzelnen Tabellen sind über Primär- und Fremdschlüssel miteinander verbunden, wodurch eine relationale Datenstruktur entsteht. Dadurch können Daten effizient abgefragt, verknüpft und ausgewertet werden. Zusätzlich ermöglicht diese Struktur die laufende Berechnung neuer Kennwerte, beispielsweise Durchschnittswerte oder zeitliche Entwicklungen der Corona-Daten.
