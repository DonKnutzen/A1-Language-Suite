# A1 Language Suite – vollständiges Upload-Projekt

Stand: 5. Oktober 2026. Vier getrennte Kurse mit gemeinsamen Profilen, Dark Mode und deutscher, französischer oder türkischer Oberfläche für Startseite und Profilmenüs.

| Kurs | Verzeichnis | Cloud-Kennung | Fortschritts-Schlüssel |
|---|---|---|---|
| Französisch → Deutsch | deutsch/ | de | deutschA1GoetheFormatState_v6 |
| Deutsch → Französisch | francais/ | fr | francaisA1DelfState_v1 |
| Deutsch → Spanisch | spanisch/ | es | spanischA1DeleState_v1 |
| Türkisch → Deutsch | turkisch-deutsch/ | de-tr | deutschA1TurkishState_v1 |

## Fertiger Upload

Den aktuellen Stand vorher als Git-Commit oder ZIP sichern. ZIP entpacken und ihren Inhalt ins Hauptverzeichnis des bestehenden GitHub-Pages-Projekts hochladen. index.html, shared/ und die vier Kursordner liegen auf derselben Ebene. Alle Dateien mit übernehmen, insbesondere die neue gemeinsame Datei shared/learning.js.

Die Supabase-Konfiguration und das bestehende Schema wurden unverändert übernommen. Für dieses Update ist keine Datenbankmigration vorgesehen. Eigene neuere Änderungen an shared/config.js vor dem Upload beibehalten. Die Fortschritts-Schlüssel, Kurskennungen und Profil-Namensräume wurden nicht geändert. Der Upload selbst setzt keine Leistungen zurück.

## Französischkurs

24 kompetenzorientierte Lektionen mit je einem Lernziel, Sprachbaustein, Aussprachefokus, Alltagsdialog sowie freier Sprech- und Schreibaufgabe. 224 Phrasen, 240 Lektionsfragen, 12 Grammatiksets mit 104 Fragen und je 81 Hör- und 81 Leseaufgaben. Dazu 10 Formularaufgaben, 15 Schreibaufgaben, 30 persönliche Sprechfragen, 60 Informationskarten und 18 Rollenspiele.

Das Alphabet, Zahlen, Wochentage, Monate und grundlegende Kommunikationsstrategien sind ausdrücklich enthalten. Schreibtraining verlangt mindestens 40 Wörter. Umfang und Zuordnung stehen in francais/LEHRPLAN-A1.md. Die App behauptet keine offizielle Zertifizierung und keinen vollständigen Abgleich mit dem nicht vorliegenden Volltext von Niveau A1 pour le français.

## Weitere Korrekturen

- Zurück-Buttons in Hörübungen öffnen wieder das Menü.
- Das Zurücksetzen erzeugt einen frischen Zustand und speichert ihn für das aktuelle Profil.
- Die Französisch-Anzeige für erledigte Sprechübungen verwendet den vollständigen Aufgabenpool.
- Französisch und Spanisch vergeben keine pauschalen 60 Prozent fürs Beenden einer Schreib- oder Sprechsimulation. Schreibwerte kombinieren Formularergebnis und ausdrückliche Selbstbewertung.
- Türkische Grammatikfragen unterscheiden jetzt eindeutiger zwischen Einzahl, Mehrzahl und höflicher Anrede. Buchstabieren wird mit harf harf söylemek beschrieben.
- Leere türkische Formulare und Nachrichten werden nicht mehr als bearbeitet gespeichert. Freie Formularantworten werden damit nicht automatisch sprachlich bewertet.
- Aufnahmefreigabe, Stoppen, Seitenwechsel und Wiedergabe werden gemeinsam behandelt; abgebrochene und leere Aufnahmen zählen nicht als Sprechleistung.
- Lernaufgaben werden ohne verzerrten Sortiervergleich gemischt.
- Caches der einzelnen Kurse bleiben getrennt. Ein Update des französischsprachigen Deutschkurses löscht nicht den Türkischkurs-Cache. Unabhängige Anwendungen auf derselben Domain bleiben geschützt.
- Bei Offline-Nutzung oder einem Serverfehler werden vorhandene erfolgreiche Seiten aus dem jeweiligen Kurscache verwendet.

## Grenzen der Bewertung

Die Prozentbalken unter Prüfungsreife zeigen bearbeitete Übungen, keine standardisierte A1-Messung. Freies Schreiben und Sprechen brauchen Selbstkontrolle oder eine Lehrperson. Die App verwendet Browser-Sprachsynthese statt offizieller Prüfungsaufnahmen. Die Simulationen sind Training; die tatsächlichen Prüfungsvorgaben stehen in den verlinkten Originalquellen.

## Quellen

- GER/CEFR Companion Volume, Europarat (2020): https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16809ea0d4
- DELF A1 tout public, France Éducation international: https://www.france-education-international.fr/diplome/delf-tout-public/niveau-a1
- Goethe A1, offizielle Übungsmaterialien: https://www.goethe.de/ins/de/de/prf/prf/gzsd1/ueb.html
- Das Spanischmodul verwendet weiterhin die bereits integrierte Struktur des vom Nutzer bereitgestellten DELE-A1-Modells ab 2020.

Die frühere Dokumentation zu Zwischenversionen ist in den Kursordnern vorhanden und mit einem Archivhinweis versehen. Aktuell sind diese README, UPLOAD-README.txt, francais/LEHRPLAN-A1.md und PRUEFBERICHT.txt.
