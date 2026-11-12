# Griechisch A1 – Umsetzung und Prüfung

Stand: 12. November 2026.

Dieser Bericht beschreibt die erste Veröffentlichung. Die anschließende [inhaltliche Qualitätsprüfung mit Korrekturen und offenen Lücken](greek-a1-quality-audit.md) ist der aktuelle Qualitätsstand.

## Umfang

- 24 Lektionen ab der ersten Begegnung, mit acht Schritten je Lektion.
- 192 Kernwendungen/Wortgruppen; eigene Dialoge mit deutschen Bedeutungen.
- 552 Trainingsaufgaben in den Lektionspools, 48 zusätzliche Transferfragen.
- 24 vollständige Wissenschecks à 17 Aufgaben; sie verwenden die Kernwendungen als Eingaben und ergänzen Regel-, Transfer-, Lese- und Hörfragen. Diese Wiederverwendung wird nicht als zusätzlicher einzigartiger Lernstoff gezählt.
- 48 Buchstabenaufgaben in vier Gruppen und zwölf Aufgaben zu Lauten/Orthographie.
- Eigene Schreib- und Sprechaufträge je Lektion, Selbstkriterien, gespeicherte Schreibentwürfe, optionale lokale Aufnahme.
- Griechische Eingabehilfe einschließlich Großbuchstaben, Tonos, Trema und Endsigma.
- Vier kumulative A1-Checks à 24 Aufgaben; unabhängiger Kurs-/Profilfortschritt und Offline-Dateiliste.

## Gezielte Prüfungen

`node --test tests/greek-a1.test.cjs tests/french-voice-fallback.test.cjs tests/cloud-sync.test.cjs`

36 Tests bestanden auf dem aktuellen Release-Stand. Geprüft wurden unter anderem alle 192 Lektionsseiten, eindeutige Auswahloptionen, Unicode und Betonung, vollständiger Lektionscheck, zwei zusätzliche Selbstchecks vor Abschluss, Fehlerwiederholung, Eingabehilfe, Audioersatz, griechische Hörprobe, Dateien für Offline-Nutzung und die Trennung des griechischen Cloud-Fortschritts von Französisch bei parallelen Gerätespeicherungen und Zurücksetzen.

Im ursprünglichen Arbeitsstand ergab der gesamte Projektlauf 591 bestandene und 22 fehlgeschlagene Tests. Die 22 Fehler wurden mit den Fassungen von Startseite, Profil und Audio vor der Griechisch-Änderung reproduziert. Der vollständige Release-Lauf auf dem aktuelleren veröffentlichten Ausgangsstand ergab 649 bestandene und 24 fehlgeschlagene Tests. Dort treten zusätzlich zwei bestehende Cache-Versionsprüfungen auf; auch diese wurden ohne die Griechisch-Änderung reproduziert. Diese vorhandenen Fehler liegen außerhalb dieser Erweiterung.

Eine lokale Browser-Sichtprüfung scheiterte am Zugriff auf den lokalen Vorschauport. Nach dem Hinweis des Nutzers, den PC gerade zu verwenden, wurden alle UI-Aktionen eingestellt. Es wird deshalb keine abgeschlossene visuelle Desktop-/Mobilprüfung und keine gehörte Audioprüfung behauptet.

## Redaktionelle Grenzen

Die Inhalte wurden eigenständig erstellt und strukturell geprüft. Eine unabhängige muttersprachliche Redaktion und ein Lernversuch mit echten Anfängern sind noch offen. Sprachausgabe hängt von einer verfügbaren griechischen Geräte-/Browserstimme ab. Es gibt keine automatische Bewertung von Aussprache, freien Texten oder Handschrift. Die App ist keine offizielle Prüfung. Quellen und didaktische Entscheidungen: [Lehrplan](../griechisch/LEHRPLAN-A1.md).
