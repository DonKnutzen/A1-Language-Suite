# Language Suite

Browserbasierte Sprachlern-App mit drei A1-Kursen und einem eigenständigen Deutsch-C1-Kurs samt gemeinsamen Profilfunktionen.

## Kurse

| Kurs | Niveau | Verzeichnis |
|---|---:|---|
| Französisch → Deutsch | A1 | `deutsch/` |
| Deutsch → Französisch | A1 | `francais/` |
| Deutsch → Spanisch | A1 | `spanisch/` |
| Türkisch → Deutsch | **C1** | `turkisch-deutsch/` |

## Funktionen

- getrennte, niveaugerechte Lehrpläne pro Kurs
- Hören, Lesen, Schreiben und Sprechen
- Browser-Sprachausgabe mit auswählbaren Stimmen
- kursbezogener Lernfortschritt
- gemeinsame Profile, Lernserie und Rangliste
- Dark Mode
- responsive Nutzung auf Desktop und Smartphone
- Offline-Unterstützung über getrennte Service-Worker-Caches
- **Deutsch C1 · Türkçe:** 40 Lektionen mit C1-Grundlagen, berufsbezogener Sprachhandlung, Mediation sowie vollständiger aufgabenbezogener Vorbereitung auf den Deutsch-Test für den Beruf C1; Goethe-Zertifikat C1 bleibt als Zusatztraining verfügbar

## Projektstruktur

- `index.html` – Startseite und Kursauswahl
- `shared/` – gemeinsame Funktionen und UI-Bausteine
- `deutsch/` – Französisch → Deutsch A1
- `francais/` – Deutsch → Französisch A1
- `spanisch/` – Deutsch → Spanisch A1
- `turkisch-deutsch/` – Türkisch → Deutsch **C1**

Kursbezogene Lehrpläne oder fachliche Dokumentation liegen direkt im jeweiligen Kursordner. Für den C1-Kurs ist die vollständige Struktur in `turkisch-deutsch/LEHRPLAN-C1.md` dokumentiert.

## Veröffentlichung

Für GitHub Pages den Inhalt dieses Projektordners als zusammenhängenden Stand hochladen. `index.html`, `shared/` und die vier Kursordner müssen auf derselben Ebene bleiben.

Die App benötigt für die vorhandenen Lernfunktionen keine kostenpflichtige API und keine zusätzlichen TTS-Modelle. Die Aussprache verwendet die im Browser bzw. Betriebssystem verfügbaren Stimmen. Der C1-Kurs nutzt für Sprachaufnahmen zusätzlich `MediaRecorder`, sofern der Browser diese Funktion unterstützt.

## Daten und Fortschritt

Fortschritt wird pro Profil und Kurs getrennt gespeichert. Der neue Türkisch→Deutsch-C1-Kurs verwendet einen eigenen Kurscode und einen eigenen lokalen Speicherstand; dadurch wird alter A1-Fortschritt nicht fälschlich als C1-Fortschritt übernommen. Wenn eine Cloud-Konfiguration vorhanden ist, kann der bestehende Sync weiterhin verwendet werden. Die Datenbanktabellen speichern Kurscodes als Text, daher ist keine Schema-Migration erforderlich.
