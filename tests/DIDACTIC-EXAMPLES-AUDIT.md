# Lernbeispiele und Progression: Französisch A1 und Deutsch A1

Geprüfter Ausgangsstand von `main`: **fbc022cf5e39b20693f6eb75bd2d03335c68f521**. Revision der Korrektur: **161**. Nur die beiden A1-Kurse sind Gegenstand dieser Änderung.

## Urteil und Reichweite

Die Kurse benötigen keinen neuen Aufbau. Bestätigte Schwächen betreffen vor allem automatisch zusammengesetzte Antwortmöglichkeiten, die Platzierung bereits vorhandener Reihen und das Erkennen fester Wendungen. Vollständigkeit heißt hier, den benötigten Zusammenhang vor der Aufgabe zu vermitteln; eine möglichst lange Wortliste oder möglichst viele nahezu identische Lücken leisten das nicht.

Inventar und Ablauf aller 48 Lektionen wurden anhand der geladenen Inhalte durchlaufen: Einstiegsbeispiele und -quiz, 135 Grammatikthemen im Referenzinventar, zugehörige Aufgabenpools, ergänzende Wortgruppen, normale Hördialoge und Übergang zum Lektionscheck. Die vorhandenen Wortschatzzuordnungen und Fingerabdrücke der Aufgaben-/Hör-/Mustertexte wurden abgeglichen. Die tatsächlichen gerenderten Inhalte sind maßgeblich, einschließlich nachträglicher Datenkorrekturen und Sonderbehandlungen. Ein Blick ausschließlich auf die ursprünglichen JSON-Blöcke wäre irreführend gewesen.

Das ist **kein Nachweis der Fehlerfreiheit sämtlicher denkbarer Varianten** und keine vollständige erneute Einzelbegutachtung aller Hard-Mode-Aufgaben. Die Einzelkorrekturen unten sind durch konkrete Beispiele belegt. Tests prüfen zusätzlich Datenkonsistenz, Platzierung und Fortsetzung; sie ersetzen kein fachliches Urteil. Die tatsächliche Aussprache einzelner Browserstimmen sowie Lernerfolg und Überforderung bei echten Anfängern wurden nicht empirisch geprüft.

## Übersicht der 24 Lektionspaare

„Gesichtet“ bezeichnet den Abgleich des Lern-/Aufgabeninventars und Ablaufs, keine Zertifizierung aller Einzelinhalte. Unveränderte Themen wurden bewusst nicht umgeschrieben.

| L. | Französisch A1 | Deutsch A1 |
|---|---|---|
| 1 | Gesichtet; Gruppennamen in interner Tabellenvorlage natürlicher | Pronomenfragen verständlicher; sein/sind/seid gezielter; bekannte Orte statt zusätzlichem Museumswortschatz; zu Hause beim sein-Thema |
| 2 | Alphabet, Bitte und Buchstabieren gesichtet | Nachfragen erfolgt im Dialog vor der Namensantwort; Name wird anschließend buchstabiert |
| 3 | Zahlenaufbau und Altersblock gesichtet; sichtbare J’ai-Aufgaben waren bereits korrekt | Vollständige Zahlenreihen wieder im Einstieg vor dem Quiz; gezielte Zahlenkontraste bleiben |
| 4 | Gemeinsames Anhören für Tage und Monate ergänzt; Einzelbuttons bleiben | Vollständige Reihen gebündelt; doppelte Einzelbeispiele entfernt; Uhrzeit und Termin weiterhin getrennt |
| 5 | Besitz, Geschlecht und Personenbezug gesichtet | Besitzbegleiter um besessenen Plural und mehrere Besitzer erweitert; Tabelle ergänzt |
| 6 | Portion/Artikel und Bestellung gesichtet | Bestellung und Präzisierung gesichtet; kein pauschaler Ausbau der Kasuslehre |
| 7 | Mengen-de, Preis und Bezahlung gesichtet | Preis/Größe gesichtet; zu als „trop“ bleibt von Ortsangaben unterscheidbar |
| 8 | Position, Räume und Adresse gesichtet | Wohnungsbeschreibung und Besuchsanfrage gesichtet |
| 9 | Imperativ und Weg gesichtet | zum/zur bei der Wegbeschreibung erklärt; Gleis als voie statt Gleichsetzung mit quai |
| 10 | Regelmäßige Verben und Berufsangaben gesichtet | Berufs-/Zeitangaben gesichtet; die arbeiten-Schreibung wird schon auf der ersten passenden Verbseite erklärt |
| 11 | Reflexivpronomen und laufende Handlung gesichtet | Fehlerhafte französische Tageszeit-Ablenkantworten korrigiert |
| 12 | Symptome und Hilfsbitten gesichtet | zu Hause / nach Hause bei der Wochenendplanung unterschieden |
| 13 | Kurzes, plausibles Beispiel „Je cherche cet hôtel“ statt Wunsch nach dem Hotel selbst | Reservierung, Aufenthalt und Abfahrt gesichtet |
| 14 | Vorliebe und Aktivität gesichtet | Symptome, Zeitraum und Arzttermin gesichtet |
| 15 | Ziel/Plan und Reservierung gesichtet | Einladung/Antwort gesichtet; bekannte Ortswendungen nicht erneut als isoliertes Haus/zu eingeführt |
| 16 | Einladung, Absage und Telefon gesichtet | Schilder und Öffnungszeiten gesichtet |
| 17 | Formular und Nachricht gesichtet | Höfliche Bitte/Antwort gesichtet |
| 18 | Verständnisproblem und höflichere Bitte gesichtet | Arbeitsanweisungen mit parallelen statt sachfremden Ablenkantworten |
| 19 | Artikel, Plural und Zeigen gesichtet | Körperteile und tut/tun weh gesichtet |
| 20 | Präsens, pas/jamais und Regeln gesichtet | Wetter und passende Kleidung gesichtet |
| 21 | Fragen, Besitz und betonte Pronomen gesichtet | Vorlieben und Verabredung gesichtet |
| 22 | Vergangenheit und Zeitbezug gesichtet | Rückruf an funktionierendem Bürotelefon plausibel; von zu Hause beim Telefonieren erklärt |
| 23 | Mengen, Zutaten und Handlungsfolge gesichtet | Schalter/Formular und Unterschrift gesichtet |
| 24 | Reisebericht aus bekannten Bausteinen gesichtet | Nachricht und Wiederholung gesichtet; feste Ortswendung bleibt als Einheit erhalten |

## Priorisierte Befunde und vollständige Korrekturen

### Dringend – falsche französische Antwortmöglichkeiten im Deutschkurs

**Stelle:** `deutsch/study.js`, `contrastGroups`/`contrastPairs`; nachweisbar Lektion 11, Einstieg.

Aus dem isolierten Ersatz von matin durch après-midi wurde **„Le cours est le après-midi.“**. Umgekehrt entstanden **„Le cours est l’matin.“** und **„Le cours est l’soir.“**. Solche Antworten verraten die Lösung durch einen Fehler in der Erklärungssprache und verwirren französischsprachige Lernende.

**Korrektur:** Die vollständigen Wendungen werden zusammen ausgetauscht:

- Der Kurs ist am Vormittag. → Le cours est le matin.
- Der Kurs ist am Nachmittag. → Le cours est l’après-midi.
- Der Kurs ist am Abend. → Le cours est le soir.

Zusätzlich erhalten Zeichen, Formularfelder und Arbeitsanweisungen gezielte Alternativen derselben Funktion. Ein vollständiger Satz wie „Mon numéro est …“ wird nicht mehr als Ablenkantwort zu einem bloßen Feldnamen verwendet. Dies beseitigt einen belegten Generatorfehler, garantiert aber nicht die sprachliche Qualität jeder künftig ergänzten Ersetzungsregel.

### Wichtig – feste Ortswendungen wurden in irreführende Einzelwörter zerlegt

**Stellen:** `shared/lesson-foundations.js`, `shared/lesson-lexicon.js`, `tests/helpers/build-vocabulary-placement.cjs`, `shared/vocabulary-trainer.js`.

Ein Vorkommen von Hause in zu Hause ist kein ausreichender Anlass, das Gebäudenomen Haus und die freie Präposition zu getrennt als neue Vokabeln einzuführen. Ebenso ist nach Hause keine Anwendung der zeitlichen Bedeutung nach/danach.

**Korrektur, gestaffelt nach tatsächlichem Bedarf:**

| Stelle | Deutsches Beispiel | Kurze französische Erklärung |
|---|---|---|
| L1, sein | Ich bin zu Hause. | Je suis à la maison. Ort: zu Hause, auch zuhause. |
| L9, Weg | Ich gehe zum Bahnhof. / Ich gehe zur Post. | Je vais à la gare. / Je vais à la poste. Zu + dem → zum; zu + der → zur. |
| L12, Planung | Ich bin zu Hause. / Ich gehe nach Hause. | Je suis à la maison. / Je rentre à la maison. Ort gegenüber Ziel. |
| L22, Telefon | Ich rufe von zu Hause an. | J’appelle depuis la maison. Ausgangsort des Anrufs. |

Die Übersicht und der Trainer führen die drei Ortswendungen als eigene Einheiten. Beispiele zu zum verwenden **chez le médecin**, nicht das unnatürliche au médecin. Von erhält nachvollziehbare Beispiele zu Herkunft und Zeitraum statt einer undifferenzierten Gleichsetzung mit depuis. Das ist keine Behauptung, jede Verwendung von von oder zu sei damit erklärt. Die andere Wendung **von Hause aus** wird nicht pauschal als falsch bezeichnet oder als A1-Grundlage neu eingeführt.

Historische Kartenkennungen und Zuordnungen bleiben erhalten; der aktuelle Vermittlungsplan entscheidet, welche Wörter tatsächlich an welcher Stelle angeboten werden. Die Prüfung des Plans maskiert die genannten festen Wendungen beim Suchen nach ihren vermeintlichen Einzelbestandteilen.

### Wichtig – vorhandene Reihen waren ungleich platziert und unnötig doppelt

**Stelle:** `deutsch/study.js`, `configure` und `grammarHtml`; `francais/deepening.js`, `enrich`.

Die deutschen Zahlenreihen waren vorhanden, wurden beim Zusammenstellen des Einstiegs jedoch durch wenige Übungsbeispiele ersetzt. Tage und Monate waren ebenfalls vollständig vorhanden; ihre verkürzte zweite Auflistung ließ den Aufbau uneinheitlich wirken. Es fehlten also nicht grundsätzlich Monate oder Wochentage.

**Korrektur:** Zahlenreihen stehen vor dem ersten entsprechenden Quiz. Tage und Monate lassen sich als zusammenhängende Reihe anhören; die einzelnen Aussprachemöglichkeiten bleiben. Identische Vokabelzeilen werden nicht zusätzlich als Beispiele wiederholt. Die Zahlbildung, ihre Besonderheiten und gezielte Unterscheidungen bleiben eigene Lernschritte. Es wird kein langer Sammeltrack für ganze Lektionen eingeführt.

Das zugrunde liegende Prinzip wurde aus dem bereits überzeugenderen französischen Einstieg übernommen. Die deutschen Zahlbildungsregeln und Gruppengrenzen bleiben sprachspezifisch. Normale Hördialoge bleiben getrennte Verständnisaufgaben mit Informationsziel.

### Wichtig – unklare Aufgabenrahmen und wenig hilfreiche Kontraste

**Stellen:** `deutsch/question-content.js`, `choice`; `deutsch/grammar-drills.js`, `conjugation`, Pronomen und Besitzbegleiter.

- Ein ganzer gesuchter Satz wurde mit „Complète : ___“ angekündigt. Jetzt heißt es beispielsweise **„Choisis la phrase correcte : « Quelles langues parlez-vous ? »“**. Echte Lücken behalten ihre Lückenanweisung.
- Eine Situation wurde syntaktisch unpassend an „Quel pronom correspond à Vous …“ angehängt. Die Situation steht jetzt vor der eigenständigen Frage nach dem Personalpronomen. Es wird zudem nicht allgemein behauptet, deutsches es sei schlicht eine Übersetzung von cela.
- In vielen Verbaufgaben waren bin/bist die Standardablenkungen unabhängig von der geprüften Form. Nun werden insbesondere **sind/seid**, hat/habt und sprechen/sprecht sinnvoll gegeneinander abgegrenzt. Kontext unterscheidet sie, Sie und ihr weiterhin ausdrücklich.
- Gruppennamen werden konkret: **„Wir heißen Anna und Paul.“** statt einer unkommentierten Gruppe mit gemeinsamem Nachnamen. Die ursprünglichen Sätze waren nicht generell ungrammatisch, aber unnötig künstlich.
- **arbeiten** wird auf der ersten tatsächlich benutzten regelmäßigen Verbseite mit arbeitest/arbeitet erklärt, nicht auf die erste Vorstellungsseite vorgezogen.
- Besitzübungen enthalten jetzt auch **„Das sind ihre Bücher.“ → „Ce sont leurs livres.“** und den Besitzerkontext. Der Plural der besessenen Dinge wird nicht durch drei Singulargeschlechter ersetzt. Die Reihe umfasst 38 Aufgaben einschließlich der bestehenden Anwendungen; ihre Zahl ergibt sich aus der Abdeckung.

### Wichtig – Dialoglogik

**Stelle:** `deutsch/comprehension-content.js`, L2 und L22.

In L2 stand die Bitte um langsameres Sprechen zusammen mit der eigenen Namensantwort. Sie folgt jetzt auf die nicht verstandene Frage; danach wird der Familienname wiederholt und buchstabiert. Name und Lösungen bleiben Lukas/Weber/langsamer sprechen.

In L22 ist klar, dass Anna im Büro angerufen werden soll, während ihr Handy kaputt ist. Uhrzeit, Telefonnummer und bewertete Fakten ändern sich nicht. Die Dialoge werden nur dort verlängert, wo die zusätzlichen Sprechzüge einen nachvollziehbaren Gesprächszweck erfüllen.

### Optional / gezielte Robustheit – französische Vorlagen

**Stelle:** `francais/deepening.js`, `tableTasks`.

Der allgemeine avoir-Tabellenhelfer war zur Bildung von Je ai fähig. Der sichtbare Altersblock L3 war durch seine Sonderbehandlung bereits korrekt und wird nicht als bestätigter sichtbarer Sprachfehler ausgegeben. Die allgemeine Vorlage verwendet nun ebenfalls J’. Das Hotelbeispiel wird zu **„Je cherche cet hôtel.“**; die Frage bleibt von den Lektionscheck-Aufgaben getrennt. Es gibt keinen Anlass, deshalb den gesamten französischen Grammatikteil neu zu entwerfen.

## Funktion und Verifikation

- Offene, noch nicht bewertete deutsche Einstiegs-/Grammatikfragen erhalten die korrigierten Aufgaben und Optionen. Bereits bewertete Antworten, Punkte, Bestleistungen und vorherige Entwürfe werden erhalten.
- Betroffene Fehlerkarten werden auf fachlich dieselbe Aufgabe aktualisiert; deren Fehlerhistorie bleibt. Entfernte Varianten werden archiviert, ohne Fehler für einen anderen Lerngegenstand zu erfinden.
- Wortschatzplan, passende Erklärungsseite, Audioattribute, vollständige Reihen und alle 48 Wortschatzübersichten werden geprüft. Wortkarten werden nicht aus den neuen Beispielsätzen erzeugt.
- Native Sprachausgabe bleibt kostenlos und wird nur auf Anforderung gestartet. Keine neue Audioquote, Hörbegrenzung oder Änderung der Hard-Mode-Bewertung.
- Ein Testlauf untersucht unter anderem 9.600 erzeugte deutsche Einstiegsfragen auf die konkret gefundenen Formfehler und auf eindeutige Antwortdaten. Das ist ein automatischer Regressionstest, keine manuelle sprachliche Begutachtung von 9.600 Aufgaben.
- Zwei veraltete Hörverständnis-Tests wurden an die bereits vorhandenen längeren Dialoge und den tatsächlichen Hard-Mode-Abschluss angepasst. Dabei bleiben Sprecherfolge, Länge, Antwortdaten und gespeicherter Fortschritt geprüft.

**Testergebnis:** 170 gezielte Tests erfolgreich, 0 Fehler (16 Testdateien). Der zusätzliche breitere Lauf umfasst 206 Tests; die elf bereits auf dem Ausgangsstand fehlschlagenden Altprüfungen sind im folgenden Absatz separat ausgewiesen.

**Zusätzlicher Bestandsbefund:** In `tests/french-deepening.test.cjs` und `tests/french-listening.test.cjs` schlagen elf ältere Prüfungen schon auf dem geprüften Ausgangsstand fehl. Das wurde mit unveränderten Ausgangsdateien gegengeprüft: 36 Tests, 25 erfolgreich, 11 fehlgeschlagen. Unter anderem lädt die alte Vertiefungsfixture das heute erforderliche Grammatikübungsmodul nicht; andere Erwartungen beziehen sich auf inzwischen ersetzte Fragen. Diese elf Fehler werden nicht als neue Regressionen oder als behobene Kursfehler ausgegeben. Die aktuellen Pool-/Check-/Fortsetzungstests sind separat Teil des gezielten Testlaufs.

Nicht verifiziert: tatsächliche Browseraussprache und Verständlichkeit auf einem physischen Gerät, ein vollständiger neuer visueller Desktop-/Mobiltest sowie ein Lerntest mit absoluten Anfängern. Der Bericht behauptet keine offizielle Prüfungsgleichwertigkeit. Spanisch und C1-Dateien wurden nicht verändert.

## Fünf Änderungen mit dem größten Nutzen

1. Falsche französische Generatorantworten durch vollständige Wendungen ersetzen.
2. Ortswendungen als Einheiten vermitteln und Ort, Ziel und Ausgangsort unterscheiden.
3. Vollständige akustische Reihen vor die entsprechende Wissensprüfung stellen und Doppelungen abbauen.
4. Grammatikaufgaben auf sinnvolle Kontraste und echte Abdeckung ausrichten.
5. Korrigierte Inhalte auch bei Fortsetzung und in gespeicherten Fehlerübungen durchsetzen, ohne abgeschlossene Arbeit umzubewerten.
