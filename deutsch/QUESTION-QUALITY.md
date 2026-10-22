# Deutsch A1: Aufgabenqualität, Revision 149

Geprüfter Ausgangsstand von `main`: `d9db4ad9e937da0842a497fa19b19f37a097487c`.
Überarbeitung: 22. Oktober 2026. Betrifft ausschließlich Deutsch A1; der gemeinsame
Übungsrunner erhält eine optionale Antwortprüfungsfunktion mit unverändertem Standardverhalten.

## Ergebnis und Umfang

Die bisherigen zwölf Fragen eines Lektionschecks bestanden aus acht Aufgaben des
Grammatikpools und vier Lese-/Dialogfragen. Der neue, separat verfasste Checkbestand
enthält **338 Aufgaben in 24 Checks mit 12–16 Fragen**, davon jeweils mindestens
sechs getippte Antworten. Die Lernziele bleiben an den tatsächlichen deutschen
Lektionsinhalten ausgerichtet; die französische Lektionsfolge wurde nicht übertragen.

Alle **50 vorbereiteten Themen** wurden anhand ihrer Regeln, Beispiele und Lösungen
geprüft und ihre Übungspools überarbeitet: **512 Aufgaben**, darunter vier produktive
Lücken pro Thema. Die alten, häufig doppelt abgefragten Übersetzungskarten und zwei
zufälligen Zusatzübersetzungen entfallen dort. Die Einführung mit Vokabelerkennung
bleibt eine eigene Lernstufe. Zusätzlich wurden die **21 allgemeinen Grammatikthemen**
mit jetzt **267 Aufgaben** sowie die ergänzten gemischten Grammatiksets durchgesehen.

Die Zahlen beschreiben den aktuellen Umfang, keine didaktische Obergrenze.
Ein ausgefüllter Test ist kein Beleg dafür, dass jede einzelne A1-Kompetenz geprüft
oder eine offizielle Prüfung ersetzt wurde. Freies Schreiben und echtes Hörverstehen
bleiben eigene Kursbestandteile; dieser Check prüft Sprachstrukturen und schriftlichen Transfer.

## Lektionen und Abdeckung

Alle aufgeführten Checks haben einen eigenen Aufgabenbestand; keine vollständige
Frage wird aus den Einführungs- oder Themenübungen übernommen.
Die Spalte „Tippen“ zählt produktive Lücken, keine freie Sprachbewertung.

| L. | Schwerpunkte des überarbeiteten Checks | Fragen | Tippen |
| --- | --- | ---: | ---: |
| 1 | Name, Herkunft, Wohnort, Sprachen, Fragen, sein/haben, Personalformen | 16 | 9 |
| 2 | Buchstabieren, Umlaut/ß/Bindestrich, Wiederholen, können, Infinitiv | 12 | 6 |
| 3 | Zahlendreher, 13/30, Jahreszahl, Geburtsort/-datum, Telefon, PLZ | 12 | 6 |
| 4 | halb/Viertel, Wochentage, Monate, Datum, Zeitraum, am/um/im, Termin | 16 | 8 |
| 5 | Familie, Alter, haben/sein, Possessive, Akkusativ, Identität, Familienstand | 16 | 9 |
| 6 | Bestellung, Artikel, hätte/möchten, mit/ohne, Speisekarte, Rechnung | 14 | 8 |
| 7 | kostet/kosten, wie viel/viele, Mengen, Centbeträge, Größen, Etagen | 14 | 8 |
| 8 | Räume/Ausstattung, frei, Miete/Nebenkosten, Besuch, Kontakt, Artikel | 14 | 8 |
| 9 | Wegfolge, zum/zur, mit dem/der, Linie/Gleis, Umsteigen, Verspätung | 14 | 8 |
| 10 | Beruf/Arbeitsort, als, von/bis, frei, Verspätung, Verbzweitstellung | 14 | 8 |
| 11 | Kurszeiten, seit + Präsens, Hilfe erbitten, lesen, Aufgabenfolge | 14 | 8 |
| 12 | gern/nicht gern/lieber, Verabredung, Modalfrage, Datum/Uhrzeit | 14 | 8 |
| 13 | Zimmer, Personen/Nächte, Reservierung, Frühstück, abfahren/ankommen, Dauer | 14 | 8 |
| 14 | Beschwerden/Zustand, haben/sein, seit, Arzttermin, Absage, Besserung | 14 | 8 |
| 15 | Einladung mit Zeit/Ort, Zusage/Absage/Grund, müssen, mitbringen | 14 | 8 |
| 16 | nur, erlaubt/verboten, kein/nicht, Öffnungszeiten/ab, Zugausfall | 14 | 8 |
| 17 | Erlaubnis, können + Infinitiv, mir, Objektartikel, Zustimmung/Ablehnung | 14 | 8 |
| 18 | Arbeitsanweisungen, Imperativ Sie, ankreuzen, Reihenfolge, Textaufbau | 14 | 8 |
| 19 | Körperteile, tut/tun, Possessive, seit, Arzt/Apotheke, Anweisungen | 14 | 8 |
| 20 | Wetter/Zeitbezug, Satzstellung, Kleidung/Artikel, mitnehmen, Winter | 14 | 8 |
| 21 | Vorlieben, lesen, Ausflug, Treffpunkt versus Beginn, Eintrittspreis | 14 | 8 |
| 22 | Anrufer/Rückruf, zurückrufen, mich/mir, du/dir/Sie/Ihnen, SMS | 14 | 8 |
| 23 | Post/Schalter, Formularfelder, Adresse versus Geburtsort, anmelden/ausfüllen | 14 | 8 |
| 24 | Vorstellung, Rückfrage, und/aber, Nachricht mit drei Inhaltspunkten | 14 | 8 |

## Bestätigte Probleme und Korrekturen

- **Direkt wiederverwendete Grammatikfragen im Check:** `study.js.assessmentTasks`
  zog acht bekannte Aufgaben. Jetzt gibt es in `question-content.js` einen eigenen
  Checkbestand mit neuen Situationen, Verständnisfragen und produktiven Anwendungen.
- **Falscher Fokus bzw. offensichtlich unpassende Optionen:** etwa `mein ___` mit
  `Bruder / mein / meine`, `einen ___` mit `Kuchen / Salat / Brot` oder `am ___`
  mit Tagesnamen und `heute`. Lücken prüfen nun gezielt den Possessiv-/Artikelgebrauch;
  Kalenderoptionen und Zahlen gehören jeweils derselben Kategorie an.
- **Zu wenig Strukturprüfung in thematischen Übungen:** Preise erhalten
  `Wie viel kostet das Brot? / Wie viel kosten die Schuhe? / Wie viele Äpfel?`;
  Reiseaufgaben prüfen auch `fährt … ab / kommt … an`, Rückrufaufgaben
  `rufe … zurück / können … zurückrufen`. Zahlenverständnis bleibt zusätzlich erhalten.
- **Unvollständige Konjugationsabdeckung:** Die Höflichkeitsfrage ersetzte zuvor
  die wir-Aufgabe des zweiten Verbs. Sie wird jetzt zusätzlich gestellt; beide
  wir-Formen bleiben erhalten.
- **Zu schmale Possessivübung und unvollständige Erklärung:** 27 Aufgaben prüfen
  sieben unterschiedliche Stämme mit drei Nomengeschlechtern plus sechs bestehende
  Akkusativanwendungen. Die Unterrichtstabelle erklärt diese Formen einschließlich
  `euer/eure` und `Ihr/Ihre`; die Pluralübung umfasst zusätzlich die Höflichkeitsform.
- **Umlautverlust in der allgemeinen Eingabeprüfung:** Neue deutsche Grammatik-
  und Checklücken unterscheiden `konnte/könnte`, `hatte/hätte`, `schon/schön`.
  NFC, Groß-/Kleinschreibung, übliche Schlusszeichen und zusätzliche Leerzeichen
  werden toleriert. `ae/oe/ue` und `ss` sind als Tastaturalternativen zulässig;
  eine ausdrücklich großschreibungsabhängige Aufgabe kann `caseSensitive` verlangen.
  Das ist Wort-/Formprüfung, keine automatische Bewertung freier Nachrichten.
- **Produktive Lücken wurden in Wiederholungen zu Auswahlfragen:** Eine vorhandene
  Optionsliste entscheidet dort nicht mehr über den Aufgabentyp, wenn `type` eine
  Lücken-/Texteingabe verlangt. Dieselbe deutsche Antwortprüfung gilt auch dort.
- **Neue Interpretationsfragen mit französischen Optionen:** Das Lösungsreplay liest
  eine ausdrücklich hinterlegte deutsche Aussage statt einer französischen Antwort
  mit deutscher Stimme. Vor der Abgabe wird kein Lösungsreplay eingeblendet.

## Bereits begonnene Versuche und Fehlergedächtnis

- Laufende alte Lektionschecks behalten ihren Fragenbestand und ihre Bewertungsregeln.
  Die Einstiegsseite nennt den alten Umfang und bietet einen ausdrücklichen Neustart
  des neuen Checks an. Dabei bleibt der alte Entwurf als Snapshot erhalten.
- Bereits erreichte Lektionsbestleistungen und der Lektionsabschluss bleiben bestehen.
  Die Bestehensgrenze wird nicht verändert.
- Bei alten Grammatikrunden werden nur unbeantwortete Aufgaben aktualisiert;
  beantwortete Fragen, Feedback und Punktestand bleiben erhalten. Der vorherige
  Entwurf wird archiviert. Der vollständige neue Umfang gilt für einen neuen Durchgang.
- Veraltete Wiederholungsfragen werden archiviert/aus dem aktiven Bestand genommen.
  Eine semantisch passende Nachfolgefrage übernimmt die Fehlerhistorie nur bei
  identischer Lösung und identischem deutschen Lösungssatz. Ein neuer Lerngegenstand
  erhält keinen erfundenen Fehler. Bewertete Antworten laufender Runden bleiben bestehen.
- Gemischte Wiederholungen verwenden weiterhin ausschließlich konkrete Grammatikthemen.
  Lektionschecks und Hörtests werden dort nicht zusätzlich eingemischt. Bereits
  gespeicherte tatsächliche Fehler aus anderen Kursteilen bleiben im Fehlermodus möglich.

## Verifikation und Grenzen

- Inhaltsprüfung im Quelltext: Regeln/Beispiele der 50 Themen, 21 zusätzliche
  Grammatikthemen, ursprüngliche gemischte Sets, neue Aufgaben, Lösungen, Ablenker,
  Lernzielbezug und Antwortreplays. Ergänzte Voraussetzungen werden vor dem Üben erklärt.
- Automatisch: 184 bestandene Tests einschließlich Französisch-Regressionen,
  Deutsch-A1-Parität, Hörsteuerung, Hard Mode, Wiederholung, Audiofreigabe und
  zwölf neuen Tests zu den deutschen Fragen/Antworten und Zustandswechseln.
- Praktisch in Chromium: alle 24 Checks vollständig beantwortet bei 390 px;
  zusätzliche vollständige Durchgänge ausgewählter umfangreicher Checks bei
  320 und 1280 px; alle 50 Themen mit 512 Aufgaben durchlaufen; echte Eingabe,
  Korrektur, Sperrung, Punkte, Fortsetzen, Speichern/Neuladen und Revieweinstieg geprüft.
  Die Possessivübersicht wurde bei allen drei Breiten visuell geprüft.
- Sprachsynthese wurde für reproduzierbare Browsertests abgefangen. Geprüft wurden
  deutscher Ausgabetext und Zeitpunkt der Wiedergabe, **nicht die hörbare Qualität
  einer konkreten Geräte-/Browserstimme**. Kein praktischer Safari-/VoiceOver-Test.
- Keine neue offizielle Prüfungsäquivalenz oder Zertifizierung; keine kostenpflichtigen
  Dienste oder Abhängigkeiten. Deutsch C1, Spanisch und französische Kursinhalte
  bleiben außerhalb dieser Änderung.

## Quellen im Repository

`question-content.js`: getrennte Autorenbestände, Lernziele, Inhaltskorrekturen,
Voraussetzungen und deutsche Antwortprüfung. `study.js`: thematische Übungen,
Checkbestand und Aktualisierung offener Aufgaben. `grammar-drills.js` und `app.js`:
Konjugations-/Possessivübungen und Erklärung. `assessments.js`: Durchführung,
Korrektur und Fortsetzung alter Checks. `review-practice.js`: produktive Wiederholung
und alte Fehlerbestände. Tests: `tests/german-course.test.cjs`,
`deutsch/tests/question-quality.test.cjs`, `deutsch/tests/parity.test.cjs`.
