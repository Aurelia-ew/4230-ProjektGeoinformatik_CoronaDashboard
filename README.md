# Corona Dashboard Installationsanleitung

Das Corona Dashboard ist eine webbasierte Geodatenplattform zur Visualisierung und Analyse von Corona-Daten.  
Für alle Kantone können Zahlen zu Ansteckungen, Hospitalisierungen und Todesfällen analysiert werden. Die Daten lassen sich nach verschiedenen Themen filtern und für bestimmte Zeiträume beziehungsweise Datumsangaben darstellen.

## Verwendete Technologien
### Frontend

- React
- OpenLayers
- MUI
- npm
- Vega Altair
- HTML
- Java Script
- CSS

Eine detailiere Beschreibund der in Frontend verwendeten Bibliotheken ist auf der GitHub Page unter Frontend zu finden. 

### Backend
- FastAPI
- GeoServer
- PostgreSQL / PostGIS
- pgAdmin4

# Installationen
Nachfolgend sind die Installationen der einzelnen Komponenten der Webaplikation genauer beschrieben

## Voraussetzungen
Vorraussetzung damit das Projekt lokal installiert werden kann sind folgende Programme und Technologien;
- GitHub
- Node.js + npm
- Anaconda oder Miniconda
- Visual Studio Code (optional)
- PosrgreSQL / Postgis bzw. pgAdmin 4

## Repository klonen
Falls ein GitHub Account vorhanden ist, kann über folgenden Link das Repository geclont und lokal gespeichert werden: 
https://github.com/Aurelia-ew/4230-ProjektGeoinformatik_CoronaDashboard

Ansonsten kann das auch über ein Terminal gemacht werden:
```bash
git clone < https://github.com/Aurelia-ew/4230-ProjektGeoinformatik_CoronaDashboard >
cd <PROJECT_FOLDER>
```
## Database einrichten
Im Ordner Preprocessing ist ein aktelles Backup der Corona Database zu finden. Diese kann mithilfe des Programms pgAdmin 4 in PortgreSQL implementiert werden.  
Dazu wird zuerst eine neue Database erstellt. Anschliessend kann über Restore... (Rechtsklick auf die Database) die .backup Datei ausgewählt und importiert werden.

## Geoserver herunterladen
Für einen Teil der Schnittstellen wird der Geoserver benötigt. 
Dieser kann unter folgendem Link heruntergeladen werden: 
https://geoserver.org/release/stable/

Der Geoserver kann für mehre Betriebssysteme heruntergeladen werden.
Je nach dem für welches Betriebssystem der Geoserver heruntergeladen wurde, ist unter nachfolgendem Link eine Installationsanleitung zu finden.  
https://docs-archive.geoserver.org/stable/en/user/installation/index.html#installation

## WMS auf Geoserver erstellen
Wenn der Geoserver erfolgreich installiert wurde, geht es nun an die Erstellung des WMS für das Corona Dashboard. 
Das Dashboard nutzt einen eigens erstellten WMS der die Kantonsflächen als Polygone liefert. Dazu wird die DB kantonsflaechen benötigt.
Unter folgendem Link ist die Erstellung eines WMS anschaulich beschrieben:  
https://docs.geoserver.org/main/en/user/gettingstarted/postgis-quickstart/

## Backend starten
In den nachfolgenden Abschnitten wird das Starten des Backends aufgeführt.

### Conda Environment erstellen
Zuerst wird ein neues Conda Envoronement erstellt, das alle benötigten Bibliotheken beinhaltet.
```bash
cd server
conda config --add channels conda-forge
conda create --name coronadashboard python=3.10.9 --file app/requirements.txt
```
## Backend ausführen
Anschliessend kann das Backend mit folgenden Befehlen ausgeführt werden.  
Bemerkung 1: Damit das Backend gestartet werden kann muss das Terminal im Ordner server geöffnet sein. Wenn das nicht der Fall ist, muss mit cd ... zum Ordner server navigiert werden.  
Bemerkung 2: Damit das Backend korrekt startet müssen im File main.py unter Datenbankverbindung die eigenen Angaben wie Username und Passwort von PostgreSQL bzw. der Datenbank angegeben werden. 
```bash
cd server
conda activate coronadashboard
uvicorn app.main:app --reload
```

Das Backend ist jetzt erreichbar unter folgendem Link:
```bash
http://localhost:8000
```

Hier sind die Endkonten bzw. die Dokumentaion der API zu finden:
```bash
http://localhost:8000/docs
```

## Frontend starten
Das Frontend kann dann über ein Terminal mit folgenden Befehlen gestartet werden.  
Bemerkung: Um das Frontend zu starten muss das Terminal beim Ordner client im Repository geöffnet sein.
Eine andere Option ist im Terminal zu dem Ordner client zu navigieren mit dem Befehl cd [Pfad zum Ordner client]
```bash
cd client
npm install
npm run dev
```

Wenn das Frontend erfolgreich gestartet wurde, ist es unter folgendem Link zu finden:
```bash
http://localhost:5173
```
Bemerkung: die Zahl hinter localhost: ... kann variieren. 
