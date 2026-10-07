# A1 Language Suite

Browserbasierte Sprachlern-App mit vier getrennten A1-Kursen und gemeinsamen Profilfunktionen.

## Kurse

| Kurs | Verzeichnis |
|---|---|
| Französisch → Deutsch | `deutsch/` |
| Deutsch → Französisch | `francais/` |
| Deutsch → Spanisch | `spanisch/` |
| Türkisch → Deutsch | `turkisch-deutsch/` |

## Funktionen

- 24 Lektionen pro Kurs
- gemischte Übungssätze
- Hören, Lesen, Schreiben und Sprechen
- Browser-Sprachausgabe mit auswählbaren Stimmen
- Hilfen für Satzaufgaben und toleranteres Feedback bei kleinen Schreibfehlern
- kursbezogener Lernfortschritt
- gemeinsame Profile und Lernserie
- Dark Mode
- responsive Nutzung auf Desktop und Smartphone
- Offline-Unterstützung über getrennte Service-Worker-Caches

## Projektstruktur

- `index.html` – Startseite und Kursauswahl
- `shared/` – gemeinsame Funktionen und UI-Bausteine
- `deutsch/` – Französisch → Deutsch
- `francais/` – Deutsch → Französisch
- `spanisch/` – Deutsch → Spanisch
- `turkisch-deutsch/` – Türkisch → Deutsch

Kursbezogene Lehrpläne oder fachliche Dokumentation liegen direkt im jeweiligen Kursordner.

## Veröffentlichung

Für GitHub Pages den Inhalt dieses Projektordners als zusammenhängenden Stand hochladen. `index.html`, `shared/` und die vier Kursordner müssen auf derselben Ebene bleiben.

Die App benötigt für die vorhandenen Lernfunktionen keine kostenpflichtige API und keine zusätzlichen TTS-Modelle. Die Aussprache verwendet die im Browser bzw. Betriebssystem verfügbaren Stimmen.

## Daten und Fortschritt

Fortschritt wird pro Profil und Kurs getrennt gespeichert. Wenn eine Cloud-Konfiguration vorhanden ist, kann der bestehende Sync verwendet werden. Die aktuellen Änderungen erfordern keine Datenbankmigration und setzen vorhandenen Lernfortschritt nicht zurück.
