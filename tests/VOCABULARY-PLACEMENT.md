# Wortschatz im Lernablauf vermitteln, Vorwegnahmen entfernen

Ausgangsstand: `0376d831346906fbae39b1a7683695aba36af5bf`, Französisch A1 und Deutsch A1.

## Bestätigter Fehler und konkrete Korrektur

Die vorherige Ergänzung in Deutsch 1, „Se présenter“, enthielt komplette regelmäßige Endungen, sprechen mit Vokalwechsel und haben. Die regulären Verben und sprechen werden später in derselben Lektion auf eigenen Seiten behandelt; haben gehört hier zur späteren Familienlektion. Der Zusatzblock war eine sachlich unpassende Vorwegnahme. Die bisherigen Tests kontrollierten nur, ob irgendeine Erklärung vor der Aufgabe stand. Sie belegten keine sinnvolle didaktische Zuordnung.

- Die drei Blöcke wurden aus „Se présenter“ entfernt. Die vorhandenen vollständigen Verbtabellen bleiben an ihren eigentlichen Lernorten.
- Frühe verfasste Aufgaben prüfen die zuvor gezeigten ich-Sätze und höflichen Fragebausteine. Beispiel: `Ich ___ aus Deutschland.` mit `komme / kommt / kommen` statt `Du ___ aus Kanada.`, bevor du eingeführt wurde.
- Die erste Pronomenübung verlangt jetzt die Zuordnung der tatsächlich erklärten Pronomen, einschließlich sie/Sie und ihr. Sie fragt keine sein-/sprechen-Konjugation und keine können-/haben-Sätze ab, bevor diese erklärt sind. Zehn eigenständige Aufgaben bleiben erhalten. Die ausdrücklich geprüfte Groß-/Kleinschreibung von sie/Sie wird dabei auch in der tatsächlichen Antwortprüfung unterschieden.
- Im Deutsch-1-Check ersetzt `Ihr ___ in Berlin.` → `wohnt` die dort verfrühte haben-Frage. Die regelmäßige Form wird vor dem Check in derselben Lektion vermittelt. Fragenpools behalten ihren Umfang.
- In Deutsch 10 steht die arbeiten-Schreibregel jetzt bei „Verbes réguliers au présent“, neben der zugehörigen Tabelle, statt vorgezogen bei „Métier et horaires“.

## Übersicht und Vermittlung sind unterschiedliche Funktionen

Die vollständige reguläre Wortliste bleibt als **eingeklappte Übersicht** pro Lektion verfügbar. Sie wird nicht auf erstmalige Wörter reduziert. Eine große Zahl wird nicht mehr an den Einstiegstitel angehängt. Für diese Übersicht wird die aktuelle tatsächliche reguläre Verwendung herangezogen; die früher aus allen Quellen zusammengeworfenen Lektionsassoziationen werden nicht einfach vollständig auf die Seite kopiert.

Zusätzliche Wortübersetzungen stehen im Ablauf bei der jeweils benötigten Übung: nach den Beispielen, vor dem Quiz oder Mini-Test beziehungsweise vor dem Hördialog. Bereits übersetzte Beispiele, vorhandene Tabellen, Regeltexte und frühere reguläre Lektionen fließen in die Zuordnung ein. Aus dem späteren Check zusätzlich benötigte Wörter werden einem vorausgehenden Grammatikthema zugeordnet. Der Check führt keinen neuen Regelblock ein. Ganze Musterantworten werden nicht als Vokabeln vor eine Aufgabe geschrieben.

`shared/lesson-vocabulary-plan.js` enthält die festgehaltenen Zuordnungen für alle 48 Lektionen. Die Laufzeit benötigt keine Sprachanalyse und keine API. Der lokale Kandidatenbauer `tests/helpers/build-vocabulary-placement.cjs` gleicht tatsächlich gerenderte Seiten, Übungspools, korrekte Zieltexte, Alternativen, Modelle und Hörskripte mit den vorhandenen Wortkarten und Suchformen ab. Seine Zuordnungen wurden anhand der Seitenreihenfolge und der Themen kontrolliert. Wortformen und mehrdeutige Bedeutungen können mit einem solchen Abgleich nicht vollständig semantisch bewiesen werden; er ersetzt keinen Lerntest mit Anfängern und keine Bewertung jeder denkbaren freien Antwort.

## Hard Mode

Wortschatz, der zusätzlich erst im Hard Mode benötigt wird, steht vor `hardBegin`. Wörter aus vorherigen optionalen Hard Modes werden nicht pauschal als in späteren regulären Lektionen gelernt vorausgesetzt. Im laufenden oder abgegebenen Test erscheint diese Vorbereitung nicht. Es werden keine Transkripte, Eigennamen-Lösungen oder vollständigen Antwortsätze aus einer Hörfrage vorweggenommen.

Französische Aufgabenbefehle wie `Écris …`, `Réponds en chiffres.` und `Quelle phrase est correcte ?` erhalten eine eigene kurze, eingeklappte Verständnishilfe. Gezeigt werden nur die Befehle, die im jeweiligen Hörteil vorkommen. Im Deutschkurs ist Französisch bereits die reguläre Erklärungssprache; dort wird diese Hilfe nicht künstlich dupliziert.

Die Vorbereitung ist keine automatische Bestätigung neuer Grammatikkenntnisse. Die Prüfungsaufgaben und Bestehensgrenzen bleiben außerhalb der oben genannten Deutsch-1-Korrektur erhalten.

## Vokabeltrainer und bestehende Lernstände

Der Tab behält den gesamten Kurswortschatz. Seine Lektionsfilter verwenden dieselben aktuellen Unterrichtszuordnungen wie Übersicht und Hard-Mode-Vorbereitung. Bestehende Kartenkennungen, Bewertungen, alte Fehlerstapel und frühere Assoziationen werden zur Kompatibilität erhalten; eine geänderte Anzeige löscht keinen Vokabelfehler. Lernfortschritt bestimmt nicht, welche Erklärung die nächste Person sehen kann.

Bei betroffenen deutschen Grammatikentwürfen wird Revision 157 gezielt angewendet: offene veraltete Aufgaben werden ersetzt und der bisherige Entwurf wird archiviert. Bewertete Antworten, erarbeitete Punkte, Bestwerte und Abschlüsse bleiben bestehen. Alte Fehler zu den ausgemusterten Einstiegsfragen bleiben historisch gespeichert, werden aber nicht erneut als aktuelle Trainingsaufgaben angeboten. Bereits laufende Lektionschecks behalten wie bisher ihren gespeicherten Aufgabenstand bis zum Abschluss; neu gestartete Checks verwenden die korrigierte Frage.

## Geprüfte Zuordnungen aller Lektionen

Pro Zelle: **reguläre Wörter in der Übersicht / zusätzliche Worterklärungen im Ablauf / zusätzliche Hard-Mode-Wörter**. Es sind Eintragszahlen der App, keine offizielle A1-Norm. Die zweite Zahl enthält nur Ergänzungen, die nach dem Abgleich noch nötig waren; ein Wert 0 bedeutet nicht, dass eine Lektion keinen Wortschatz vermittelt.

| Lektion | Französisch A1 | Deutsch A1 |
|---|---|---|
| 1 | 51 / 12 / 13 | 53 / 15 / 5 |
| 2 | 48 / 7 / 8 | 37 / 3 / 10 |
| 3 | 71 / 10 / 19 | 66 / 10 / 8 |
| 4 | 96 / 14 / 6 | 93 / 10 / 6 |
| 5 | 61 / 9 / 7 | 69 / 14 / 6 |
| 6 | 63 / 9 / 9 | 47 / 5 / 10 |
| 7 | 77 / 8 / 10 | 66 / 5 / 8 |
| 8 | 72 / 7 / 1 | 76 / 9 / 2 |
| 9 | 56 / 4 / 4 | 63 / 8 / 11 |
| 10 | 60 / 5 / 2 | 64 / 1 / 3 |
| 11 | 71 / 4 / 3 | 62 / 4 / 4 |
| 12 | 80 / 11 / 5 | 58 / 2 / 4 |
| 13 | 70 / 5 / 4 | 70 / 1 / 12 |
| 14 | 59 / 5 / 5 | 59 / 3 / 10 |
| 15 | 75 / 5 / 5 | 72 / 1 / 3 |
| 16 | 84 / 11 / 7 | 59 / 2 / 8 |
| 17 | 75 / 4 / 12 | 39 / 1 / 9 |
| 18 | 87 / 8 / 8 | 57 / 1 / 6 |
| 19 | 55 / 2 / 5 | 52 / 0 / 3 |
| 20 | 66 / 1 / 7 | 65 / 3 / 9 |
| 21 | 86 / 2 / 4 | 55 / 0 / 1 |
| 22 | 80 / 2 / 4 | 59 / 0 / 2 |
| 23 | 55 / 3 / 2 | 66 / 0 / 6 |
| 24 | 68 / 1 / 2 | 114 / 6 / 1 |

## Verifikation und Grenzen

- 236 gezielte Tests bestanden, darunter neue Prüfungen aller 48 Seitenfolgen, Übersichten, Hard-Mode-Vorbereitungen, der Deutsch-1-Korrektur und des Fortsetzens alter Entwürfe. Die vorhandenen Prüfungen für Freischaltung, Audio, Antwortkorrektur, Wiederholung, Fehlerhistorie, Vokabelstapel und Bestwerte bleiben grün.
- Lokales Chromium mit den tatsächlichen App-Skripten: 48 Lektionen, 136 Vertiefungsseiten; exakte Wortzuordnungen kontrolliert, Hard Mode gestartet und Vorbereitung dabei ausgeblendet. 320/390/1280 Pixel, hell/dunkel, Tastaturöffnung der Übersicht, kein seitlicher Überlauf und keine Seitenfehler. Mobile Screenshots visuell kontrolliert.
- Profil und Streak im lokalen Browserlauf ersetzt. Keine echte Anmeldung, Cloud-Synchronisation oder Hörqualitätsprüfung auf dem iPhone behauptet. Der vorherige iOS-Safe-Area-Fix bleibt unverändert erhalten.
- Der bisherige Quellen-Fingerabdruck wurde nur für Deutsch 1 aktualisiert: Dort wurden die oben dokumentierten vorgezogenen Beispiele und Fragen tatsächlich korrigiert. Andere Lektionsquellen wurden nicht durch pauschales Neuberechnen freigegeben.

Alle Lösungen bleiben kostenlos. C1 und Spanisch wurden nicht geändert. Die Unterrichtszuordnung behebt die geprüften Vorwegnahmen und verteilt Zusatzwortschatz; sie ist kein Beweis, dass nach dieser Überarbeitung jede einzelne Frage der App didaktisch perfekt ist.
