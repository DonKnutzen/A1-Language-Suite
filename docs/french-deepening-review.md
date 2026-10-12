# Français A1: Vorbereitung auf Sprechen und Schreiben

Abgleich aller 24 Lektionen mit den bestehenden Aufgaben und Abschlussfragen.
Lektion 1 behält ihre bewährten Konjugationsübungen. In Lektionen 2–24 werden
die bestehenden Übersichten um verständliche Regeln, hörbare Satzbausteine und
direkte Mini-Tests ergänzt. Hintergrundhinweise sind im passenden Thema integriert.

| Lektion | Ergänzte Vorbereitung | Themen mit direkter Übung |
| --- | --- | ---: |
| 2. Alphabet & Buchstabieren | Alphabet & Namen; Buchstabieren lassen & nachfragen | 3 |
| 3. Zahlen, Telefon & persönliche Daten | Alter & avoir; Zahlen bis 100; Telefon & Formular | 3 |
| 4. Uhrzeit, Tage & Termine | Uhrzeiten verstehen & sagen; Wochentage; Monate & Datum; Einen Termin vereinbaren & bestätigen | 4 |
| 5. Familie & Personen | Familie & Besitz; Personen beschreiben | 2 |
| 6. Essen & Trinken | Essen, Trinken & Artikel; Höflich bestellen | 2 |
| 7. Einkaufen, Mengen & Preise | Mengen & Einkaufsliste; Preis, Gesamtpreis & Bezahlen | 2 |
| 8. Wohnen & Adresse | Räume & il y a; Wo steht der Gegenstand?; Adresse & Besichtigung | 3 |
| 9. Stadt, Weg & Verkehr | Einen Weg in zwei Schritten erklären; Nach Weg & Verkehr fragen | 2 |
| 10. Arbeit & Schule | Beruf & Studium; Regelmäßige Verben anwenden; Drei Fragen & vier Antworten | 3 |
| 11. Tagesablauf & Gewohnheiten | Morgendliche Tätigkeiten; Was passiert gerade?; Einen Tagesablauf verbinden | 3 |
| 12. Gesundheit & Apotheke | Symptome nennen; Hilfe erbitten & krankmelden | 2 |
| 13. Wetter & Kleidung | Wetter & Jahreszeiten; Dieses Kleidungsstück; Farben & Kleidung; Klein, blau & Größe M | 4 |
| 14. Freizeit & Vorlieben | Aktivitäten & Vorlieben; Fragen & Wochenende beschreiben | 2 |
| 15. Reise & Hotel | Eine Reise planen; Zimmer buchen & schriftlich anfragen | 2 |
| 16. Einladen, verabreden & absagen | Einladen, zusagen & absagen; Telefon, Glückwünsche & Nachricht | 2 |
| 17. Formulare & kurze Nachrichten | Formularfelder verstehen; Eine Nachricht mit 40 Wörtern aufbauen | 2 |
| 18. Prüfungsstrategien & Höflichkeit | Nicht verstehen & nachfragen; Hilfe & langsames Sprechen; Höfliche Bitte & Informationsanfrage | 3 |
| 19. Artikel, Geschlecht & Plural | Nomen mit Artikel lernen; Zwei Dinge in den Plural setzen; Geschlecht merken; Gegenstände zeigen & beschreiben | 4 |
| 20. Präsens & Verneinung | Positive Alltagssätze; Mit ne … pas verneinen; Nie statt nicht; Regeln & Verbote | 4 |
| 21. Fragen & Possessivbegleiter | Gezielt Informationen erfragen; Einfache Frageformen; Person oder Sache?; Besitz in einer Frage; Betonte Pronomen | 5 |
| 22. Gestern, heute & morgen | Gestern: passé composé mit avoir; Zeit & Reihenfolge; Passé composé mit être; Gerade eben: venir de; Vor, in oder seit? | 5 |
| 23. Mengen, Rezepte & Teilungsartikel | Zutaten & Teilungsartikel; Zutaten mit genauer Menge; Zutaten weglassen; Ein wenig & zu viel; Zweck & zwei Zubereitungsschritte | 5 |
| 24. Länder, Reisen & einfache Pläne | Zielort nennen; Herkunft nennen; Abfahrt & Verkehrsmittel; Eine Reisenachricht aufbauen | 4 |

Jeder Durchlauf enthält höchstens sechs Fragen; Wortschatz und Formen werden gemischt.
Wiederholungen bevorzugen bisher nicht bearbeitete Fragen. Der Übungsfortschritt
liegt unter `lessonWork[lessonId].deepening[topicKey]`; vorhandener Kursfortschritt
und Abschlusstest-Ergebnisse werden nicht zurückgesetzt.

Umfang: 71 Übungsthemen mit 657 Fragen im Pool. Die Zahl umfasst auch die aus bestehenden Tabellen und Abschlussfragen gebildeten Übungen.

## Korrigierte Musterantworten

- Lektion 4: Tag, Uhrzeit, Ort und Bestätigung werden vollständig vorbereitet.
- Lektion 11: Morgen mit drei Tätigkeiten; fünf Sätze im Schreibbeispiel.
- Lektion 13: genau drei Sätze über Wetter und Kleidung.
- Lektion 17: Formularangaben plus eine eigenständige Nachricht mit mindestens 40 Wörtern.
- Lektion 19: fünf Gegenstände und zwei Plurale in der Sprechvorlage; drei Schreibsätze.
- Lektion 20: drei positive und drei negative Schreibsätze.
- Lektion 21: fünf unterschiedliche Fragewörter beim Sprechen und vier Schreibfragen.
- Lektion 22: gestern, gerade abgeschlossen und morgen im Sprechbeispiel.
- Lektion 23: Zutaten und zwei tatsächliche Zubereitungsschritte.
- Lektion 24: Reisenachricht mit mindestens 40 Wörtern.

## Prüfung

`node --test tests/french-deepening.test.cjs` (benötigt jsdom als Entwicklungswerkzeug).
Die Tests prüfen alle Lektionen, erhaltene Referenztabellen, vollständige Vorbereitung
der bisherigen Abschlussfragen, Navigation, Audio nach jeder Antwort, Speicherung
des Themenfortschritts sowie Aufgabenbezug und Umfang der Musterantworten.
Deutsch A1 und gemeinsame Kursdateien werden nicht verändert.
