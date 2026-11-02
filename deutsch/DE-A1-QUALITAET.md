# Deutsch A1 – Qualitätsprüfung der Aufgaben

Geprüft wird, was Lernende sehen: ein JSDOM-Dump der Kursseite wie im Kurstest (Lektionsquiz
`DE_A1_STUDY.lessonExercises`, Lektions-Check mit Transfer `assessmentTasks`, Vertiefungs-Pools `unitTasks`,
Leseaufgabe und Wiederholung aus `applications.js`, Hörverstehen aus `comprehension-content.js`, Hard Mode samt
Hörfragen, Grammatik-Sets aus `app.js` und Drills aus `grammar-drills.js`), alle 24 Lektionen in einem Durchgang.
Der Quiz-Turm (`shared/quiz-show.js`) ist nicht Teil dieser Prüfung. Bewusste Entscheidungen aus
`deutsch/QUESTION-QUALITY.md` (eigener Checkbestand, Lückenformat, Fehlergedächtnis) bleiben unverändert.

Kriterien wie in `francais-a2/FR-A2-QUALITAET.md`: A1–A5 zu offensichtlich · B6–B10 fehlerhaft · C11–C13
sinnlos/falsches Ziel. Hier verwendet: A1 Grammatik verrät Lösung, A2 Lösung fällt äußerlich auf (Länge, Form),
A3 absurde Distraktoren, A4 Frage oder Kontext nennt die Lösung, B6 mehrere Optionen vertretbar, B7 unnatürliche
Sprache / Typografie, B9 Erklärung fehlt oder wiederholt nur die Lösung, B10 Widerspruch im Text, C11 ohne Lernwert
(z. B. nur über die Stimme lösbar), C13 Dublette.
Schweregrad: **KRITISCH** = 6, 7, 8, 10 · **MITTEL** = 1–5, 9 · **GERING** = 11–13. Gute Aufgaben sind nicht aufgeführt.

Automatische Prüfungen: `tests/deutsch-a1-quality.test.cjs` über alle Auswahlaufgaben, mehr als 2 000 (doppelte Optionen,
Lösung fehlt, Erklärung fehlt oder = Lösung, Lösung wörtlich in der Lücke, Längenausreißer > 1,8 × längster
Distraktor, Bedeutungsfrage, deren Optionen sich nur im Namen aus der Frage unterscheiden oder deren Lösung das
gefragte Wort selbst ist, Transfer = Vertiefungs-Drill, Artikel, der zu keinem Kasus des Nomens passt, wenn der
Artikel nicht der Lernpunkt ist, Anteil „richtig“ in Richtig/Falsch-Blöcken 35–65 %).
Grammatik-Sets und Drills ohne eigene Erklärung zählen als erklärt, wenn die 💡-Karte (`shared/explain-de.js`)
eine Regel liefert; das gilt für 601 von 608 solcher Aufgaben, die übrigen 7 haben jetzt eine eigene Erklärung.
Der Test schlägt an, sobald eine dieser Aufgaben nur noch die Standardkarte bekäme.

Erklärungen, die zur Laufzeit entstehen, wurden dort geändert, wo der Text entsteht: Transfer-Begründungen in
`CHECK_RATIONALES` (`question-content.js`), Hörfrage-Optionen in der Distraktor-Tabelle von `hard-mode-content.js`.

## Funde (alle behoben)

| ID | Krit. | Problem | Fix |
|---|---|---|---|
| DE L1 quiz 1, 5 | A2 | Distraktoren unterscheiden sich nur im Namen aus der Frage (Claire/Paul/Anne, Halifax/Berlin/Paris): Lösung durch Wiedererkennen des Namens. | Kontraste auf Person/Satzart: „Elle s’appelle Claire.“ / „Vous vous appelez Claire ?“, „Elle habite à Halifax.“ / „Vous habitez à Halifax ?“. |
| DE L1 transfer 1, 2, 3, 6, 13 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren (CHECK_RATIONALES). |
| DE L2 transfer 1, 3, 5, 6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L2 hard listen 2.2 | A2 | „Bindestrich“ gegen „Punkt“/„Umlaut“ ist ein Längenausreißer; „Punkt“ kommt im Text nicht vor. | Punkt → Doppel-n (im Text genannt). |
| DE L3 quiz 7 | A2 | „trente-deux“ gegen „treize“/„trente“ ist ein Längenausreißer und prüft keinen Zahlendreher. | Distraktoren vingt-trois / trente-trois. |
| DE L3 transfer 1, 2, 4, 6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L4 transfer 1, 2, 3, 7 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L5 quiz 10 | C11 | Hörfrage „ledig / verheiratet / geschieden“: die drei Optionen sind Umstellungen derselben Wortliste – geprüft wird die Reihenfolge, nicht das Verstehen. | Zusatzzeile → „Ich bin ledig.“ mit Kontrasten „Je suis marié.“ / „Je suis divorcé.“. |
| DE L5 deep 2.6 | A4 | Der Kontext „Le lieu de naissance est Berlin.“ nennt die Lösung. | Kontext → „Remplis le champ du lieu de naissance.“ |
| DE L5 transfer 1, 3, 4, 15 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L6 transfer 1, 2, 3, 4, 6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L7 transfer 2, 3, 5, 6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L8 deep 2.4 | B6 | „Wie viel ist die Miete?“ ist umgangssprachlich korrekt. | Distraktoren viele / groß. |
| DE L8 transfer 4, 5, 6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L9 deep 2.5, 2.6 | A1 | „Welches ___“ / „Welche ___“ schließen die Distraktoren über das Genus aus (Linie, Bahn bzw. Gleis, Zug). | Distraktoren im selben Genus: Auto / Zimmer; Haltestelle / Fahrkarte. |
| DE L9 deep 2.9, 2.10 | A2 | dreizehn / achtzehn gegen acht / drei: Längenausreißer ohne -zehn/-zig-Kontrast. | dreißig / drei; achtzig / acht. |
| DE L9 transfer 11 | C13 | Transfer „Nehmen Sie die Linie ___.“ wiederholt den Vertiefungs-Drill. | → „Zum Krankenhaus fährt die Linie ___.“ |
| DE L9 transfer 2, 3 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L10 deep 1.7, 1.8 | A1 | „Ich arbeite im ___“ mit Distraktor „Schule“ fällt über das Genus weg. | Schule → Supermarkt. |
| DE L10 hard listen 2.2, 2.3 | B10 | Der Sprecher ist Paul, die Fragen lauten „arrive-t-elle“, „commence-t-elle“. | → „arrive-t-il“, „commence-t-il“. |
| DE L10 hard listen 2.1; L11 2.2, 2.3; L18 2.3; L19 2.2; L20 1.2; L22 1.3, 2.3; L23 1.3 | A2 | Hörfragen: Nur die Lösung steht ohne Artikel/Satzrahmen („Krankenhaus“ gegen „im Büro“, „in der Schule“). | `hard-mode-content.js`: Haben alle Distraktoren Artikel/Präposition, wird die gleichwertig gerahmte Lösungsvariante angezeigt (im Krankenhaus, Sie macht Hausaufgaben., eine Frage stellen …). |
| DE L10 transfer 2, 3, 5, 6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L11 deep 1.1 | A3 | „Ich lerne um/am sechs Monaten Deutsch“ ist absurd; Längenausreißer. | Distraktoren vor / bis. |
| DE L11 transfer 3, 4, 6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L12 transfer 1, 3, 4, 5, 6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L13 transfer 3, 5, 6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L14 deep 1.3, 1.5 | A3 | „Ich habe am/um gestern Husten“, „Am/Um wann …“ sind absurd; Längenausreißer. | Distraktoren vor / bis bzw. Vor / Um. |
| DE L14 deep 1.9, 1.10, 2.10 | A2 | Kopfschmerzen/Halsschmerzen gegen Fieber/Husten, „am Dienstag“ gegen heute/morgen: Längenausreißer. | Halsschmerzen ↔ Kopfschmerzen als Distraktor; „am Montag“ statt heute. |
| DE L14 transfer 1, 3, 4 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L15 transfer 11 | C13 | Transfer „Ich bringe Brot ___.“ = Vertiefungs-Drill. | → „Bringst du bitte Brot ___?“ (Bitte an einen Freund). |
| DE L15 transfer 2–6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L16 deep 1.9 | A2 | „Fotografieren“ gegen „Rauchen“/„Parken“: Längenausreißer. | Parken → Schwimmen. |
| DE L16 transfer 2, 3, 4, 6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L17 deep 2.1 | A3 | „Tut mir leid, das geht gern / natürlich“ sind sinnlose Sätze. | Distraktoren „Ja, natürlich, das geht“ / „Gern, hier bitte“. |
| DE L17 hard listen 1.3 | C11 | „Es gehört dem Mann“ / „Die Frau hat schon ein Glas“: lösbar nur über die Stimme der Sprecher. | Lösung „Das ist mein Glas.“, Distraktoren „Ich brauche es noch.“ (sagt B zum Buch) / „Das Glas ist zu klein.“ |
| DE L17 quiz 9 | B7 | Klammer in der Bedeutung „(lui)“. | „Pouvez-vous l’aider, lui, s’il vous plaît ?“ |
| DE L17 transfer 1, 2 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L18 transfer 3, 4, 5 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L19 deep 2.4 | A3 | „Ich habe am/um gestern Kopfschmerzen“ ist absurd; Längenausreißer. | Distraktoren vor / bis. |
| DE L19 transfer 3 | A3 | Distraktor „Seit morgen.“ ist unsinnig. | → „Seit drei Tagen.“ |
| DE L19 hard listen 1.1, 1.2 | A2 | Optionen gemischt „Bauch / Kopfschmerzen / die Beine“: Form statt Inhalt fällt auf. | Einheitlich Kopf / Bauch / Beine. |
| DE L19 transfer 1–4, 6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L20 quiz 1, 3, 5; deep 1.9 | B7 | „il fait soleil“ ist kein Standardfranzösisch. | „il y a du soleil“ (auch Lektionsphrase in app.js). |
| DE L20 review 3 | A3 | „Was nimmt die Person zusätzlich zum Mantel mit?“ – Distraktor „einen Mantel“. | → „eine Jacke“. |
| DE L20 comp 3 | A2 | „einen Regenschirm“ gegen „ein Hemd“/„einen Hut“: Längenausreißer. | einen Hut → einen Pullover. |
| DE L20 transfer 3, 5, 6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L21 transfer 1–6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L22 deep 1.1 | B6 | „Ich rufe Sie morgen an.“ ist korrekt; der Kontext „: zurückrufen“ verrät die Lösung. | Distraktoren ab / später, Kontext ohne Verb. |
| DE L22 transfer 3–6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L23 quiz 6, deep 2.9 | A4 | „Que signifie « Adresse » ?“ – Lösung „adresse“ ist dasselbe Wort. | Zeile → „Unterschrift = signature“ (in L23 gelehrt), Distraktoren angepasst. |
| DE L23 hard listen 2.1 | A2 | „Geburtsdatum / der Familienname / die Adresse“: nur die Lösung ohne Artikel. | Einheitlich ohne Artikel. |
| DE L23 transfer 1, 5, 6 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE L24 transfer 3, 4, 5 | B9 | Erklärung = Lösung. | Begründung mit Distraktoren. |
| DE set g7 7 | B6 | „Hast du ___ Schlüssel?“ – „deine Schlüssel“ ist als Plural korrekt. | Optionen dein / deinem / deinen, Erklärung. |
| DE set g4 1 | B6 | „cet article“: „Wie viel kostet der Mantel?“ ist ebenso eine Preisfrage. | Distraktoren „Wo ist das?“ / „Was ist das?“, Erklärung. |
| DE set g4 2 | B6 | „Wie komme ich zum Bahnhof?“ fragt ebenfalls nach dem Ort. | → „Wer ist am Bahnhof?“, Erklärung. |
| DE drill Verbes séparables 9 (= set g6 40) | B6 | „Wir kommen morgen mit.“ ist korrekt. | mit → ein. |
| DE drill Verbes séparables 4, 7, 8 | A4 | Kontext „(einkaufen)“, „(ankommen)“ nennt die Partikel. | Klammerhinweise entfernt. |
| DE set g1 8, g2 7, g2 8, g3 9, g4 10, g5 10, g7 10 | B9 | Keine Erklärung, auch die 💡-Karte greift nicht. | Eigene Erklärung mit Distraktoren. |

Neue Distraktoren stammen nur aus Wortschatz, der bis zur jeweiligen Lektion eingeführt ist (`shared/vocabulary-content.js`);
deshalb z. B. „Zimmer“ statt „Ticket“ (L9) und „zu klein“ statt „kaputt“ (L17).

## Zählung

| Kriterium | L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10 | L11 | L12 | L13 | L14 | L15 | L16 | L17 | L18 | L19 | L20 | L21 | L22 | L23 | L24 | Sets/Drills | Σ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A1 Grammatik verrät Lösung | – | – | – | – | – | – | – | – | 2 | 2 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 4 |
| A2 Lösung fällt äußerlich auf | 2 | 1 | 1 | – | – | – | – | – | 2 | 1 | 2 | – | – | 3 | – | 1 | – | 1 | 3 | 2 | – | 2 | 2 | – | – | 23 |
| A3 absurde Distraktoren | – | – | – | – | – | – | – | – | – | – | 1 | – | – | 2 | – | – | 1 | – | 2 | 1 | – | – | – | – | – | 7 |
| A4 Frage/Kontext nennt Lösung | – | – | – | – | 1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 2 | – | 3 | 6 |
| B6 mehrere Optionen vertretbar | – | – | – | – | – | – | – | 1 | – | – | – | – | – | – | – | – | – | – | – | – | – | 1 | – | – | 4 | 6 |
| B7 unnatürliche Sprache / Typografie | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1 | – | – | 4 | – | – | – | – | – | 5 |
| B9 Erklärung = Lösung / fehlt | 5 | 4 | 4 | 4 | 4 | 5 | 4 | 3 | 2 | 4 | 3 | 5 | 3 | 3 | 5 | 4 | 2 | 3 | 5 | 3 | 6 | 4 | 3 | 3 | 7 | 98 |
| B10 Widerspruch im Text | – | – | – | – | – | – | – | – | – | 2 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 2 |
| C11 ohne Lernwert | – | – | – | – | 1 | – | – | – | – | – | – | – | – | – | – | – | 1 | – | – | – | – | – | – | – | – | 2 |
| C13 Dublette | – | – | – | – | – | – | – | – | 1 | – | – | – | – | – | 1 | – | – | – | – | – | – | – | – | – | – | 2 |

Gezählt werden Aufgaben, nicht Tabellenzeilen. KRITISCH 13 · MITTEL 138 · GERING 4 – alle behoben.
Die 91 Transfer-Aufgaben mit „Erklärung = Lösung“ waren der größte Block: `CHECK_RATIONALES` deckt jetzt alle
Auswahlaufgaben der 24 Checks ab und nennt, warum die Distraktoren falsch sind.

## Offen (GERING, bewusst nicht geändert)

- L5 transfer 1 („Anna ist meine Schwester … Qui est Anna ?“), L22 transfer 1 und review 1 („Wer spricht?“): die
  Lösung steht wörtlich im kurzen Text; für A1-Leseverstehen vertretbar (C12).
- Lücken-Erklärungen haben die Form „Satz = Kontext“. Ist der Kontext eine Anweisung, liest sich das als
  „Wo wohnst du? = Demande à un proche où il habite.“ – formal, nicht falsch (Generator in `study.js` /
  `question-content.js`).
- L8 transfer 11 (getippt): „Wie ___ ist die Miete für das Zimmer?“ akzeptiert nur hoch; „Wie viel ist die Miete?“
  ist umgangssprachlich, aber nicht Lernziel.
- L14 quiz 3: Distraktor „Je tousse depuis aujourd’hui.“ ist holprig, aber als falsche Bedeutung erkennbar.
- L16 deep 2.4: „Ab neun Uhr: Das Geschäft öffnet ___ neun Uhr.“ – Vorgabe und Lücke wiederholen sich; eindeutig.
- L9 transfer 4/5, L13 transfer 3 u. ä.: Kategorie-Distraktoren (Datum gegen Ort, Uhrzeit gegen Dauer) prüfen
  Feldbedeutung, nicht Feinheiten; so gewollt.
- Nicht Teil der Prüfung: die Goethe-Übungspools „Écoute“ Teil 1–4 und „Lesen“ in `app.js` (geprüft nur der
  Richtig-Anteil von Teil 2) sowie der Quiz-Turm. Deutsch A1 hat kein eigenes Intro-Hören; die Hörfragen im
  Lektionsquiz sind oben enthalten.

## Versionen

Geänderte Dateien `app.js`, `applications.js`, `comprehension-content.js`, `deepening-content.js`, `grammar-drills.js`,
`hard-mode-content.js`, `question-content.js` → `?v=quality-222`; Cache `deutsch-a1-hard-v222`, ASSETS angeglichen.
Die Versionsprüfungen in `deutsch/tests/question-quality.test.cjs` und `deutsch/tests/hard-listening.test.cjs` sind
mitgezogen. Volle Suite: dieselben 22 Fehler wie vor der Prüfung, mit identischen Meldungen.
