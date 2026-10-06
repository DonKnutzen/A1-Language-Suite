# Update: tägliche Lernserie

Die Serie gilt pro Profil gemeinsam für Französisch → Deutsch, Türkisch → Deutsch, Deutsch → Französisch und Deutsch → Spanisch.

- Die erste abgeschlossene Übung startet die Serie bei 1.
- Pro lokalem Kalendertag wird höchstens einmal gezählt. Wiederholte Übungen zählen auch dann, wenn sie schon früher erledigt wurden.
- Ein aufeinanderfolgender Tag ohne Übung ist erlaubt. Dieser Pausentag erhöht die Zahl nicht.
- Nach zwei aufeinanderfolgenden Tagen ohne Übung verfällt die Serie. Sie bleibt nicht wiederherstellbar; die nächste abgeschlossene Übung startet bei 1.
- Bei 0 ist die Ecke leer. Ab 1 stehen nur Flamme und Zahl oben rechts im Fortschrittsfeld der Kursstartseite.

Beispiel: Montag üben → 1, Dienstag Pause → 1, Mittwoch üben → 2. Donnerstag und Freitag Pause → verfallen; Samstag üben → 1.

Als Aktivität zählen abgeschlossene Lektions- und Grammatiktests, Hör- und Leserunden, bewertete Vokabelkarten, vollständig ausgefüllte Formulare, ausgewertete Schreibaufgaben mit der jeweiligen Mindestwortzahl sowie erfolgreich beendete Sprachaufnahmen. Das Ergebnis muss nicht fehlerfrei sein. Das Öffnen einer Aufgabe, einzelne Antworten in einer abgebrochenen Runde, leere Eingaben und das Überspringen einer Sprechsimulation zählen nicht.

Die Serie wird getrennt vom Kursfortschritt gespeichert. Bestehende Leistungen erzeugen rückwirkend keine Serie. Das Zurücksetzen eines Kurses setzt die profilweite Serie nicht zurück und erzeugt keine Lernaktivität. Bei Cloud-Profilen wird die Serie über eine private Zeile in der bestehenden Tabelle `course_progress` mit der Kennung `a1-daily-streak` synchronisiert. Dafür ist keine Schemaänderung nötig. Offline bleiben neue Lerntage lokal gespeichert und werden bei erneuter Verbindung synchronisiert.

## Upload

Den gesamten Inhalt der ZIP ins Hauptverzeichnis des bestehenden Projekts übernehmen. Besonders `shared/streak.js`, `shared/profile.js` sowie `app.js`, `index.html` und `service-worker.js` in allen vier Kursordnern müssen zusammen aktualisiert werden. Eigene neuere Einstellungen in `shared/config.js` beibehalten. Die Kurscaches wurden auf `streak-v15` aktualisiert. Nach der Veröffentlichung die Anwendung neu laden, bei einer noch geöffneten älteren Version den Tab schließen und erneut öffnen.

## Prüfung

Geprüft wurden Tageszählung, Wiederholungen, ein erlaubter Pausentag, Verfall nach zwei Pausentagen, Neustart bei 1, lokale Mitternacht, Jahreswechsel, Zeitumstellung, Profilwechsel und Kurswechsel. Funktionstests prüfen gültige und abgebrochene Aufgaben in allen vier Kursen. Browsertests prüfen die leere Anzeige bei 0, die Platzierung mit kurzen und langen Zahlen auf Mobilgeräten und am Desktop, Hell- und Darkmode sowie Offline-Neuladen. Die Cloud-Synchronisierung wurde mit nachgebildeten Anfragen geprüft, nicht gegen die produktive Datenbank.

Die vorhandenen Inhalte aller 96 Lektionen und die erweiterten Lernziele, Grammatikhinweise und Dialoge bleiben erhalten.
