# Corona Dashboard Installationsanleitung

Das Corona Dashboard ist eine webbasierte Geodatenplattform zur zeitlichen und räumlichen Analyse von COVID-19-Daten in der Schweiz. Die Anwendung ermöglicht die interaktive Visualisierung kantonaler Infektions-, Hospitalisierungs- und Todesfallzahlen über frei definierbare Zeiträume.

Durch die Kombination epidemiologischer Daten mit nationalen Coronamassnahmen können Entwicklungen, Trends und mögliche Zusammenhänge analysiert und verglichen werden. Ziel des Projekts ist die übersichtliche Aufbereitung zeitabhängiger Gesundheitsdaten mithilfe moderner Web- und Geodaten-Technologien.

---

# Verwendete Technologien

## Frontend

Das Frontend basiert auf React und dient zur interaktiven Visualisierung der COVID-19-Daten. Für die Darstellung räumlicher Daten und Karten wird OpenLayers verwendet. Diagramme und statistische Visualisierungen werden mit Vega Altair umgesetzt.

- React
- OpenLayers
- MUI
- Vega Altair
- HTML
- JavaScript
- CSS
- npm

## Backend

Das Backend basiert auf FastAPI und stellt REST-Endpunkte für die Bereitstellung der COVID-19-Daten bereit. PostgreSQL/PostGIS wird zur Speicherung und räumlichen Verarbeitung der Daten verwendet, während GeoServer Geodaten als WMS-Dienste publiziert.

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

Im Ordner `preprocessing` befindet sich ein aktuelles PostgreSQL/PostGIS-Datenbankbackup mit den vorbereiteten COVID-19-Daten sowie den Kantonsgeometrien. Das Backup enthält die bereits vorprozessierten und für das Dashboard benötigten Tabellen.

Die Datenbank kann entweder über `pgAdmin4` oder alternativ über die Shell mittels `pg_restore` importiert werden.

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

# Datenaufbereitung und Analyse

Für die Verarbeitung und Analyse der COVID-19-Daten werden verschiedene Python-Skripte sowie Jupyter-Notebooks verwendet. Dabei werden die Rohdaten bereinigt, analysiert und für die Visualisierung im Dashboard vorbereitet.

Die Jupyter-Notebooks werden für explorative Datenanalysen, statistische Auswertungen sowie zur Erstellung und Überprüfung einzelner Diagramme verwendet. Zusätzlich dienen sie zur Validierung der aufbereiteten COVID-19-Daten vor der Integration in das Dashboard.

## Ein Teil der Notebooks im Ordner `diagramm` wird zur Entwicklung und Analyse der Visualisierungen genutzt.

# KI-Unterstützung

Für einzelne Entwicklungs- und Dokumentationsschritte wurde ChatGPT verwendet. Die KI wurde hauptsächlich für technische Erklärungen, Fehlersuche sowie kleinere Unterstützungen bei der Dokumentation eingesetzt. Ebenfalls wurden die Coronamasnahmen mit ChatGPT gesucht, da eine übersicht über alle Massnahmen in der Schweiz nicht verfügbar war.

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
