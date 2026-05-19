



# Allgemeines Feedback Projekte

- KI Nutzung in der Reflektion ergänzen und überlegen wie diese deklariert wird auf der GitHub Page (gute knappe Formulierung wählen, damit Eigenleistung erkennbar ist.) - Wie wurde die KI verwendet und zu welchem Grad für was.
- Im README oder dem Setup / Getting Started Bereichen 
  - die Anforderungen an das System auflisten, den Software Stack mit den involvierte Software/Libraries minimale Versionen (von denen ihr wisst, dass alles funktioniert) aufführen. 
  - Installation: Installationsschritte aufführen und die Einrichtung durchführen wird (präzise und knapp) und den Datenimport/integration klar aufführen.
  - Start-Up: Getrennt davon aufführen, wie startet man das System, wenn dann alles eingerichtet und importiert wird.
  - Vorprozessierung und Analyse: (Kann auch separat geführt werden und darauf verwiesen werden.) Dort beschreiben und in einem verständlichen Workflow darstellen, wie die Rohdaten verarbeitet werden und wie das System mit neuen Daten aktualisiert werden kann, da ihr in allen Projekten zeitabhängige Daten nutzt.
- Git Branches sind nützlich - niemand hat mit Branches gearbeitet
- Kommentierte Ordnerstruktur und der relevanten Files ist für das Verständnis sehr hilfreich.
- Daten und weitere Quellen referenzieren, wie bei einer Publikation, auch von Analysen und verwendeten Methoden z.B. Dijkstra

# Feedback Corona Dashboard

- Studierende: Aurelia Weickgenannt, Pascal Schmid

- Github: https://github.com/Aurelia-ew/4230-ProjektGeoinformatik_CoronaDashboard

- GitHub Pages: https://aurelia-ew.github.io/4230-ProjektGeoinformatik_CoronaDashboard/

---

- Magenta-Farbe etwas krass

- Farbe im Header/Footer vielleicht lieber weglassen oder in dem ähnlichen Grün, wie das Logo

- Seite 22 - Quelle der Abbildung, falls nicht selber gemacht?

- Code darf vor allem in den Komponenten noch besser Kommentiert werdenin main.py Funktionen mit DocStrings beschreiben?

- Welche KI wurde für was eingesetzt?

-----

**README**: Text ist eher generisch und nicht technisch präzise genug für ein Aufsetzen des Projekts aufgeführt. Die Reproduzierbarkeit des Projekts wird so herausfordernd und es streicht Eure Fachkenntnisse heraus.

- Kann das Projekt von einer aussenstehenden Person mit den Instruktionen korrekt installiert werden?
- *About* Text an Projekt anpassen nicht genügend spezifisch
- Einleitungstext, ist das erste was gelesen wird, was ist es genau und was löst das Projekt/Tool/Webanwendung? Zeitliche Aspekt mit einbeziehen.

- Verwendete Technologien übergeordnet einleiten, Frontend, Backend einordnen, sowie erforderliche minimale Versionen aufführen. Ist nur das Frontend genauer beschrieben auf der GitHub Page?
- Ab welcher Python, Node Version etc. wird das Projekt unterstützt oder welche werden benötigt?

- Sind es mehrere Installationen? Aussagekräftigeren Satz wählen in der ersten Zeile zu Installationen. Ist für die Ausführung VS Code effektiv notwendig? oder nicht einfache eine Shell in welcher die Scripts gestartet werden?

- Ist effektiv ein GitHub Account notwendig um das Projekt zu klonen, respektive lokal zu speichern? (eher nicht)

- Datenbank anstatt Database in einem deutschen Text verwenden. Ist es nicht eher ein importieren der Datenbank über das Script im preprocessing Ordner. Und ginge ein Erstellen und Import der Datenbank nicht auch über ein Befehl in der Shell/Terminal?

- Beim GeoServer fehlt die Erwähnung, dass für die Ausführung Java erfodert wird. Für das Einbinden die konkreten Tabellen und Einstellungen benennen. 

- PS. Die Zahl hinter dem localhost beschreibt den Port, hierbei wird ein frei verfügbarerer Port gewählt.

- Dinge wie Einstellungen oder Namen im Text kenntlich machen (*kursiv* oder als `code` Markup)

Code Organisation: 

- Code ist strukturiert, die Kommentare könnten noch erweitert werden. Frontend keine Kommentare vorhanden.
- Wie wird der Geoserver aufgesetzt und wie sind die Layer eingbunden und vorprozessiert?
- Ein Teil der Vorprozessierung im Ordner Diagramm? wie werden die dort liegenden Jupyter Notebooks genutzt?
- Unter Preprocessing ist das .backup jedoch keine Dokumentation, Code etc zu den Preprocessing Schritten drin. Titel ändern?

**GitHub Pages:**

**Allgemein**: Gute Übersicht zum Projekt jedoch an gewissen Orten noch zu generisch, es fehlt eine grafische Übersicht der implementierten und geplanten Features. 

- Home:  Video einbinden und kurz Features auflisten oder Übersichtsgrafik mit den erreichten und geplanten Features.

- Anwendungsbeispiele bebildern

- Architektur erläutern. 
- Daten: Quellen Referenzieren, mit Datum ev auch Grösse, Format des Datensatze, Bildquelle nennen referenzieren (entweder erwähnen, dass es ein eigenes Bild / Screenshot ist, oder modifiziert und Quelle oder wenn ihr es nicht angepasst habt die Bildquelle nennen.)
- Recherche sehr dünn.Verifikation aufführen und Vorgehen, wenn ihr ChatGPT als Quelle nennt.. und die genutzte Version erwähnen. So wie die Quellen aufführen.
- Vorprozessierung und aufbereitung im Sinne der Transparenz aufführen sowie Eure Überlegungen zu fehlenden Daten wie auch deren Visualisierungen.
- Kein Prozessierungsworkflow, keine Erwähnung der Analysen ev. unter Berechnungen
- Technologien Versionen und Links aufführen.
- Weiterentwicklung: FME Workbench existiert? Nirgends erwähnt, noch irgendwie Strukturieren, im Moment noch ein grosser Textblock.
- Literatur und Daten/Library Übersicht am Ende als Quellenverzeichnis oder geeigneter Stelle einfügen. 

GUI:

- Farben in den Diagrammen der Sidebar am Farbschema der Chlorplethenkarte anpassen (dunkelsten Farbwert übernehmen.)
- hintergrund weiss oder leichtes grün - easteregg versteckt auch zeigen (vielleicht auch über ein popup wie bei den Bildern?)

