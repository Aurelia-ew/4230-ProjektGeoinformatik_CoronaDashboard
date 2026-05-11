# Erweiterungsmöglichkeiten / Ausblick
Dieses Projekt bildet eine solide Grundlage und kann in Zukunft beliebig erweitert und verbessert werden.

## Allgemein:
Das Dashboard kann künftig auch für andere Pandemien verwendet werden. Kennzahlen wie Ansteckungen, Hospitalisierungen und Todesfälle spielen bei nahezu jeder Pandemie eine zentrale Rolle. Neue Datensätze könnten mithilfe eines FME-Skripts oder ähnlicher Software automatisch in eine Datenbank mit derselben Struktur wie die bestehende Corona_DB importiert werden.
Darüber hinaus könnte der Datenimport automatisiert werden, sodass die Daten während einer laufenden Pandemie kontinuierlich aktualisiert werden.

## Frontend:
Im Frontend bestehen zahlreiche Möglichkeiten zur Weiterentwicklung.
Beispielsweise könnte ein direkter Vergleich zwischen zwei Kantonen implementiert werden. Aktuell kann jeweils nur ein Kanton ausgewählt und analysiert werden. Zukünftig könnten zwei Kantone gleichzeitig ausgewählt werden, sodass deren Kennzahlen direkt miteinander verglichen werden können.
Ausserdem sollte die Webseite besser für unterschiedliche Bildschirmgrössen optimiert werden. Das aktuelle Layout passt sich bereits teilweise an verschiedene Geräte an, jedoch ist die Darstellung noch nicht in allen Fällen optimal.
Die Diagramme dienen momentan hauptsächlich als kompakte Übersicht und sind deshalb relativ klein dargestellt. In Zukunft könnte eine Funktion ergänzt werden, mit der sich Diagramme per Klick in einem grösseren Fenster öffnen lassen, um detailliertere Analysen zu ermöglichen.
Zusätzlich könnte die Interaktivität der Diagramme erweitert werden. Beispielsweise könnte ein beweglicher Tooltip implementiert werden, der beim Navigieren innerhalb des Diagramms gleichzeitig die Karte und den Slider aktualisiert.
Der Homebutton lädt die Webseite derzeit vollständig neu. Künftig könnte stattdessen lediglich der Zustand der Anwendung zurückgesetzt werden, sodass nur die relevanten Parameter auf ihre Standardwerte zurückgesetzt werden.
Zusätzlich könnten die grössten Spitäler als Punkte auf der Karte dargestellt werden, entweder über einen WMS-Dienst oder über FastAPI. Die entsprechenden Spitaldaten sind bereits in der Datenbank vorhanden, wurden aus Zeitgründen jedoch noch nicht in das Dashboard eingebunden.
Die Spitalpunkte könnten interaktiv gestaltet werden. Beim Anklicken eines Punktes könnten in einem Pop-up-Fenster zusätzliche Informationen angezeigt werden, beispielsweise die Anzahl Betten oder die maximale Kapazität des jeweiligen Spitals.
Ausserdem könnten die Spitäler je nach Grösse unterschiedlich visualisiert werden, etwa durch Kreise mit variierendem Durchmesser. Dadurch wäre auf der Karte direkt erkennbar, welche Spitäler eine grössere Kapazität aufweisen.

## Backend:
Auch im Backend bestehen verschiedene Optimierungsmöglichkeiten.
Die aktuellen Schnittstellen werden über FastAPI bereitgestellt. Alternativ könnten bestimmte Abfragen künftig direkt über Datenbank-Views umgesetzt werden. Dies würde die Anzahl der Endpoints reduzieren und die Struktur übersichtlicher sowie einfacher wartbar machen. Performance-technisch wären dabei vermutlich nur geringe Unterschiede zu erwarten.
Darüber hinaus könnten künftig nur noch die Daten geladen werden, die tatsächlich für das aktuell ausgewählte Thema benötigt werden. Derzeit werden unabhängig vom gewählten Themenbereich sämtliche Attribute übertragen. Aufgrund des Projektumfangs und des Zeitrahmens konnte diese Optimierung bisher noch nicht umgesetzt werden.
Weiter sollten in zukünftigen Projekten Sonderzeichen wie ä, ö oder ü in Attributnamen vermieden werden. Dieser Punkt wurde zu Beginn des Projekts übersehen. Im aktuellen Entwicklungsstand würde eine nachträgliche Umbenennung zahlreiche Anpassungen im gesamten Projekt erfordern.
Für zukünftige Pandemien können die bestehenden Tabellen problemlos erweitert werden. Dabei müssten jedoch auch die entsprechenden API-Endpunkte angepasst werden, damit die neuen Daten korrekt verarbeitet und dargestellt werden können.