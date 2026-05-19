# Corona Dashboard Installationsanleitung

Das Corona Dashboard ist eine webbasierte Geodatenplattform zur Visualisierung und Analyse von COVID-19-Daten in der Schweiz. Für alle Kantone können Zahlen zu Ansteckungen, Hospitalisierungen und Todesfällen analysiert werden. Die Daten lassen sich nach verschiedenen Themen filtern und für bestimmte Zeiträume beziehungsweise Datumsangaben darstellen. Zusätzlich können die Daten mit nationalen Massnahmen verglichen werden, wodurch Entwicklungen und Zusammenhänge besser analysiert werden können.

---

# Verwendete Technologien

## Frontend

- React
- OpenLayers
- MUI
- Vega Altair
- HTML
- JavaScript
- CSS
- npm

## Backend

- FastAPI
- GeoServer
- PostgreSQL / PostGIS
- pgAdmin4
- GeoPandas
- Pandas
- Uvicorn
- ORJSON
- Psycopg2
- Pydantic

---

# Unterstützte Versionen

| Technologie | Version |
| ----------- | ------- |
| Python      | 3.10.9  |
| FastAPI     | 0.136.0 |
| GeoPandas   | 1.1.3   |
| Pandas      | 3.0.2   |
| Uvicorn     | 0.45.0  |
| ORJSON      | 3.11.8  |
| Psycopg2    | 2.9.10  |
| Pydantic    | 2.13.3  |

---

# Voraussetzungen

Für die lokale Ausführung werden folgende Programme benötigt:

- Git
- Node.js + npm
- Anaconda oder Miniconda
- PostgreSQL + PostGIS
- pgAdmin4
- Java (für GeoServer)

Optional:

- Visual Studio Code

Bemerkung: Visual Studio Code ist nicht zwingend notwendig. Alle Komponenten können direkt über eine Shell beziehungsweise ein Terminal gestartet werden.

---

# Repository klonen

```bash
git clone https://github.com/Aurelia-ew/4230-ProjektGeoinformatik_CoronaDashboard.git

cd 4230-ProjektGeoinformatik_CoronaDashboard
```

Ein GitHub-Account ist dafür nicht notwendig.

---

# Datenbank einrichten

Im Ordner `preprocessing` befindet sich ein aktuelles Backup der Datenbank.

Die Datenbank kann mit `pgAdmin4` importiert werden:

1. Neue Datenbank erstellen
2. Rechtsklick auf die Datenbank
3. `Restore...` auswählen
4. `.backup` Datei auswählen
5. Import starten

---

# GeoServer einrichten

GeoServer wird für die Bereitstellung der räumlichen Daten verwendet.

Download:
https://geoserver.org/release/stable/

Für GeoServer wird Java benötigt.

Empfohlene Java-Version:

```text
Java 17 oder höher
```

Nach der Installation ist GeoServer standardmässig erreichbar unter:

```text
http://localhost:8080/geoserver
```

Die Zahl hinter `localhost` beschreibt den verwendeten Port.

---

# WMS erstellen

Im GeoServer muss eine Verbindung zur PostgreSQL/PostGIS-Datenbank erstellt werden.

Dabei wird folgende Tabelle eingebunden:

```text
kantonsflaechen
```

Anschliessend wird daraus ein WMS-Layer erstellt, welcher im Frontend verwendet wird.

Dokumentation:
https://docs.geoserver.org/main/en/user/gettingstarted/postgis-quickstart/

---

# Backend starten

## Conda Environment erstellen

```bash
cd server

conda config --add channels conda-forge

conda create --name coronadashboard python=3.10.9

conda activate coronadashboard

pip install -r app/requirements.txt
```

## Datenbankverbindung anpassen

In der Datei:

```text
server/app/main.py
```

müssen die eigenen PostgreSQL-Zugangsdaten angepasst werden.

## Backend ausführen

```bash
cd server

conda activate coronadashboard

uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

API-Dokumentation:

```text
http://localhost:8000/docs
```

---

# Frontend starten

```bash
cd client

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Datenaufbereitung und Analyse

Für die Verarbeitung und Analyse der COVID-19-Daten werden verschiedene Python-Skripte sowie Jupyter-Notebooks verwendet. Dabei werden die Rohdaten bereinigt, analysiert und für die Visualisierung im Dashboard vorbereitet. Die Notebooks dienen zusätzlich zur Erstellung einzelner Diagramme und statistischer Auswertungen.

---

# KI-Unterstützung

Für einzelne Entwicklungs- und Dokumentationsschritte wurde ChatGPT verwendet. Die KI wurde hauptsächlich für technische Erklärungen, Fehlersuche sowie kleinere Unterstützungen bei der Dokumentation eingesetzt. Ebenfalls wurden die Coronamasnahmen mit ChatGPT gesucht, da eine übersicht über alle Massnahmen in der Schweiz nicht verfügbar war

---

# Quellen

## Datenquellen

- Bundesamt für Gesundheit (BAG)
- Open Data Schweiz

## Technologien

- React
- FastAPI
- PostgreSQL
- PostGIS
- GeoServer
- OpenLayers
