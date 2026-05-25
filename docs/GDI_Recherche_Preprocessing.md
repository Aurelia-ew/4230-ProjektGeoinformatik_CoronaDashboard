---
layout: default
title: Aufbau GDI - Recherche und Preprocessing
---

## Recherche Coronamassnahmen:
Die Informationen zu den Massnahmen und Beschlüssen des Bundes wurden mithilfe von Internetrecherchen sowie mit Unterstützung von ChatGPT (Version 5.4) zusammengetragen.  
Nachfolgend sind die Hauptquellen aufgeführt:
-	Wichtige Entscheidungen Bundesrat:
[UVEK](https://www.uvek.admin.ch/de/coronavirus-wichtige-entscheide-des-bundesrats)
-	BAG: 
[Covid-19 Informationen und Massnahmen](https://www.admin.ch/de/nsb?id=78437)
-	Wikipedia:
[Coronapandemie in der Schweiz](https://de.wikipedia.org/wiki/COVID-19-Pandemie_in_der_Schweiz)

## Preprocessing
Die Daten wurden von den im Abschnitt [Daten](./GDI_Daten) beschriebenen Quellen heruntergeladen und anschliessend für die weitere Verarbeitung vorbereitet.

### Coronadaten
Die heruntergeladenen Coronadaten werden zunächst mit anderen offiziellen Dashboards, beispielsweise des BAG, überprüft und kontrolliert.
[BAG COVID 19 Dashboard](https://www.idd.bag.admin.ch/de/diseases/covid/overview?utm_source=chatgpt.com).  
Anschliessend werden nur die für das Projekt benötigten Attribute (siehe Abschnitt [Daten](./GDI_Daten)) ausgewählt und mit pgAdmin 4 in eine neue Tabelle der Datenbank importiert.

### Kantonsflächen
Von den heruntergeladenen Geodaten der Kantonsflächen wird ausschliesslich das Shapefile mit den Kantonsgrenzen weiterverwendet. Alle weiteren enthaltenen Shapefiles werden für das Projekt nicht benötigt. 
Um die Fläche von Lichtenstein zu erhalten, wird die Gesamtfläche der Schweiz (ebenfalls in _swissboundaries_ vorhanden) mit den Kantonsflächen verschnitten. Übrig bleibt die Fläche von Lichtenstein die bei der Gesamtfläche der Schweiz miterfasst wurde.
Die Geodaten werden mithilfe des Tools _shp2pgsql_ in eine neue Tabelle der PostGIS-Datenbank importiert. Von den vorhandenen Attributen wird lediglich das Kantonskürzel, der Kantonsname sowie die Geometrie übernommen. 
Die Fläche von Lichtenstein wird separat als neue Tabelle in pgAdmin4 importiert und anschliessend zur Tabelle der Kantonsflächen hinzugefügt. Dies wird mit SQL gemacht.

### Einwohnerzahlen
Die Einwohnerzahlen wurden vom BFS als Exceltabelle heruntergeladen. Anschliessend werden alle nicht benötigten Attribute entfernt. In die Datenbank werden nur die Einwohnerzahl sowie das entsprechende Kantonskürzel übernommen. Der Import erfolgt ebenfalls mit pgAdmin 4.

### Fehlende Werte
Die Coronadaten enthalten teilweise fehlende Werte. Das bedeutet, dass für einzelne Tage bei manchen Kantonen keine Daten vorhanden sind.
Bei der späteren Darstellung auf der Karte werden Kantone ohne vorhandenen Wert grau dargestellt. Dadurch wird sichtbar gemacht, dass für den entsprechenden Zeitpunkt keine Daten vorliegen.
Für die Berechnung der täglichen Neuansteckungen wird bei fehlenden Werten folgendermassen vorgegangen:
* Fehlt der Wert des Vortages, wird der zuletzt verfügbare Wert verwendet um die Division durchzuführen.
* Fehlt der Wert des aktuellen Tages, wird der Wert des vorherigen Tages übernommen.
