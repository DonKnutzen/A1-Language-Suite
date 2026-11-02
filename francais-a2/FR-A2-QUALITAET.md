# Français A2 – Qualitätsprüfung der Aufgaben

Geprüft wird, was Lernende wirklich sehen: ein JSDOM-Dump der Kursseite (Lektionsquiz, generierte Trainingsfragen,
Lektions-Check mit Transfer, Vertiefungs-Pools, Hörverstehen, Intro-Hören, Hard Mode samt `A1_GAME_HARD.build`,
Quiz-Turm `A1_QUIZ_SHOW.generate`, Grammatik-Sets). Geändert wird nur in `francais-a2/src/*.cjs`; danach
`node tools/build-francais-a2.cjs`.

Kriterien: A1–A5 zu offensichtlich · B6–B10 fehlerhaft · C11–C13 sinnlos/falsches Ziel.
Schweregrad: **KRITISCH** = 6, 7, 8, 10 · **MITTEL** = 1–5, 9 · **GERING** = 11–13.
Gute Aufgaben sind nicht aufgeführt.

Automatische Prüfungen: `tests/francais-a2-quality.test.cjs` (Dubletten in Optionen, fehlende oder mit der Lösung
identische Erklärung, Lösung wörtlich in der Frage, Längenausreißer > 1,8 × längster Distraktor, Elision nach „je ___“,
Anteil „richtig“ in den telc-Blöcken 35–65 %). Die strengeren Prüfungen gelten bis `REVIEWED` (jetzt 6) und
wachsen pro Etappe mit.

## Etappe 1 – Lektionen 1–6 (alle Funde behoben)

| ID | Krit. | Problem | Fix |
|---|---|---|---|
| FR-A2 L1 task 9 | A1 | „je habite“ verletzt die Elision, der Distraktor fällt grammatisch weg. | habite → dis; Erklärung: parler + Sprache, je suis allemand = ich bin Deutscher. |
| FR-A2 L2 task 5 | B6 | „Ce quartier est bien pour les enfants“ ist korrekt; im Grammatik-Set fehlt der deutsche Kontext. | bien → meilleure; Erklärung zur Angleichung (le quartier → meilleur). |
| FR-A2 L2 check 7 | A3 | „coûte combien de pièces“, „combien d’étages dans la pièce“ sind absurd. | Distraktoren „a combien pièces ?“ / „a combien des pièces ?“; Erklärung combien de + Nomen ohne Artikel. |
| FR-A2 L2 hard listen 2.3 | C11 | „Qui parle de sa chambre ?“ nur über die Stimme lösbar, ohne Lernwert. | „Quelle chambre est plus claire ?“ – la nouvelle / l’ancienne / les deux. |
| FR-A2 L3 quiz 5 | B6 | „Je fais vingt minutes en vélo“ ist umgangssprachlich vertretbar. | → „Je dure vingt minutes à vélo.“; Erklärung mettre / prendre / durer. |
| FR-A2 L3 task 8 | B6 | „Je fais vingt minutes“ ist vertretbar. | fais → dure; Erklärung mettre / durer / prendre. |
| FR-A2 L3 quiz 9 | A3 | „Donnez-moi la gare.“ / „Où la gare ?“ sind absurd. | Registerfehler als Distraktoren: „Hé, la gare, c’est où ?“ / „Tu sais où est la gare ?“; Erklärung siezen, Excusez-moi. |
| FR-A2 L3 check 5 | A3 | „Je prends le travail à vélo“ ist absurd. | → „Je vais au travail par vélo.“; Erklärung à vélo wie à pied. |
| FR-A2 L4 quiz 1, task 7 | A3 | „Bravo“ als Telefongruß ist absurd. | Bravo → Pardon; Erklärung (task 7 bekam eine eigene). |
| FR-A2 L4 quiz 4 | B6 | „Legen Sie nicht auf, ich rufe zurück“ ist halb richtig, „Gehen Sie nicht weg“ wörtlich vertretbar. | → „Rufen Sie später an.“ / „Legen Sie bitte auf.“ |
| FR-A2 L4 quiz 8 | B6 | Ohne Sprecherrolle ist „prendre un message“ vertretbar. | Kontext: „Du nimmst für eine Kollegin ab und fragst den Anrufer.“ |
| FR-A2 L4 task 5 | B7 | „Ich werde es ihnen morgen sagen“ ≠ „Je vais leur dire demain“ (le fehlt). | Kontext → „Ich werde ihnen morgen Bescheid sagen.“ |
| FR-A2 L4 hard text | B10 | Paul bittet die Abnehmende, ihren Namen zu wiederholen; sie antwortet „Lucie Garnier“ – Lucie ist die Abwesende. | Schluss umgebaut: SMS-Nummer der Eltern, „Vous pouvez répéter le numéro ?“, Nummer ausgeschrieben. Lückenzahl gleich. |
| FR-A2 L4 comp 2 | A2 | „in einer Besprechung“ ist über 1,8 × so lang wie „krank“. | krank → auf einer Dienstreise. |
| FR-A2 L5 quiz 1 | A1 | „je ai“ / „je étais“ verletzen die Elision. | → „Hier, Paul ___ allé au marché.“ est / a / avait. |
| FR-A2 L5 quiz 2 | B6 | „j’avais acheté“ ist korrekt (plus-que-parfait), „j’suis“ orthografisch unmöglich. | → „Hier, nous ___ acheté du fromage.“ avons / sommes / avez. |
| FR-A2 L5 quiz 10 | C13 | Identisch mit task 2 („Nous ___ regardé un film“). | → „Vous ___ regardé le match ?“ avez / êtes / avons. |
| FR-A2 L5 task 1 | A1 | „j’suis“ ist durch die Elision ausgeschlossen. | → „Hier, Léa ___ acheté des fruits.“ a / est / as. |
| FR-A2 L5 task 5 | A3 | „vé“, „voi“ sind keine plausiblen Lernerformen. | voyé / vois. |
| FR-A2 L5 task 6 | A1 | „je ai“ verletzt die Elision. | → „Il ___ allé au cinéma.“ est / a / sont. |
| FR-A2 L5 check 5 | B7 | „keinen Fernseher geschaut“ ist unidiomatisch. | → „Du hast gestern nicht ferngesehen.“ |
| FR-A2 L5 hard listen 2.3 | B6 | Tippaufgabe „Réponds en chiffres“ zu „à quatre heures“ akzeptiert 16 nicht. | 16 zusätzlich akzeptiert. |
| FR-A2 L5 comp 1 | A2 | „Schwimmbad“ gegen „Markt“ / „Kino“ ist ein Längenausreißer. | Markt → Supermarkt. |
| FR-A2 L6 transfer 4 | B7 | Modelltext und Audio „Chaque jour, je allais à la plage.“ | Prompt „j’___“ → „j’allais“. |
| FR-A2 L6 task 2 | B6 | „Il a fait très chaud“ ist korrekt. | a fait → fait; Erklärung imparfait / Präsens / Person. |
| FR-A2 L6 task 3 | B6 | „J’ai eu une petite chambre“ ist korrekt. | ai eu → avions. |
| FR-A2 L6 task 10 | A1 | „je ai“ / „je étais“ verletzen die Elision; „était rentré“ wäre korrekt. | → „Il était fatigué, alors il ___ rentré.“ est / a / avait; Erklärung. |
| FR-A2 L6 quiz 7 | A3 | „Ça a super“ ist sinnlos. | → „C’étais super.“ (falsche Endung); Erklärung -ait. |
| FR-A2 L6 check 7 | A3 | „Il m’a bien plu de pleuvoir“ ist absurd. | → „Ça m’est bien plu.“ (falsches Hilfsverb); Erklärung. |

### Zählung Etappe 1

| Kriterium | L1 | L2 | L3 | L4 | L5 | L6 | Σ |
|---|---|---|---|---|---|---|---|
| A1 Grammatik verrät Lösung | 1 | – | – | – | 3 | 1 | 5 |
| A2 Lösung fällt äußerlich auf | – | – | – | 1 | 1 | – | 2 |
| A3 absurde Distraktoren | – | 1 | 2 | 2 | 1 | 2 | 8 |
| B6 mehrere Optionen vertretbar | – | 1 | 2 | 2 | 2 | 2 | 9 |
| B7 unnatürliche Sprache | – | – | – | 1 | 1 | 1 | 3 |
| B10 Widerspruch im Text | – | – | – | 1 | – | – | 1 |
| C11 ohne Lernwert | – | 1 | – | – | – | – | 1 |
| C13 Dublette | – | – | – | – | 1 | – | 1 |

KRITISCH 13 · MITTEL 15 · GERING 2 – alle behoben.

### Offen (GERING, bewusst nicht geändert)

- L1: Adresse ohne Präposition kommt in quiz 8 und check 8 vor; célibataire in quiz 1, check 1, task 8 (C13).
- L2: meilleur in quiz 8, check 3, task 5 und Hard-Lücke 8; pas de in quiz 5, check 5, task 8 (C13).
- L5: check 8 und task 4 prüfen beide pris / prendu (C13).
- L6: „on mangeait au restaurant“ in quiz 6, task 7 und Hard-Lücke 4 (C13).
- L6 check 6: „Welche Frage passt zu ‚wo?‘“ – où = wo ist A1-Stoff (C12).
- Grammatik-Sets zeigen nur „Ergänze: …“ ohne deutschen Kontext (`tools/build-francais-a2.cjs`). Aufgaben, die dort
  landen, müssen ohne Kontext eindeutig sein; L2 task 5 wurde deshalb geändert.

## Funde in `shared/` (für die letzte Etappe gesammelt, nicht geändert)

| ID | Krit. | Problem | Vorschlag |
|---|---|---|---|
| shared/quiz-show.js Stufen 7–12 (z. B. FR-A2 L4) | A3 | Lückensätze bekommen Distraktoren anderer Wortart: „Je ___ téléphone demain. (ihnen)“ → leur / tes / ses / mes. | Für Objektpronomen-Lücken Pronomen-Distraktoren (lui, les, la) statt Possessiva. |
| shared/quiz-show.js Stufen 7–12 (FR-A2 L5, L6) | A3 | Partizip- und Verblücken bekommen Wörter mit ähnlichem Anfang: venue / vendre / ventre / vendeuse; était / est / étage / étapes. | Distraktoren aus demselben Lemma bzw. derselben Wortart ziehen (venu, venus, venir). |
| shared/quiz-show.js Hinweise | GERING | Verschachtelte Klammern im Hinweis: „(als (Beruf))“, „(Hilfsverb (acheter))“. | Innere Klammern beim Anzeigen glätten. |

Nicht gemeldet: Die Reim-Distraktoren der Stufen 1–5 im Quiz-Turm („der Sohn / der Balkon / der Kassenbon“) sind laut
Generator bewusst als Scherzstufen angelegt.

## Nächste Etappen

- Lektionen 7–12 (bekannt aus dem Test-Scan: L7 task 9 „je irai“, Längenausreißer L9 quiz 5, L10 task 9 / comp 5,
  L11 task 9, L12 quiz 7, quiz 9, task 3).
- Lektionen 13–18, 19–24 mit `src/exam.cjs` (3 Modelltests; telc-Richtig-Anteil ist bereits im Rahmen).
- Danach die gesammelten `shared/`-Funde und alle drei Kurse testen.
