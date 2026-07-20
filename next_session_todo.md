# TODO-Liste für die nächste Session

Hier sind die geplanten Aufgaben und Erweiterungen für die nächste Entwicklungs-Session:

## 1. Versionierung einführen
- Verwalten von Releases oder Versionsnummern im Code (z. B. `v1.1.0` sichtbar im Footer oder Header der App anzeigen).
- Verknüpfung der Service-Worker-Cache-Version mit dieser Versionsnummer (damit Updates im Browser zuverlässig erkannt und geladen werden).

## 2. Akkukapazität berechnen & anzeigen
- **Eingabefeld hinzufügen**: Eingabe der Gesamtkapazität des Akkus in Amperestunden (Ah), z. B. 100 Ah oder 280 Ah.
- **Neue Tabellenspalte**: Eine Spalte für die **verfügbare Restkapazität** in Amperestunden (Ah) hinzufügen.
- **Berechnung**: Die Restkapazität berechnet sich dynamisch basierend auf der eingegebenen Gesamtkapazität und dem prozentualen Ladezustand (SoC) der jeweiligen Zeile (z. B. bei 280 Ah Gesamtkapazität und 80% SoC = 224 Ah Restkapazität).
- **Live-Statusrechner**: Auch im Live-Statusrechner links soll neben dem Prozentwert die berechnete Restkapazität in Ah angezeigt werden.
