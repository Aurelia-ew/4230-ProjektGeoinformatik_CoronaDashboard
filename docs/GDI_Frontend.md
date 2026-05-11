---
layout: default
title: Aufbau GDI - Frontend
---

# Frontend
Das Frontend der Webseite besteht aus vier zentralen Komponenten:
* Header
* Karte
* Sidebar
* Footer

Jede dieser Komponenten verfügt über eine eigene CSS-Stylesheet-Datei für das jeweilige Design und Layout.
Die Funktionen der einzelnen Komponenten werden im Kapitel Funktionen genauer beschrieben.
Zusammengeführt werden alle Komponenten in der index-Datei. Dort werden zudem die FastAPI-Abfragen, die meisten React-Hooks sowie verschiedene Funktionen zur Interaktivität verwaltet. Dadurch können Daten, React-Komponenten und Interaktionslogiken zentral organisiert und anschliessend an die entsprechenden Komponenten weitergegeben werden.
Ein weiterer Vorteil dieser Struktur ist die Wiederverwendbarkeit von Elementen. So können beispielsweise Funktionen oder Daten gleichzeitig in der Sidebar und im Footer verwendet werden, ohne mehrfach programmiert werden zu müssen.

## Verwendete Technologien
Das Frontend wurde mit folgenden Technologien umgesetzt:
* HTML: Zuständig für die Struktur der Webseite und Elemente wie Buttons oder Eingabefelder.
* JavaScript: Verantwortlich für die Funktionalität und Interaktivität der Webseite.
* CSS: Zuständig für das gesamte Styling und Layout.
* MUI (Material UI): Liefert vorgefertigte Komponenten wie Buttons, Icons oder Textfelder.
* Node Package Manager (NPM): Wird verwendet, um Softwarepakete zu installieren, zu aktualisieren und zu verwalten.
* React: Ermöglicht die Erstellung interaktiver und komponentenbasierter Benutzeroberflächen.
* Vega-Altair: Wird zur Erstellung der Diagramme verwendet.
* OpenLayers: Wird für die Darstellung und Interaktion mit der Karte eingesetzt.
