---
layout: default
title: Aufbau Geodateninfrastruktur
---

# Aufbau Geodateninfrastruktur
## Architektu
Die Geoinfrastruktur des Corona Dashboards besteht aus einem Backend und einem Frontend. Die folgende Visualisierung zeigt die Architektur des Corona Dashboard:
![Corona Dashboard Architektur](/docs/Bilder/Architektur.png)

## Daten
### Corona - Daten:
Die Corona-Daten stammen aus einem GitHub-Repository, aus dem die Datensätze heruntergeladen werden können. Für jeden Kanton sowie für Liechtenstein liegt jeweils eine Datei im CSV-Format vor.
* Link Daten: https://github.com/openZH/covid_19

Die Datensätze enthalten verschiedene Attribute, darunter beispielsweise aktuelle Ansteckungen, Todesfälle und Hospitalisierungen. Nicht alle Attribute sind jedoch vollständig oder durchgehend vorhanden.

![Vollständigkeit Attribute](/docs/Bilder/Vollständigkeit_Attribute.png)
![Legende Vollständigkeit Attribute](/docs/Bilder/Legende_Vollständigkeit_Attribute.png)

Für dieses Projekt wurden insbesondere folgende Attribute verwendet:
* ncumul_conf – kumulierte Ansteckungen
* ncumul_deceased – kumulierte Todesfälle
* current_hosp – aktuelle Hospitalisierungen

#### Hinweis zu den Corona - Daten:
Die Daten enthalten ausschliesslich gemeldete Fälle. Die tatsächliche Anzahl infizierter Personen dürfte daher höher liegen. Gründe dafür können unter anderem sein, dass infizierte Personen keine Symptome hatten und deshalb nicht getestet wurden oder dass Fälle den zuständigen Behörden nicht gemeldet wurden.
Auch bei den Todesfällen kann nicht in jedem Fall eindeutig festgestellt werden, ob diese direkt auf eine Corona-Infektion zurückzuführen sind oder ob weitere Ursachen eine Rolle gespielt haben. Ähnliches gilt für die Hospitalisierungen, da nicht immer vollständig nachvollziehbar ist, nach welchen Kriterien die Daten erhoben wurden.
Die dargestellten Zahlen und Angaben sollten deshalb stets kritisch betrachtet und im entsprechenden Kontext interpretiert werden.

### Einwohnerzahlen:
Die Einwohnerzahlen werden vom Bundesamt für Statistik bezogen und in einer Excel-Tabelle gespeichert.
* Link Daten:https://dam-api.bfs.admin.ch/hub/api/dam/assets/36139705/master

### Kantonsflächen:
Die Flächendaten der Kantone stammen von swisstopo, genauer aus dem Datensatz swissBOUNDARIES3D. Diese Geodaten liegen im Shapefile-Format vor.
* Link Daten: https://www.swisstopo.admin.ch/de/landschaftsmodell-swissboundaries3d

Alle Daten werden anschliessend entweder mit dem Tool shp2pgsql von PostgreSQL/PostGIS oder über das Importwerkzeug von pgAdmin 4 in die Datenbank importiert. Nicht benötigte Attribute werden bereits vor dem Import entfernt.

Zusätzliche Attribute, die aus Berechnungen bestehender Daten entstehen, werden direkt in der Datenbank mithilfe von SQL erstellt und berechnet.

## Backend
Das Backend des Corona-Dashboards besteht aus PostgreSQL-/PostGIS-Datenbanken sowie den Schnittstellen FastAPI und GeoServer.
Die gesamte Backend-Infrastruktur wurde zunächst lokal auf einem Laptop entwickelt und anschliessend auf einen Raspberry Pi 5 übertragen.

### Datenbank
Die Daten werden in PostGIS-Datenbanken gespeichert und mit dem Programm pgAdmin 4 verwaltet. Sämtliche im Projekt verwendeten Daten sind in einzelnen Tabellen organisiert und bilden gemeinsam die Datenbank Corona_DB.
Die wichtigsten Tabellen des Projekts sind:
* corona_data: enthält die Coronadaten wie Ansteckungen, Todesfälle und Hospitalisierungen.
* durchschnitt_faelle_kanton: enthält die durchschnittlichen Fallzahlen pro Kanton.
* kantonsflaechen: enthält die Kantonsgeometrien sowie deren Flächen in km².
* schweiz: enthält die Kennzahlen für die gesamte Schweiz sowie Liechtenstein.

Die Beziehungen zwischen den Tabellen werden im folgenden Schema dargestellt:

![Tabellen Schema](/docs/Bilder/Tabellen_Schema.png)

Zusätzlich werden in der Datenbank weitere Kennzahlen berechnet, darunter tägliche Neuansteckungen, durchschnittliche Ansteckungen pro Tag sowie schweizweite Gesamtwerte.

#### Berechnungen
* Tägliche Ansteckungen
Die täglichen Neuansteckungen werden aus dem Attribut ncumul_conf berechnet. Dazu wird die Anzahl der Fälle eines Tages mit jener des vorherigen Tages verglichen. Die Differenz ergibt die Anzahl neuer Fälle pro Tag.
* Durchschnittliche Ansteckungen pro Tag
Dieser Wert wird berechnet, indem die maximale Anzahl kumulierter Fälle (ncumul_conf am letzten Erfassungstag) durch die Anzahl der Datenerfassungstage dividiert wird.
* Schweizweite Kennzahlen
Die Werte für die gesamte Schweiz – darunter Ansteckungen, Todesfälle, Hospitalisierungen und tägliche Neuansteckungen – ergeben sich aus der Summe der entsprechenden Werte aller Kantone für ein bestimmtes Datum.

### Schnittstellen (API / GeoServer)
Die Kommunikation zwischen Backend und Frontend erfolgt über FastAPI und GeoServer.
Die Kantonsflächen werden über den GeoServer als WMS-Dienst publiziert und anschliessend mit OpenLayers im Frontend dargestellt.
Alle weiteren Daten werden über FastAPI bereitgestellt. 

Dabei stehen mehrere API-Endpunkte zur Verfügung:

/corona?kanton=${kanton}
* Lädt die Coronadaten eines bestimmten Kantons aus der Tabelle corona_data. Die Daten werden für das Diagramm in der Sidebar verwendet. Dabei werden sämtliche Attribute übertragen und abhängig vom ausgewählten Thema visualisiert.
Dieser Endpoint wird aufgerufen, sobald ein Kanton auf der Karte oder über den Filter ausgewählt wird.

/corona-map?datum=${datum}
* Lädt die Coronadaten für ein bestimmtes Datum aus der Tabelle corona_data. Alle relevanten Attribute werden übertragen und entsprechend dem ausgewählten Thema dargestellt.
Der Endpoint wird ausgelöst, sobald der Slider abgespielt oder ein bestimmtes Datum ausgewählt wird.

/schweiz?datum=${datum}
* Lädt die schweizweiten Coronadaten aus der Tabelle schweiz für ein bestimmtes Datum. Die Daten werden oberhalb der Karte angezeigt.
Dieser Endpoint wird beim Öffnen der Seite sowie bei jeder Änderung des Datums über den Slider oder Kalender aufgerufen.

/schweiz-verlauf
* Lädt die Verlaufsdaten der gesamten Schweiz aus der Tabelle schweiz für das Diagramm. Die Abfrage ist unabhängig vom aktuell gewählten Datum.
Je nach ausgewähltem Thema werden die entsprechenden Werte dargestellt.
Der Endpoint wird direkt beim Laden der Seite ausgeführt.

/flaechen?kanton=${kanton}
* Lädt das Attribut flaeche_km2 aus der Tabelle kantonsflaechen für die Anzeige in der Sidebar.
Der Endpoint wird aufgerufen, sobald ein Kanton ausgewählt wird.

/durchschnitt?kanton=${kanton}
* Lädt sämtliche Attribute der Tabelle durchschnitt_faelle_kanton für die Sidebar.
Dieser Endpoint wird ebenfalls ausgelöst, sobald ein Kanton über die Karte oder den Filter ausgewählt wird.

Die Daten werden über GET-Anfragen vom Frontend abgerufen und anschliessend an die entsprechenden Komponenten der Benutzeroberfläche weitergegeben.

### Frontend
Das Frontend der Webseite besteht aus vier zentralen Komponenten:
* Header
* Karte
* Sidebar
* Footer

Jede dieser Komponenten verfügt über eine eigene CSS-Stylesheet-Datei für das jeweilige Design und Layout.
Die Funktionen der einzelnen Komponenten werden im Kapitel Funktionen genauer beschrieben.
Zusammengeführt werden alle Komponenten in der index-Datei. Dort werden zudem die FastAPI-Abfragen, die meisten React-Hooks sowie verschiedene Funktionen zur Interaktivität verwaltet. Dadurch können Daten, React-Komponenten und Interaktionslogiken zentral organisiert und anschliessend an die entsprechenden Komponenten weitergegeben werden.
Ein weiterer Vorteil dieser Struktur ist die Wiederverwendbarkeit von Elementen. So können beispielsweise Funktionen oder Daten gleichzeitig in der Sidebar und im Footer verwendet werden, ohne mehrfach programmiert werden zu müssen.

#### Verwendete Technologien
Das Frontend wurde mit folgenden Technologien umgesetzt:
* HTML: Zuständig für die Struktur der Webseite und Elemente wie Buttons oder Eingabefelder.
* JavaScript: Verantwortlich für die Funktionalität und Interaktivität der Webseite.
* CSS: Zuständig für das gesamte Styling und Layout.
* MUI (Material UI): Liefert vorgefertigte Komponenten wie Buttons, Icons oder Textfelder.
* Node Package Manager (NPM): Wird verwendet, um Softwarepakete zu installieren, zu aktualisieren und zu verwalten.
* React: Ermöglicht die Erstellung interaktiver und komponentenbasierter Benutzeroberflächen.
* Vega-Altair: Wird zur Erstellung der Diagramme verwendet.
* OpenLayers: Wird für die Darstellung und Interaktion mit der Karte eingesetzt.

### Recherche
Die Informationen zu den Massnahmen und Beschlüssen des Bundes wurden mithilfe von Internetrecherchen sowie mit Unterstützung von ChatGPT zusammengetragen.
Die recherchierten Inhalte werden direkt im Frontend innerhalb der Footer-Komponente eingebunden und verwendet.
