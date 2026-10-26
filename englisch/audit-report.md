# Qualitätsprüfung Englisch A1

Stand: 26. Oktober 2026. Ausgangsstand: `a64d5c2023938d6f716a7d72c79d8a647c2c3372`.

## A. Prüfungsumfang

Die Inhalte aller 24 Englischlektionen wurden in Lernreihenfolge sprachlich und didaktisch durchgesehen. Dazu gehören auch die einzelnen Antwortalternativen und die zugehörigen Lösungen. Die automatisierten Datenprüfungen ergänzen diese Durchsicht; sie sind kein Ersatz für eine sprachliche Bewertung.

| Inhalt im Autorensatz | Umfang |
| --- | ---: |
| Lektionen | 24 |
| Grammatikerklärungen | 48 |
| Zweisprachige Hauptbeispiele | 144 |
| Einleitende Wendungen mit Übersetzungscheck | 240 |
| Grammatikaufgaben | 768: 480 Übungsaufgaben und 288 Transferaufgaben |
| Zusätzliche Situationsaufgaben im Lektionscheck | 96 |
| Hörtexte | 72: 24 regulär und 48 im Hard Mode |
| Hörfragen | 288: 96 regulär und 192 im Hard Mode |
| Eigenständige Lesetexte / Lesefragen | 24 / 48 |
| Lücken im Hard Mode | 192 |
| Freie Anwendungsaufträge | 24 Sprech-, 24 Schreib- und 24 Hard-Mode-Schreibaufträge |
| Mustertexte für freie Antworten | 24, in den zugehörigen Bereichen wiederverwendet |
| Ursprüngliche Vokabelzuordnungen | 521 Einträge, 495 unterschiedliche englische Stichwörter/Wendungen |
| Erweiterter Wortschatzbestand | 567 unterschiedliche Stichwörter/Wendungen mit deutscher Bedeutung |
| Erfasste englische Textsegmente für den Wortschatzabgleich | 4.558 |

Das ergibt **1.632 objektiv auswertbare Aufgaben bzw. Teilaufgaben**. Mehrfach verwendete Aufgaben in Modulchecks, Fehlertraining und Abschlussrunden werden dabei nicht erneut gezählt. Die 384 Aufgaben der Lektionschecks bestehen aus den 96 Situationsaufgaben und den bereits gezählten 288 Grammatiktransfers.

Im Autorensatz wurden **4.320 Auswahloptionen** geprüft. Davon sind 432 vorbereitete Alternativen der getippten Hard-Mode-Fragen im aktuellen UI nicht sichtbar; diese Fragen verlangen Freitext. Die übrigen 3.888 Optionen werden in mindestens einem der vorgesehenen Übungsformate verwendet. Freie Texte und ihre Selbstbewertung sind in dieser Optionszahl nicht enthalten.

Datenquellen: `content*.js`, `listening-content.js`, `reading-content.js`, `feedback.js`, `course-data.js`, `vocabulary-supplement.json` und der daraus erzeugte Wortschatzplan. Zusätzlich geprüft wurden Anzeige, Lösungsauswertung, Zufallsauswahl, Wiederaufnahme, Fehlertraining, Freischaltung und Audioaufrufe in den ausführenden Modulen.

## B. Festgestellte Probleme

- **Doppelte Wortliste:** Das englische Hörverstehen enthielt nochmals das vollständige Lektionsglossar. Der obere Wortschatz-Link führte außerdem zu einer unnötigen zweiten Navigation.
- **Lücken in der Vorbereitung:** Beispielsweise fehlten Funktionswörter, Objektformen, kurze Verneinungen und Wendungen wie `by card`, `get off` und `on time` in der passenden Wortschatzvermittlung. Einige Wörter kamen früher in Antwortalternativen oder Hörtexten vor als in ihren bisherigen Vokabelzuordnungen.
- **Vorgezogene Grammatik:** Ein früher Hörtext verwendete `there are` vor dessen Einführung. Eine Wetteraufgabe enthielt als Alternative eine noch nicht vermittelte Vergangenheitsfrage. Objektformen und Besitzformen ohne folgendes Nomen waren nicht überall ausreichend erklärt.
- **Zu enge Regeln:** Die Erklärung zu `between` verlangte pauschal zwei mit `and` genannte Bezugspunkte, obwohl ein Beispiel korrekt `between the bedrooms` verwendete.
- **Schwache Distraktoren:** Erfundene Schreibungen wie `goed`, `biger` und `writeing` sowie sachfremde dritte Optionen schwächten Aufgaben. Die bisherige some/any-Reihe prüfte überwiegend nur den Unterschied zu a/an.
- **Verratene Hörantworten:** Mehrere Formatbeispiele enthielten genau die gesuchte Uhrzeit oder den gesuchten Preis.
- **Unklare Aufträge:** Unter anderem war die Bitte um irgendeine „Bestätigung“ gegenüber einer Bestätigung des Nachnamens nicht eindeutig genug. Ein Sprechtext enthielt nach einer vorgeschalteten Frage unklare Personenbezüge.
- **Darstellungsfehler im gemischten Training:** Die deutsche Bedeutungsangabe wurde bei Grammatik-Auswahlfragen nicht durchgehend angezeigt. Dadurch fehlte bei einigen an sich korrekten Aufgabensätzen die entscheidende Abgrenzung.
- **Zu enge Freitextauswertung:** Passende ausgeschriebene Verneinungen wurden teilweise abgelehnt, wenn nur die Kurzform hinterlegt war.
- **Unpassendes Feedback:** Die Rückmeldung übernahm lediglich den ersten Satz der Themenregel; dieser erklärte nicht immer den geprüften Unterschied.
- **Veraltete Fehlereinträge:** Überarbeitete Aufgaben konnten über gespeicherte Fehler erneut mit alten Optionen erscheinen.

## C. Umgesetzte Verbesserungen

### Wortschatz und Lernreihenfolge

Der veröffentlichte Wortschatzplan ordnet neue Wörter einem konkreten Lernabschnitt zu: Einstieg, erstes Grammatikthema, zweites Grammatikthema oder Vorbereitung auf den freiwilligen Hard Mode. Wörter aus späteren Hör-, Lese- oder Checkaufgaben werden vorher eingeführt. Bereits regulär gelernte Wörter werden nicht jedes Mal als neu präsentiert. Eine freiwillige Hard-Mode-Begegnung gilt nicht als Voraussetzung für die spätere normale Einführung.

Die kurzen Wortabschnitte zeigen deutsche Bedeutungen und eine Aussprachetaste. Sie werden nicht automatisch vorgelesen. Das vollständige Glossar bleibt geschlossen in der Lektionsübersicht; es erscheint nicht mehr innerhalb des Hörverstehens. Es enthält den verwendeten Wortschatz einschließlich gekennzeichneter Hard-Mode-Ergänzungen. Eigennamen, einzelne Buchstabencodes und Ziffern sind keine zusätzlichen Lernwort-Einträge.

Das Alphabet und die Zahlengruppen stehen jetzt schon im Einstieg der passenden Lektion. Der Vokabeltrainer erhält die zusätzlichen Wörter, früheren Verwendungslektionen und geprüften Suchformen. Bestehende Kartenkennungen bleiben erhalten. Wiederholte Stichwörter mit unterschiedlichen bisherigen Bedeutungen werden nicht stillschweigend aus gespeicherten Lernständen entfernt.

### Fragen, Erklärungen und Bewertung

Die bestätigten Vorgriffe und Mehrdeutigkeiten wurden korrigiert. Formaufgaben verwenden häufiger tatsächliche englische Formen als Alternativen; Artikelaufgaben unterscheiden beispielsweise a/an/the anhand der eingeblendeten deutschen Bedeutung. Bei some/any werden Aussage, vollständige Verneinung und neutrale Frage ausdrücklich unterschieden. Andere mögliche Verwendungen von some in Fragen werden in Erklärung und Feedback anerkannt.

Auch die Modulchecks der ersten Lektion verwenden jetzt die ausdrücklich verfassten Antwortalternativen statt automatisch ausgewählter Übersetzungen. Die 48 Grammatikthemen haben jeweils eine kurze passende Rückmeldung. Eine richtige Form wird weiterhin im vollständigen Satz mit deutscher Bedeutung gezeigt. Bei getippten Lücken werden passende Kurz- und Langformen der Verneinung akzeptiert. Das gemischte Training zeigt den erforderlichen Kontext.

Neue Grammatikversuche verwenden die überarbeiteten Aufgaben. Unbeantwortete Aufgaben laufender Grammatikrunden können aktualisiert werden; der vorherige Entwurf wird aufbewahrt. Überholte Fehleraufgaben werden aktualisiert oder aus dem aktiven Fehlerpool genommen, ihre alten Datensätze bleiben gespeichert. Alte Lektionscheck-Entwürfe behalten ihren Aufgabenstand und bieten einen ausdrücklich gekennzeichneten Neustart. Hard Mode verwendet Inhaltsversion 3; frühere Versuche und Ergebnisse bleiben im Verlauf erhalten.

Die wiederholten Reihen zu be und Verbendungen bleiben gezielte Formübungen. Namenswechsel allein werden nicht als neue kommunikative Kompetenz gewertet. Hör-, Lese-, Situations- und freie Anwendungsaufgaben erfüllen daneben eigene Lernfunktionen. Die Zahl der Aufgaben wurde nicht als Qualitätsmaßstab erhöht.

### Übersetzungsstrategie

Erklärungen, Aufträge und notwendige Bedeutungsangaben stehen auf Deutsch. Neue Wörter und Lernbeispiele erhalten Übersetzungen. In Hör- und Leseaufgaben wird der zu verstehende Inhalt nicht vorab vollständig übersetzt. Lösungen und vollständige Transkripte im Hard Mode erscheinen nach der Abgabe. Freie Antworten werden anhand möglicher Beispiele und Inhaltspunkte selbst geprüft; andere verständliche Formulierungen sind ausdrücklich zulässig.

### Durchsicht pro Lektion

Alle Zeilen beziehen sich auf die vollständige Durchsicht der zugehörigen Regeln, Beispiele, Wortzuordnungen, Aufgaben, Optionen, Hörtexte, Lesetexte und freien Aufträge.

| Lektion | Wesentliche Korrektur oder gesicherte Grundlage |
| --- | --- |
| 1 | Namensmuster und Pronomen, einschließlich it; Herkunftsalternative England vorbereitet |
| 2 | Besitzwörter in Namensfragen; Kurzformen und Befinden; Alphabet vor den Folgeaufgaben |
| 3 | Vollständige Zahlengruppen; Artikelabgrenzung; Mehrzahlformen; früher there-are-Vorgriff entfernt |
| 4 | Have/has und Besitzerbezug; me/yours erklärt; Tieralternativen vorbereitet |
| 5 | Alltagstätigkeiten und Satzverknüpfungen; notwendige Orts- und Sprachalternativen zugeordnet |
| 6 | Verbendungen mit wirklichen Wortformen; feste Wendungen zu Arbeitsweg und Tageszeit |
| 7 | Do/does und Verneinung; Wochentagspräposition vorbereitet; Langformen akzeptiert |
| 8 | Demonstrativa mit Nähe/Anzahl; Adjektivstellung; plausiblere Alternativen |
| 9 | There is/are und Lage; between präzisiert; Gesprächseinstieg passend zum gehörten Inhalt |
| 10 | Uhrzeiten und Monate; reine Formatangaben in Hörfragen; geschriebene und gesprochene Daten unterschieden |
| 11 | Fragewörter, Häufigkeit und Objektformen; natürlicheres Freizeitbeispiel; eindeutiger Trainingsumfang |
| 12 | Fähigkeiten gegenüber Erlaubnis; cannot/can’t und höfliche Bitten; neue Hilfswörter vorbereitet |
| 13 | Zählbarkeit und Mengen; tatsächliche some/any-Kontraste; no vor Nomen erklärt |
| 14 | Bestellung gegenüber Vorliebe; Zahlungsmittel; Preisfrage ohne verratenen Zahlenwert |
| 15 | Vergleichsformen, one und ours; künstliche Steigerungsformen entfernt |
| 16 | Richtungsangaben, get on/off und Verkehrsmittel; klarerer Situationsauftrag |
| 17 | Continuous und Schreibregeln; klare Personenbezüge; zusätzliche Wetterwörter vor Hard Mode |
| 18 | Gewohnheit gegenüber aktueller Handlung; Zustandsverben; eindeutige Tätigkeitsalternativen und Objektform him |
| 19 | Wetter, there und Superlative; keine vorgezogene Vergangenheitsfrage als Alternative |
| 20 | Have got, Beschwerden und Regeln; quiet/show/on time vorbereitet; Terminfrage präzisiert |
| 21 | Was/were und there was/were; born im richtigen Formkontrast; Besitz mit ’s erklärt |
| 22 | Past Simple, regelmäßige Schreibweisen und häufige unregelmäßige Formen; echte Alternativen statt erfundener Vergangenheitsformen |
| 23 | Wünsche, Vorschläge und Verabredung; natürlicherer Gesprächseinstieg; Zeitangaben ohne Antwortverrat |
| 24 | Hotelkontakt, Zimmer und Dauer; präzise Bestätigungsbitte; Buchungsbedeutung von book sowie took/sent vorbereitet |

### Bereits beauftragte gemeinsame Anzeigeänderungen

In Englisch, Französisch und Deutsch wurde der obere Wortschatz-Link entfernt. Die aufklappbare Wortliste erläutert knapp ihren Zweck als Orientierung und Nachschlagehilfe. Nach einer Tageswiederholung zeigt die Startkarte ein grünes Häkchen, einen Abschlussstatus, die Zahl der abgeschlossenen Runden und eine ruhigere Schaltfläche für eine weitere Runde. Die Zählung richtet sich weiterhin nach dem lokalen Kalendertag. Andere Kursinhalte in Französisch und Deutsch wurden nicht überarbeitet.

## D. Verbleibende Grenzen und Auffälligkeiten

- Die 72 Hörtexte wurden vollständig als Text samt Fragen und Lösungen geprüft. Sprachwahl, Rollen, Wiedergabesteuerung und Auswertungsaufrufe wurden technisch getestet. **Nicht vollständig akustisch geprüft** sind alle 72 Ausgaben mit der konkret auf dem Gerät des Lernenden installierten TTS-Stimme. Stimmenqualität, Namen und buchstabierte Zeichen können vom Browser und Betriebssystem abhängen.
- Freies Sprechen und Schreiben erhalten eine angeleitete Selbstbewertung, keine automatische fachliche Sprachkorrektur. Der Kurs vergibt kein validiertes Sprachzertifikat.
- Die Wortzuordnung ist ein überprüftes technisches Hilfsmittel. Sie erkennt bekannte Flexionsformen und Wendungen; sie beweist keine semantische oder didaktische Fehlerfreiheit. Die Bewertung von Natürlichkeit und Progression erfolgte zusätzlich anhand der Inhalte.
- Der projektweite Testlauf hat weiterhin 13 bereits vor diesem Auftrag nachgewiesene Fehler in älteren Französisch-/Deutschtests und einer gemeinsamen Reporting-Prüfung. Sie sind nicht als behoben ausgewiesen. Der vollständige Kursinhalt dieser anderen Sprachen war nicht Gegenstand dieses Audits.

## E. Validierung und Reproduktion

- **29 Englischtests:** Datenverträge aller Lektionen, Anzeige aller Lernschritte, Grammatikrunden, vollständiger Hard-Mode-Ablauf aller 24 Lektionen, Pausieren, gespeicherte Ergebnisse, Freitextvarianten, Fehleraktualisierung, Wortschatzplatzierung, Audioaufrufe und Tagesabschluss.
- **89 Prüfungen der betroffenen Bereiche bestanden:** zusätzlich Tageswechsel und Rundenzählung, Wortschatzdarstellung/-audio/-zuordnung sowie betroffene gemeinsame und deutsche Datenverträge.
- **Projektweiter Lauf: 374 von 387 bestanden, 13 fehlgeschlagen.** Die Namen dieser 13 Fehler stimmen mit dem bereits protokollierten unveränderten Ausgangsprojekt überein.
- Alle 4.558 erfassten englischen Segmente sind dem Wortschatzbestand zugeordnet. Die Prüfung kontrolliert für jede Verwendung die vorausgehende Einführung, einschließlich optionaler Zusatzwörter. Sie meldet keine unzugeordneten Wörter im erfassten Korpus.
- Alle 4.320 hinterlegten Auswahloptionen haben gültige, nicht doppelte Dreiergruppen. Das prüft Datenkonsistenz; die fachliche Eindeutigkeit wurde zusätzlich inhaltlich durchgesehen.
- Kein Formatbeispiel in einer Hard-Mode-Hörfrage enthält mehr einen konkreten Uhrzeitwert oder die gesuchte Dezimalzahl.
- Geänderte Dateien bestehen die Syntax-/Whitespace-Prüfung; die Laufzeitmodule sind in den zugehörigen Offline-Assetlisten enthalten.

```sh
npm run test:english
node --test --test-concurrency=2 tests/vocabulary-placement.test.cjs tests/vocabulary-audio.test.cjs tests/lexical-coverage.test.cjs tests/lesson-prerequisites.test.cjs deutsch/tests/question-quality.test.cjs tests/daily-review.test.cjs englisch/tests/*.test.cjs
node englisch/tests/helpers/build-vocabulary.cjs
```

Die letzte Zeile erzeugt den statischen Browser-Wortschatzplan aus den geprüften Quelldaten neu. Die Anwendung selbst erzeugt keine Vokabeln durch das Zerlegen beliebiger Sätze.

## Fachlicher Bezugsrahmen

Orientierung an den kommunikativen A1-Beschreibungen des Europarats: vertraute Alltagssituationen, kurze verständliche Äußerungen und Texte, persönliche Angaben sowie einfache Interaktion. Der GER ist dabei ein Kompetenzrahmen, keine verbindliche Liste einzelner Grammatikthemen.

- [Europarat: GER-Niveaubeschreibungen](https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions)
- [Europarat: CEFR Companion Volume 2020](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-companion-volume-and-its-language-versions)
- [Europarat: Deskriptorensuche](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors-search)
