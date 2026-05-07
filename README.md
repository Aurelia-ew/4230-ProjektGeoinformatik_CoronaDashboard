# Corona Dashboard

Webbasierte Geodatenplattform zur Visualisierung und Analyse von Corona-Daten.

## Technologien

### Frontend

- React.js
- OpenLayers
- MUI

### Backend

- FastAPI
- GeoServer

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
git clone <REPOSITORY_URL>
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

# Verwendete Technologien

- React 18
- OpenLayers
- FastAPI
- GeoServer
- Material UI
