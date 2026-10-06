A1 LANGUAGE SUITE – FERTIGE KOMPLETTVERSION

1. Bisherigen Projektstand sichern.
2. ZIP entpacken.
3. Den kompletten INHALT ins Hauptverzeichnis des GitHub-Pages-Projekts hochladen:
   index.html, service-worker.js, shared/ und alle vier Kursordner.
4. Nach Veröffentlichung die Seite neu laden; bei alten Inhalten den Tab schließen
   und erneut öffnen. Die Service-Worker-Versionen wurden aktualisiert.

Enthalten:
- Französisch → Deutsch A1
- überarbeitetes Deutsch → Französisch A1
- Deutsch → Spanisch A1
- Türkisch → Deutsch A1
- DE / FR / TR für Startseite und Profilmenüs
- gemeinsame Profile, Lernserie, Audio, Dark Mode, Fortschritt und Prüfungstraining

shared/learning.js und shared/streak.js müssen mit hochgeladen werden.
Kurskennungen und Fortschritts-Schlüssel bleiben unverändert.
shared/config.js und shared/supabase.sql wurden unverändert übernommen.
Keine Datenbankänderung ist für dieses Update vorgesehen. Falls du eine neuere
persönliche Konfiguration hast, behalte diese beim Upload.

Die Tests wurden lokal und mit nachgebildeten Cloud-Anfragen ausgeführt,
nicht gegen deine produktive Supabase-Datenbank. Details zum aktuellen Update:
UPDATE-LERNSERIE.md. Frühere Prüfungen: PRUEFBERICHT.txt.

LERNSERIE – AKTUELLE VERSION streak-v15
Eine gemeinsame Serie pro Profil in allen vier Kursen. Ein Pausentag ist erlaubt
und zählt nicht mit. Nach zwei aufeinanderfolgenden Pausentagen verfällt die Serie;
die nächste abgeschlossene Übung beginnt wieder bei 1. Bei 0 bleibt die Anzeige
leer, ab 1 stehen Flamme und Zahl oben rechts im Fortschrittsfeld.
Die Kursdateien und Service Worker aller vier Kurse zusammen übernehmen.

DARK-MODE-FIX v12 – TÜRKISCH → DEUTSCH (bereits enthalten)
Auch turkisch-deutsch/index.html und die index.html im Hauptverzeichnis
ersetzen. Der neue Kurseinstieg und die neuen Dateiversionen umgehen alte
Browserantworten. Erst nach abgeschlossener GitHub-Pages-Veröffentlichung
neu öffnen. Optional den Kurs mit /turkisch-deutsch/?v=tr-theme-12 aufrufen.
