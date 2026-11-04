# Prüfbericht Deutsch A1 – Stoffmenge, Nervfaktor, Aufgabenqualität, roter Faden, Hörverstehen

Stand: 2026-11-03, Arbeitsstand `main` mit den ungespeicherten Änderungen laut `git status`. Grundlage ist der Auftrag in `deutsch/PRUEFAUFTRAG-A1.md`.
Kennzeichnung: **[g]** = geprüft (selbst gesehen, gezählt oder im Code nachgewiesen), **[V]** = Vermutung.
Noten 1–5 wie Schulnoten (1 = sehr gut, 5 = mangelhaft).

**Umsetzungsstand (2026-11-03):** Maßnahmen 1–6 der Top 10 sind umgesetzt (Branch `deutsch-a1-pruefbericht-massnahmen`).
- **Abschlussknopf**: heißt jetzt „Voir le résultat“ (`deutsch/assessments.js`).
- **Oral/Écrit**: die Karte steht wieder auf der Bilan-Seite (`deutsch/lesson-flow.js`).
- **Transkript**: erscheint erst nach „Vérifier“ oder wenn kein Audio verfügbar ist (`deutsch/listening-player.js`).
- **Écouter**: neuer Knopf „▶ Tout écouter“ pro Seite. Reihen, in denen nur Wochentag oder Zahl wechselt, sind ab L5 auf 2 Beispiele gekürzt, das sind 18 Sätze weniger. Das Quiz fragt nur noch gehörte Sätze ab (`deutsch/study.js`, `deutsch/lesson-flow.js`, `deutsch/styles.css`).
- **Dubletten**: 13 wörtlich gleiche Aufgaben sind aus den Themenübungen entfernt (`withoutDuplicates` in `deutsch/assessments.js`).
- **Meldeknopf**: ist bei ≤ 400 px ein 36-px-Icon in der Kopfzeile, in allen Kursen (`shared/bug-reports.js`).
- **Versionen und Tests**: Die Versionen der geänderten Dateien und die Offline-Caches aller betroffenen Kurse sind angehoben (DE-Cache v239, `bug-reports.js?v=reports-239`). Die Testsuite hat dieselben 22 Fehler wie vor der Änderung.

---

## 1. Kurzfazit

Die Aufgaben sind sauber: In 1 593 Aufgaben gibt es fast keine falschen Lösungen. Bei 168 von Hand geprüften Aufgaben habe ich keine mehrdeutige gefunden, im ganzen Bestand eine (L8, „visiter“ → nur `sehen`). Die Probleme liegen woanders:
(a) **L1, L4 und L5 sind überladen.** L1 hat 108 Aufgaben, 8 Grammatikpunkte und 70 neue Wortlisteneinträge. Das sind rund 30 Minuten ohne Hard Mode.
(b) **Oral und Écriture sind im Kurs nicht erreichbar**, obwohl der Lehrplan sie als Stufen 3 und 4 führt. Sprechen fehlt damit ganz.
(c) **Die Bedienung hat Reibung:** 12–16 einzelne Audio-Taps als Pflichtschleife, ein falsch beschrifteter Abschlussknopf in jeder Übung, ein schwebender Meldeknopf über Bedienelementen und Dubletten innerhalb einer Übung.
(d) **Beim Hörverstehen ist das Transkript schon vor dem Antworten aufklappbar.** Einzelne Hörfragen sind nur über die Stimme lösbar, drei Hörtexte sind überladen.
(e) **Jede vierte Aufgabe ist zu leicht** (Trennschärfe ≤ 2). Gründe sind vor allem Kognaten in den „Que signifie“-Fragen und Lesefragen, die sich per Wortabgleich lösen lassen.

| Prüfbereich | Note | Begründung |
|---|---|---|
| 1 Stoffmenge | 3 | Ab L6 meist im Rahmen; L1/L4/L5 deutlich zu viel, dazu produktiver Dativ und volles Possessiv-Paradigma über A1-Chunk-Niveau. |
| 2 Nervfaktor | 3 | Fortschritt wird zuverlässig gespeichert und Klickwege sind kurz, aber Pflicht-Audio, Fehlbeschriftung, Overlay und Dubletten treffen jede Lektion. |
| 3 Aufgabenqualität | 3 | Eindeutig und gut erklärt, Ø-Trennschärfe 3,0; aber 23 % der Stichprobe ≤ 2, und die Tippaufgaben-Erklärungen wiederholen nur die Lösung. |
| 4 Roter Faden | 3 | Der Bilan prüft genau die Lektion; es fehlen aber Oral/Écrit, der Dativ ist verstreut, und L14/L19 sowie L12/L21 doppeln sich. |
| 5 Hörverstehen | 3 | Das Hörquiz im Hard Mode ist prüfungsnah aufgebaut (Fragen vorab, max. 2×, 75 %); in der Compréhension untergräbt das vorab lesbare Transkript das Hören, dazu kommen Gender-Fragen und Infodump-Dialoge. |

---

## 2. Top 10 Maßnahmen (Nutzen ÷ Aufwand, absteigend)

| # | Maßnahme | Nutzen | Aufwand | Funde |
|---|---|---|---|---|
| 1 | Abschlussknopf jeder Übung von „Suite : parler et écrire“ in „Voir le résultat“ umbenennen (`finishLabel` in `deutsch/assessments.js` `runTasks` setzen) | jede Übung | 1 Zeile | F02 |
| 2 | Oral/Écrit wieder anbieten: Karte „À l’oral / À l’écrit“ auch bei vorhandenem Hard Mode zeigen (`deutsch/lesson-flow.js:185–188`) | Lernziel Sprechen | klein | F01 |
| 3 | Compréhension: „Lire le dialogue“ erst nach „Vérifier“ einblenden (`shared/comprehension.js:22`) | echtes Hören | klein | F03 |
| 4 | Écouter: Knopf „Tout écouter“ einführen; Substitutionsreihen (4 × „Am Samstag/Sonntag/… spiele ich Fußball“) auf 1–2 Sätze kürzen | 12–16 Taps weniger pro Lektion | klein/mittel | F07 |
| 5 | Dubletten in einer Übung entfernen (Prompt-Dedupe in `decorate`, `deutsch/assessments.js:36`) | weniger Monotonie | klein | F20, F21 |
| 6 | Meldeknopf bei ≤ 400 px verkleinern oder in die Kopfzeile verlegen (`shared/bug-reports.js:205`) | verdeckte Knöpfe | klein | F06 |
| 7 | Hörfragen ohne Gender-Bezug formulieren und überladene Hard-Texte L3/L8/L24 kürzen (Ersatz in Abschnitt 7) | fairere Hörfragen | mittel | F36–F40 |
| 8 | Die 30 schwächsten Aufgaben ersetzen (fertige Texte in Abschnitt 5.3); L8 c10 `accept:['besichtigen']`; Hard Mode ß↔ss tolerieren | Trennschärfe, Fairness | mittel | F08–F19, F09 |
| 9 | L1 entlasten: „Verbes réguliers“, „heißen/sprechen“ und den Test final aus L1 nach L5/L10 verschieben; L5 Possessive auf mein/dein/Ihr (+ sein/ihr passiv) reduzieren | Einstieg | mittel | F22–F24 |
| 10 | Bilan: zweiten Startbildschirm streichen; Ergebnis des L1-Test final nicht „BILAN“ nennen | Klarheit | klein | F04, F05 |

---

## 3. Prüfbereich 1 – Stoffmenge

### 3.1 Tabelle pro Lektion [g]

Zählweise:
- **Neue Wörter**: Einträge der „Liste de mots de la leçon“ (Écouter-Schritt), die in keiner früheren Lektion standen. Gezählt werden Einträge, keine Lemmata; Paradigma-Beispiele wie „mein Buch / meine Straße“ zählen mit, siehe F27.
- **Grammatik**: neue Punkte nach meiner Zuordnung aus den Regeltexten.
- **Aufgaben**: Quiz + Vertiefung + Compréhension + Bilan (+ in L1 der Test final). In Klammern: Hard Mode (Lücken + Hörfragen).
- **Minuten**: 12 s je Auswahlaufgabe, 20 s je Tippaufgabe, Lesezeit der Themenseiten mit 2 Wörtern/s, 6 s je Écouter-Satz, 60 s Compréhension; ohne Hard Mode, für den die App selbst 25–40 min angibt.

| L | Neue Wörter | Neue Grammatik | Aufgaben | Min. | Urteil |
|---|---:|---|---:|---:|---|
| 1 | 70 | 8: V2, W-Frage, Ja/Nein-Frage, nicht, Pronomen inkl. sie/Sie/ihr, sein, regelm. Präsens inkl. arbeiten, Vokalwechsel sprechen | 108 (+24) | 30 | **zu viel** |
| 2 | 28 | 4: können + Infinitiv am Ende, man, *mit einem Punkt* (Dativ), *den Namen* (Akk. + n-Dekl.) | 51 (+22) | 16 | viel (Grammatik) |
| 3 | 57 | 3: Zahlbildung, Ordinalzahl im Datum (*am siebzehnten*), Jahreszahl | 51 (+17) | 16 | viel (Zahlenreihe vertretbar) |
| 4 | 69 | 5: Uhrzeit halb/Viertel, am/um/im, Kontraktionen am/im/vom/zum, nicht vs. kein, *treffen uns*/Modal + Infinitiv | 75 (+18) | 23 | **zu viel** |
| 5 | 47 | 4: Possessiv (7 Stämme, 3 Genera, Akk.), Akk. nach haben, *mit meiner Frau* (Dativ), haben | 74 (+20) | 22 | **zu viel** |
| 6 | 25 | 3: Akk. mask. best./unbest., *hätte gern* (volles Paradigma), mit/ohne | 49 (+16) | 15 | ok |
| 7 | 30 | 4: kosten Sg./Pl., wie viel/viele, *im zweiten Stock*, *die rote/blaue* | 51 (+16) | 16 | viel |
| 8 | 26 | 2: kein-Deklination, Akk.-Tabelle | 61 (+20) | 18 | ok |
| 9 | 27 | 4: Imperativ Sie + du, zum/zur + mit dem/der, fahren (ä), trennbar | 56 (+16) | 18 | viel |
| 10 | 23 | 4: als, in + Dativ (im/in der), Inversion nach Zeitangabe, *meinen Kollegen* | 64 (+16) | 19 | viel |
| 11 | 21 | 3: seit + Dat. Pl., vor = il y a, lesen (ie) | 51 (+16) | 16 | ok |
| 12 | 19 | 4: gern/lieber, Inversion, wollen wir, wo/wohin (zu/nach Hause), ins | 52 (+16) | 16 | viel |
| 13 | 18 | 2: abfahren/ankommen, für + Nächte | 49 (+16) | 15 | ok |
| 14 | 17 | 3: haben/sein bei Beschwerden, seit (Wdh.), beim | 50 (+16) | 15 | ok |
| 15 | 17 | 3: müssen, *bei mir*, mitbringen | 54 (+16) | 17 | ok |
| 16 | 21 | 3: dürfen, man, ausfallen (fällt … aus) | 50 (+16) | 16 | ok |
| 17 | 7 | 2: *mir* + Akk.-Objekt, helfen + Dativ | 49 (+16) | 15 | ok |
| 18 | 30 | 2: Imperativ Sie (Wdh.), ankreuzen, *Ihren Namen* | 49 (+16) | 15 | ok |
| 19 | 13 | 3: tut/tun weh, diese, *die nächste* | 48 (+19) | 15 | ok |
| 20 | 20 | 3: es-Subjekt, mitnehmen + Imperativ, Akk. (Wdh.) | 60 (+16) | 18 | ok |
| 21 | 6 | 0–1 (alles Wiederholung aus L11/L12) | 48 (+16) | 15 | wenig Neues → Dublette L12 |
| 22 | 12 | 3: zurückrufen + Modal, dir/Ihnen vs. mich/Sie, Imperativ ruf | 51 (+16) | 16 | ok |
| 23 | 11 | 2: sich anmelden, ausfüllen | 49 (+16) | 15 | ok |
| 24 | 11 | 1: und/aber (Wortstellung Wdh.) | 59 (+22) | 17 | ok |
| Σ | 605 | | 1 349 (+418) | ≈ 420 | |

Richtwert 15–30 Wörter und 1–2 Grammatikpunkte: L1, L3, L4 und L5 liegen bei den Wörtern deutlich darüber. L1, L2, L4, L5, L7, L9, L10 und L12 liegen bei der Grammatik darüber [g].
Gegen die Pflichtzeit 10–20 min verstoßen L1 (30), L4 (23) und L5 (22) [g, Schätzformel oben].

### 3.2 Stoff oberhalb A1

| Stoff | Wo | aktiv/passiv | Beleg |
|---|---|---|---|
| Dativ jenseits fester Wendungen, **getippt** | L9 Bilan c9 „Wir fahren mit ___ Bahn.“ → *der*; c10 „mit ___ Bus“ → *dem*; L10 c8 „in ___ Schule“ → *der*; L22 c9 „Ich schicke ___ ein Foto.“ → *dir* | aktiv | `deutsch/question-content.js:157`, Bilan-Dump [g] |
| Volles Possessiv-Paradigma im Akkusativ inkl. euer | L5 „Wir suchen ___ Schlüssel.“ (unser/unsere/**unseren**), „Ihr besucht ___ Schwester.“ (**eure**) | aktiv | `deutsch/grammar-drills.js:153` [g] |
| Ordinalzahl mit Dativendung, **getippt** | L7 c13 „im ___ Stock“ → *zweiten*; L8 c14 → *ersten*; L13 c9 „bis ___ vierten August“ → *zum* | aktiv | Bilan-Dump [g] |
| n-Deklination | L2 *den Namen*, L10 *meinen Kollegen*, L18 *Ihren Namen* | erklärt, als Chunk geübt | Regeltexte L2/L10/L18 [g] |
| Konjunktiv-II-Paradigma | L6 „ich hätte · du hättest · er/sie hätte … ihr hättet“ | passiv, Bilan c6 aktiv „Wir hätten gern …“ | L6 „Bon à savoir“ [g] |
| Adjektivendungen | *die rote/blaue Jacke* (L7), *die nächste Apotheke* (L19), *eine warme Jacke* (L20) | Chunk | Regeltexte [g] |
| Nebensatz mit *weil* | Schreibmodelle „…, weil ich krank bin.“ | passiv (Prüfungsvorbereitung) | `deutsch/app.js:1444`, `:1674` [g]; nicht im A1-Inventar [V] |
| Perfekt | Lesepool „ich habe deine Schlüssel gefunden“ | passiv | `deutsch/app.js:1617` [g] |
| *um … zu* | Wortliste L13 „um zu lernen“ | passiv | `shared/vocabulary-trainer.js:80` [g] |
| Seltene/untypische Einträge | „fahren / ein Fahrzeug führen“ (L9), „übertragen“ (L23), „empfangen“ (L22), „Fischgericht“ (Hörpool) | passiv | `shared/vocabulary-content.js:6948`, `deutsch/app.js:1345` [g]; nicht in der Goethe-A1-Liste [V] |

Perfekt, Präteritum (außer *hatte* im Hörpool), Passiv und *dass* kommen im Lernpfad nicht vor [g, Regex-Suche über alle deutschen Texte].

### 3.3 Erklärtexte [g]

- **Absätze mit mehr als 4 Sätzen** in den Regelblöcken, gezählt in 14 von 60 Themenseiten. Die Spitzen: L7 „Prix et quantités“ und L17 „Formuler une demande“ mit je 8 Sätzen in einem Absatz, L8 „Demander une visite“ mit 6.
- **Tabellen mit mehr als 8 Zeilen**: nur L5 „Possessifs utiles“ (9 Zeilen, plus eingefügte Zeile *sie (ils/elles)*).
- **Längste Seiten bis zum Übungsknopf**: L15 T2 mit 260 Wörtern, L9 T2 mit 240, L3 T2 mit 228, L7 T2 mit 210 und L4 T4 mit 208. Bei 375 px liegt der Übungsknopf in L4 T4 bei 2 048 px, also nach 2,5 Bildschirmhöhen.
- **Dieselbe Regel mehrfach**:
  - Die Seite „Verbes réguliers au présent“ steht identisch in L1 und L10.
  - Die Seite „Articles à l’accusatif“ steht identisch in L8 und L20.
  - „seit + Datif, -n au pluriel“ steht in L11 und L14.
  - „ins = in das“ steht in L12 und L21.
  - „nicht vs. kein“ steht in L4, L8 und L16.
  - „den Namen / -n“ steht in L2 und L18.

### 3.4 Streichvorschläge

1. **L1**: Die Seiten 5 „Verbes réguliers“ und 6 „heißen et sprechen – conjugaison“ sowie den Test final (10 Aufgaben aus denselben Pools) streichen. Die Konjugation von du/er/wir/ihr geht nach L5/L10, wo „Verbes réguliers“ ohnehin wiederkommt. Der Satz „Heißen est un verbe fort“ (`shared/grammar-ui.js:43`) entfällt. Ergebnis: rund 60 statt 108 Aufgaben.
2. **L2**: „mit einem Punkt“ als Chunk ohne Dativ-Erklärung lassen. Die n-Deklination *den Namen* aus „Bon à savoir“ nehmen.
3. **L4**: Die Notiz „Am, im et zum sind Kontraktionen (an dem, von dem …)“ streichen, denn Chunks reichen. Ebenso *Ich möchte dich treffen* streichen, da möchte erst in L6 kommt. Die Wortliste von 118 Einträgen um die themenfremden Zeilen kürzen (*kein Zug, keine Straße, im Kino, mögen, lieben*).
4. **L5**: Possessiv-Übung auf *mein/meine/meinen, dein, Ihr* beschränken. *euer/eure* und *unseren* gehen in die Wiederholung.
5. **L6**: Das hätte-Paradigma auf *ich hätte gern / wir hätten gern* kürzen.
6. **L9/L10/L22**: Dativ-Tippaufgaben (*mit ___ Bahn → der*) in Auswahlaufgaben mit ganzen Chunks umwandeln: *mit der Bahn / mit dem Bahn / mit die Bahn*.
7. **Wortliste**: Paradigma-Beispiele aus `alignedTranslations` nicht als Lektionswörter listen. Gemeint sind *mein Buch, meine Straße, meine Bücher, kein Zug, um zu lernen* (`shared/vocabulary-trainer.js:80`).

---

## 4. Prüfbereich 2 – Nervfaktor

Messung [g]: Lektionen 1, 4, 6, 12, 19 und 24 komplett im Browser bei 375 × 812 px, mit lokalem Testprofil ohne Cloud-Sync.

| Messgröße | Wert |
|---|---|
| Klicks bis zur ersten Aufgabe | Start → „Continuer“ → „Commencer le quiz“ = **2** |
| Klicks pro Auswahlaufgabe | **2** (Antwort + „Suivant“) |
| Klicks pro Tippaufgabe | **3** (Tippen + „Vérifier“ + „Suivant“) |
| Klicks pro Lektion ohne Hard Mode | L1 ≈ 150 + 12 Audio; L4 ≈ 160 + 16 Audio |
| Bilan L1 | 16 Fragen = 40 Klicks |

### Reibungspunkte

| # | Ort | Häufigkeit | Problem [g] | Fix |
|---|---|---|---|---|
| R1 | Écouter | jede Lektion | 12–16 Sätze nur einzeln abspielbar; Zähler „0 / 12 écoutés“ wirkt als Pflicht. Etwa ein Drittel sind Substitutionsreihen: „Am Samstag / Sonntag / Montag / Freitag spiele ich Fußball.“ (`deutsch/deepening-content.js:2438–2446`), „Das Konzert beginnt um 18/19/20/21 Uhr.“ (`:4151ff.`), „Bitte rufen Sie mich heute / morgen / am Montag / am Dienstag zurück.“ (L22) | „Tout écouter“; Reihen auf 1–2 Sätze kürzen |
| R2 | Ende jeder Themenübung, Test final, Bilan | jede Übung | Knopf „Suite : parler et écrire“ führt zurück zur Themenseite bzw. zum Ergebnis, nie zu Oral/Écrit (`shared/exercise-engine.js:5`, `:279`) | `finishLabel: 'Voir le résultat'` |
| R3 | Bilan | jede Lektion | zwei Startbildschirme: „Commencer le bilan“ → „Commencer les 16 questions“ (`deutsch/assessments.js:80`, `:89`) | direkt starten |
| R4 | L1 Test final | einmalig | Ergebnisbildschirm heißt „BILAN 100 %“ (`deutsch/assessments.js:83`), obwohl die nächste Stufe „Bilan de la leçon“ heißt | Titel „Test final“ |
| R5 | ganze App, 375 px | jede Seite | fester Knopf „Signaler un problème“ (`shared/bug-reports.js:205`: `position:fixed; right:12px; bottom:94px`). Er überdeckt in Écouter das 🔊 der Zeile „Guten Morgen.“ und im Quiz radio den Knopf „▶ Écouter (0/2)“ (Knopf y = 692 px, Meldeknopf y = 682–718 px) | bei ≤ 400 px als Icon in die Kopfzeile |
| R6 | Hard Mode Quiz radio | jede Lektion | Kopfbereich (Titel, Neustart, Sterne, 11 Seitenknöpfe, Seitenkarte) füllt fast einen Bildschirm; der Play-Knopf liegt am unteren Rand | Kopf auf Unterseiten einklappen |
| R7 | alle Übungen | jede Aufgabe | Die deutsche Lösung wird nach jeder Antwort automatisch vorgelesen (`deutsch/answer-audio.js:27` `autoplay=true`), also 50–110 Mal pro Lektion, auch in der Bahn | Schalter „Lire la réponse automatiquement“ |
| R8 | Themenübungen | häufig | Dieselbe Aufgabe zweimal in einer Übung: L4 „Der Termin ist ___ zehn Uhr.“ (Aufgabe 3 und 7; `deutsch/page-checks.js:101` + `deutsch/grammar-drills.js:101`), L5 „Ich habe ___ Bruder.“ (`page-checks.js:132` + `question-content.js:94`). In L1 „Poser les premières questions“ fragen 5 von 13 Aufgaben Wo/Woher ab. Insgesamt 114 Prompt-Dubletten innerhalb von Lektionen, davon 75 über Stufen hinweg (Quiz ↔ Vertiefung ↔ Bilan) | Dedupe nach Prompt |
| R9 | L1 Test final | einmalig | zieht 10 Aufgaben aus genau den gerade geübten Drill-Pools (`deutsch/assessments.js:100`): „Ihr ___ in Berlin.“, „Wir ___ Deutsch.“ wörtlich wie zuvor | streichen (siehe 3.4) |
| R10 | Hard Mode | jede Lektion | 7 × „Les trous magiques“ hintereinander (L1, 11 Seiten). „heissen“ für *heißen* wird abgelehnt (`deutsch/hard-mode.js:9–11`, alle Lücken `strictAccents:true`), im Bilan aber akzeptiert (`deutsch/question-content.js:807–810`) | Seiten zusammenlegen; ß↔ss tolerieren |
| R11 | Compréhension | jede Lektion | „Lire le dialogue“ vor dem Antworten aufklappbar, Hören unbegrenzt | siehe F03 |
| R12 | Bedienung | gelegentlich | Sprachmischung: Lob „Klasse! / Prima! / Genau!“ im französischen UI (`shared/game-hard-mode.js:31`); Erklärung „Im Text steht « … » : Anna parle …“ (`deutsch/question-content.js:856`); „La bonne réponse est:“ ohne Leerzeichen vor dem Doppelpunkt | auf Französisch vereinheitlichen |
| R13 | Dialoge | geräteabhängig | Hinweis „Cet appareil ne propose pas de deuxième voix adaptée“: Sprecherwechsel ist nicht hörbar, Fragen nach „l’homme / la femme“ werden dann zum Rätsel | siehe F36/F37 |
| R14 | Lernzeit | L1, L4, L5 | 30, 23 und 22 min Pflichtpfad; die Vertiefung von L1 allein hat 6 Seiten mit 69 Aufgaben | siehe 3.4 |

Positiv geprüft:
- Die Optionen sind in jeder Aufgabe ohne Scrollen sichtbar. Die Seitenhöhe im Quiz liegt bei 858–1 071 px, der Knopf „Suivant“ ist sichtbar.
- Angefangene Übungen werden fortgesetzt („Continuer les exercices“).
- Es gibt kein Neustart-Zwang bei Fehlern, und falsche Antworten im Hard Mode kommen am Ende wieder.

---

## 5. Prüfbereich 3 – Aufgabenqualität

### 5.1 Automatische Prüfung über alle Aufgaben [g]

1 593 Aufgaben, davon 1 403 Auswahlaufgaben (alle mit 3 Optionen) und 190 Tippaufgaben (alle im Bilan).

| Prüfung | Ergebnis |
|---|---|
| Lösung ist eindeutig die längste Option | 300 / 1 403 (21 %, Erwartung bei Zufall 33 %) → **kein Längen-Bias** |
| Lösung ist eindeutig die kürzeste Option | 246 / 1 403 (18 %) → kein Bias |
| Längenausreißer (Lösung > 1,5 × längster bzw. < 0,5 × kürzester Distraktor) | 24, u. a. L11 c2 „seit“, L18 deep „trente mots“ |
| Lesefragen (Review/Reading, Text sichtbar), bei denen **nur die Lösung im Text steht** | **57 / 96 (59 %)** → per Wortabgleich lösbar |
| Hörfragen, deren Distraktoren nicht im Audio vorkommen | Compréhension 44 / 72 (61 %), Hard Mode 38 / 148 (26 %) |
| Tippaufgaben mit nur einer akzeptierten Form, obwohl ein anderes korrektes Wort naheliegt | 1: L8 c10 (F08) |

### 5.2 Stichprobe 168 Aufgaben von Hand

Ausgewählt mit festem Seed: 7 pro Lektion, je 1 Quiz, 2 Vertiefung, 1 Bilan, 1 Compréhension, 1 Hard-Hörfrage und 1 Lese- bzw. Review-Frage.

**Verteilung der Trennschärfe 1 / 2 / 3 / 4 / 5 (Ø)** [g]

| Aufgabentyp | Verteilung | Ø |
|---|---|---|
| Quiz „Que signifie …“ | 2 / 5 / 14 / 3 / 0 | 2,8 |
| Vertiefung | 5 / 5 / 26 / 11 / 1 | 3,0 |
| Bilan | 2 / 4 / 12 / 5 / 1 | 3,0 |
| Compréhension | 0 / 9 / 8 / 5 / 2 | 3,0 |
| Hard-Hörfragen | 0 / 2 / 7 / 13 / 2 | 3,6 |
| Lesen / Review | 1 / 3 / 18 / 2 / 0 | 2,9 |
| **gesamt (168)** | **10 / 28 / 85 / 39 / 6** | **3,0** |

| L | Verteilung | Ø |
|---|---|---|
| 1 | 1/1/2/3/0 | 3,0 |
| 2 | 1/2/4/0/0 | 2,4 |
| 3 | 0/1/1/3/2 | 3,9 |
| 4 | 0/0/4/2/1 | 3,6 |
| 5 | 0/1/5/1/0 | 3,0 |
| 6 | 1/0/5/1/0 | 2,9 |
| 7 | 0/0/4/3/0 | 3,4 |
| 8 | 0/1/4/2/0 | 3,1 |
| 9 | 0/1/3/2/1 | 3,4 |
| 10 | 0/1/5/1/0 | 3,0 |
| 11 | 2/2/2/0/1 | 2,4 |
| 12 | 2/0/3/2/0 | 2,7 |
| 13 | 1/2/3/1/0 | 2,6 |
| 14 | 0/0/5/2/0 | 3,3 |
| 15 | 0/3/3/1/0 | 2,7 |
| 16 | 1/0/4/2/0 | 3,0 |
| 17 | 0/2/3/2/0 | 3,0 |
| 18 | 1/2/3/1/0 | 2,6 |
| 19 | 0/3/3/1/0 | 2,7 |
| 20 | 0/1/4/2/0 | 3,1 |
| 21 | 0/1/4/1/1 | 3,3 |
| 22 | 0/0/3/4/0 | 3,6 |
| 23 | 0/1/5/1/0 | 3,0 |
| 24 | 0/3/3/1/0 | 2,7 |

U (mehrdeutig/unfair) kam in der Stichprobe nicht vor. Außerhalb der Stichprobe: L8 c10 (F08). Nur Grenzfall [V]: L1 „Ich spreche deutsch und französisch.“ als Distraktor (`deutsch/page-checks.js:14`). Kleinschreibung ist adverbial („auf Deutsch“) nach Duden möglich, für die Sprachkenntnis aber unüblich.

**Systematische Schwächen** [g]:
1. **Kognaten im Quiz.** `deutsch/study.js:131` erzeugt Kontraste, die nur das Kognat tauschen: *Kanada*/Canada, *Basketball*, *Fotografieren*, *Oktober*, *April*, *warm*.
2. **Lesefragen per Wortabgleich lösbar** (59 %).
3. **Tippaufgaben-Erklärungen nach dem Muster „Satz = Kontext“** (`deutsch/question-content.js:1006`), z. B. „Ich kann das Wort buchstabieren. = Je peux épeler le mot. Écris seulement l’infinitif.“ Diese Entscheidung ist in `DE-A1-QUALITAET.md` als „formal, nicht falsch“ offen gelassen. **Ich widerspreche:** Sie betrifft alle 190 Bilan-Tippaufgaben, also genau die Stelle, an der Lernende nach einem Fehler eine Regel brauchen. Vorschlag: Je Lernziel eine Kurzregel ergänzen („am + Tag, um + Uhrzeit“), wie sie `CHECK_RATIONALES` für die Auswahlaufgaben schon hat.
4. **Phonetikfragen per Schriftbild lösbar** (*eu*, *ei*).

### 5.3 Die 30 schwächsten Aufgaben mit Ersatz

TS = Trennschärfe. Lösung jeweils zuerst genannt bzw. mit → markiert.

| # | L / Stufe | Datei:Zeile | Zitat (Frage · Optionen → Lösung) | TS | Problem | Ersatz (Frage · Optionen → Lösung · Erklärung FR) |
|---|---|---|---|---|---|---|
| 1 | L2 Bilan | `question-content.js:393` | « Müller, mit Umlaut. » Quelle écriture correspond ? · Müller / Muller / Mülller → Müller | 1 | Frage nennt den Umlaut, „Mülller“ ist absurd | « On épelle : M, Ü, L, L, E, R. » Quelle écriture correspond ? · Müller / Muller / Möller → Müller · « Ü est un u avec Umlaut. Muller n’a pas de tréma, Möller contient ö. » |
| 2 | L11 Vertiefung | `page-checks.js:296` | Quel mot contient eu, prononcé « oï » ? · Deutsch / Datum / Dank → Deutsch | 1 | nur eine Option enthält „eu“ | Quel mot se prononce avec « oï » ? · heute / Haus / heiß → heute · « eu se prononce « oï » (heute) ; au se prononce « ao » (Haus), ei « aï » (heiß). » |
| 3 | L1 Vertiefung | `page-checks.js:53` | Dans quel mot entends-tu « aï » ? · heißen / Sie / sieben → heißen | 1 | per Schriftbild lösbar | Quelle écriture donne le son « aï » dans « h_ßen » ? · ei / ie / ai → ei · « Le son « aï » s’écrit ei. ie se prononce « i » long (Sie) ; ai n’est pas l’orthographe de ce mot. » |
| 4 | L18 Vertiefung | `page-checks.js:422` | Un message court contient environ : · trente mots / trois mots / trois cents mots → trente mots | 1 | absurde Distraktoren | Que faut-il ajouter aux trois points du message ? · une salutation et une formule de fin / un titre et une date / ton adresse complète → une salutation … · « Le message A1 commence par une salutation (Liebe Anna,) et finit par une formule (Viele Grüße). Titre et adresse ne sont pas demandés. » |
| 5 | L13 Vertiefung | `question-content.js:209` | Ist das Frühstück ___? · inklusive / reservieren / geschlossen → inklusive | 1 | Verb „reservieren“ grammatisch ausgeschlossen | Ist das Frühstück ___? · inklusive / frei / geöffnet → inklusive · « inklusive = compris dans le prix. frei = libre, disponible (pas « gratuit » ici), geöffnet = ouvert. » |
| 6 | L6 Vertiefung | `question-content.js:112` | Möchten ___ einen Kaffee? · Sie / du / ihr → Sie | 1 | nur „Sie“ passt zu *Möchten*; Lernziel Höflichkeit wird nicht geprüft | ___ Sie einen Kaffee? · Möchten / Möchtest / Möchte → Möchten · « Avec Sie de politesse : möchten. Möchtest va avec du, möchte avec ich ou er/sie. » |
| 7 | L12 Vertiefung | `question-content.js:192` | Ich gehe ___ ins Kino. · lieber / liebe / lieben → lieber | 1 | Distraktoren grammatisch unmöglich | « Je préfère aller au cinéma. » Ich gehe ___ ins Kino. · lieber / gern / nicht gern → lieber · « lieber = préférer ; gern = aimer ; nicht gern = ne pas aimer. » |
| 8 | L11 Bilan | `question-content.js:528` | « Ich lerne seit sechs Monaten Deutsch. » Que signifie seit ? · L’apprentissage a commencé il y a six mois et continue. / Le cours commencera dans six mois. / Le cours dure six minutes. → 1 | 1 | Lösung länger und genauer, „six minutes“ absurd | gleiche Frage · Elle apprend depuis six mois et continue. / Elle a appris il y a six mois puis a arrêté. / Elle va apprendre pendant six mois. → 1 · « seit + durée : action commencée et toujours en cours. « il y a six mois » = vor sechs Monaten ; « pendant six mois » (futur) = sechs Monate lang. » |
| 9 | L10 Bilan | `question-content.js:516` | Une vendeuse indique son métier. · Ich arbeite als Verkäuferin. / … im Verkäuferin. / … am Verkäuferin. → 1 | 2 | „im/am Verkäuferin“ absurd | gleiche Frage · Ich arbeite als Verkäuferin. / Ich arbeite als eine Verkäuferin. / Ich arbeite wie Verkäuferin. → 1 · « Après als, le métier n’a pas d’article. wie compare (« comme ») et ne donne pas le métier. » |
| 10 | L18 Bilan | `question-content.js:635` | Choisis une consigne polie. · Schreiben Sie bitte Ihren Namen. / Schreibt Sie … / Schreiben Ihren Namen Sie bitte. → 1 | 2 | Wortsalat-Distraktor | gleiche Frage · Schreiben Sie bitte Ihren Namen. / Sie schreiben bitte Ihren Namen. / Schreiben Sie bitte Ihr Namen. → 1 · « La consigne commence par le verbe, puis Sie. « Sie schreiben … » est une affirmation. Objet : Ihr Name → Ihren Namen. » |
| 11 | L15 Bilan | `question-content.js:589` | Tu dois travailler et refuses poliment. · Leider kann ich nicht kommen. Ich muss arbeiten. / Leider kann ich kommen. Ich muss nicht arbeiten. / Leider kann ich nicht arbeite. Ich muss kommen. → 1 | 2 | 3. Option per Verbform aussortierbar | gleiche Frage · Leider kann ich nicht kommen. Ich muss arbeiten. / Leider muss ich nicht kommen. Ich kann arbeiten. / Leider kann ich nicht kommen. Ich muss arbeite. → 1 · « kann nicht kommen = ne peux pas venir ; muss nicht kommen = ne suis pas obligé de venir. Après muss : infinitif arbeiten. » |
| 12 | L24 Vertiefung | `page-checks.js:538` | Habites-tu à Berlin ? · Wohnst du in Berlin? / In Berlin du wohnst? / Wohnst in Berlin du? → 1 | 2 | Wortsalat | gleiche Frage · Wohnst du in Berlin? / Wohnt du in Berlin? / Wo wohnst du in Berlin? → 1 · « Question oui/non : verbe en premier ; avec du, -st. Wo pose une autre question (où exactement). » |
| 13 | L1 Quiz | `deepening-content.js:76` / `study.js:131` | Que signifie « Ich komme aus Kanada. » ? · Je viens de France. / … d’Allemagne. / … du Canada. → du Canada | 1 | Kognat | gleiche Frage · Je viens du Canada. / J’habite au Canada. / Je vais au Canada. → 1 · « kommen aus = venir de (origine). J’habite = ich wohne in ; je vais = ich fahre nach. » |
| 14 | L12 Quiz | `deepening-content.js:2360` | « Ich spiele gern Basketball. » · … basketball / football / tennis → basketball | 1 | Kognat | gleiche Frage · J’aime jouer au basketball. / Je n’aime pas jouer au basketball. / Je préfère jouer au basketball. → 1 · « gern = aimer ; nicht gern = ne pas aimer ; lieber = préférer. » |
| 15 | L16 Quiz | `deepening-content.js:3044` | « Fotografieren ist verboten. » · interdit de photographier / de fumer / de stationner → photographier | 1 | Kognat | gleiche Frage · Il est interdit de photographier. / Il est permis de photographier. / Il faut photographier. → 1 · « verboten = interdit ; erlaubt = permis. » |
| 16 | L4 Quiz | `deepening-content.js:883` | Que signifie « Oktober » ? · octobre / janvier / avril → octobre | 1 | Kognat | Écoute : *Juni*. Quel mois entends-tu ? · Juni / Juli / Januar → Juni · « Juni = juin, Juli = juillet : écoute la fin -ni / -li. Januar = janvier. » |
| 17 | L8 Bilan (Tippen) | `question-content.js:491` | « Je voudrais visiter la maison. » Ich möchte das Haus ___. → nur „sehen“ | U | „besichtigen“ (L5-Wortliste) ist ebenso richtig und wird abgelehnt | `accept:['besichtigen']`, oder Kontext « Je voudrais voir la maison. » |
| 18 | L2 Vertiefung | `page-checks.js:57` | « Mon prénom est Lena. » · Mein Vorname ist Lena. / Mein Familienname ist Lena. / Mein Name ist Lena Vorname. → 1 | 2 | 3. Option absurd | gleiche Frage · Mein Vorname ist Lena. / Mein Familienname ist Lena. / Meine Vorname ist Lena. → 1 · « der Vorname est masculin : mein Vorname. Familienname = nom de famille. » |
| 19 | L17 Vertiefung | `page-checks.js:409` | Tu n’as pas compris. Que dis-tu ? · Noch einmal, bitte. / Ja, natürlich. / Gern, hier bitte. → 1 | 2 | Distraktoren sind Zusagen, Ausschluss leicht | gleiche Frage · Noch einmal, bitte. / Einen Moment, bitte. / Tut mir leid, das geht nicht. → 1 · « Noch einmal = encore une fois. Einen Moment = un instant ; Tut mir leid, das geht nicht = refus. » |
| 20 | L19 Vertiefung | `question-content.js:293` | Ich ___ Kopfschmerzen. · habe / bin / ist → habe | 2 | „ist“ per Person ausgeschlossen | « J’ai mal à la tête. » · Ich habe Kopfschmerzen. / Ich bin Kopfschmerzen. / Mein Kopf tun weh. → 1 · « haben + nom de douleur, ou Mein Kopf tut weh (singulier : tut). » |
| 21 | L23 Vertiefung | `question-content.js:356` | « Dans quel champ faut-il reporter la rue et le numéro ? » Musterstraße 8 gehört zur ___. · Adresse / Geburtsort / Familienstand → Adresse | 2 | Kontext nennt „rue et numéro“ | « Reporte la valeur dans le bon champ. » · Adresse / Postleitzahl / Geburtsort → Adresse · « Rue + numéro = Adresse ; Postleitzahl = code postal (5 chiffres). » |
| 22 | L24 Bilan | `question-content.js:722` | « Ich komme aus Kanada und wohne jetzt in Bonn. » Origine ? · Kanada / Bonn / Berlin → Kanada | 2 | „Berlin“ nicht im Satz | Text + „Meine Schwester wohnt in Berlin.“ · gleiche Optionen · « aus Kanada = origine ; wohne in Bonn = domicile ; Berlin = ville de la sœur. » |
| 23 | L1 Review | `applications.js:41` | Text „Ich heiße Léa …“ · Wie heißt die Person? · Léa / Lena / Lisa → Léa | 1 | nur Léa im Text | Text ergänzen: „Meine Freundin heißt Lena.“ · gleiche Optionen · « Ich heiße Léa = son nom ; Lena est son amie. » |
| 24 | L5 Drill | `grammar-drills.js:153` | Wir suchen ___ Schlüssel. · unser / unsere / unseren → unseren | 4 | keine eigene Erklärung; Akk.-Possessiv über A1 | in L5 streichen (3.4) oder Erklärung « Schlüssel est masculin et objet de suchen : unseren. unsere serait « nos clés ». » |
| 25 | L20 Quiz | `deepening-content.js:3874` | « Heute ist es warm. » · chaud / froid / il y a du soleil → chaud | 2 | Kognat | · Aujourd’hui il fait chaud. / Demain il fera chaud. / Aujourd’hui il fait froid. → 1 · « heute = aujourd’hui, morgen = demain ; warm = chaud, kalt = froid. » |
| 26 | L13 Quiz | `deepening-content.js:2612` | « Der Zug fährt um elf Uhr ab. » · part à 11 h / 8 h / 9 h → 11 h | 2 | prüft nur die Zahl, nicht *ab*/*an* | · Le train part à onze heures. / Le train arrive à onze heures. / Le train part dans onze minutes. → 1 · « fährt … ab = part ; kommt … an = arrive. » |
| 27 | L9 Quiz | `deepening-content.js:1854` | « Nehmen Sie die Linie drei. » · ligne trois / deux / quatre → trois | 2 | Zahlenerkennung statt Lernziel | · Prenez la ligne trois. / Prenez la ligne treize. / Prenez la voie trois. → 1 · « Linie = ligne ; Gleis = voie. drei = 3, dreizehn = 13. » |
| 28 | L19 Compréhension | `comprehension-content.js:937` | Depuis quand · gestern / heute / drei Tagen → gestern | 2 | Formbruch „drei Tagen“ ohne *seit* | · seit gestern / seit heute / seit drei Tagen → seit gestern |
| 29 | L24 Compréhension | `comprehension-content.js:1180` | Lieu · bei Person A / im Restaurant / bei Person B → bei Person B | 2 | Metasprache; bei einer Stimme kaum zuzuordnen | Dialog: „Feiern wir bei dir, Paul?“ · bei Paul / bei Anna / im Restaurant → bei Paul |
| 30 | L3 Review | `applications.js` (L3 review 3) | Wie ist die Postleitzahl? · 10405 / 10504 / 10450 → 10405 | 2 | Abschreiben aus dem sichtbaren Text | Text schreibt die PLZ in Wörtern („eins, null, vier, null, fünf“), Optionen in Ziffern → TS 4 |

---

## 6. Prüfbereich 4 – Roter Faden

### 6.1 Progressionskarte (Einführung → Wiederholung) [g]

| Grammatikpunkt | Eingeführt | Wiederholt | Befund |
|---|---|---|---|
| Verb an Position 2, Inversion | L1 | L10, L12, L20, L24 | gut |
| W-Frage / Ja-Nein-Frage | L1 | L24 | gut |
| Personalpronomen | L1 | L22 (Dativpronomen) | gut |
| sein / haben | L1 / L5 | L14 | **haben** wird in L4 schon getippt verlangt („___ Sie am Donnerstag Zeit?“ → *Haben*), Konjugation erst L5; als Chunk vertretbar |
| Regelmäßiges Präsens | L1 | L10 (identische Seite) | Dublette |
| Vokalwechsel | sprechen L1, fahren/nehmen L9, lesen L11 + L21, fallen L16 | – | verstreut, aber jeweils mit Erklärung |
| Modalverben | können L2, möchte L6, wollen L12, müssen L15, dürfen L16 | L14, L17, L22 | **möchte in L4** („Ich möchte dich treffen“, Übung L4 T4) vor L6 |
| Akkusativ | L2 (den Namen), L5 (einen nach haben), L6 | L8 Tabelle, L20 Tabelle (identisch) | erste Tabelle erst in L8, verlangt ab L5 |
| **Dativ** | L2 (mit einem Punkt) | L4 am/im/vom, L5 mit meiner, L9 mit dem/der, zum/zur, L10 im/in der, L11 seit -n, L14 beim, L15 bei mir, L17 mir, L22 dir/Ihnen | **verstreut auf 10 Lektionen, nie zusammengefasst**, ab L9 getippt geprüft |
| Possessiv | L5 (vollständig) | L18 Ihren, L19 mein/meine | zu früh zu viel |
| kein | L4 | L8 (keinen), L16 | dreimal fast gleich erklärt |
| Imperativ | L9 (Sie + du) | L18, L20, L22 | gut |
| Trennbare Verben | **L13** (erklärt) | L15, L16, L18, L20, L22, L23 | genutzt schon in **L9** („umsteigen“; „mitbringen“ im L9-Hinweis) |
| Uhrzeit, Datum | L3/L4 | L10, L13, L15, L21 | gut |
| seit | L11 | L14, L19 | gut |

### 6.2 Brüche und Fixes

| # | Bruch [g] | Fix |
|---|---|---|
| B1 | Lehrplan nennt „Écouter → Approfondir → Oral → Écriture → Bilan“ (`deutsch/LEHRPLAN-A1.md:11–12`). In der App fehlen Oral/Écriture, weil `renderExtras` die Karte nur ohne Hard Mode zeigt (`deutsch/lesson-flow.js:185–188`). `speakModel` und `writeModel` aus `applications.js` sind im Pfad unsichtbar | Karte immer anzeigen |
| B2 | `LEHRPLAN-A1.md:13`: „douze questions“, tatsächlich 14–16 Bilan-Fragen | Doku angleichen |
| B3 | L14 „Santé et médecin“ und L19 „Corps et santé“ überlappen. Gemeinsame Écouter-Sätze: „Ich brauche einen Termin.“, „Ich brauche einen Arzt.“, „Ich habe seit gestern Kopfschmerzen.“; L19 „Demander une aide médicale“ wiederholt L14 „Prendre rendez-vous“ | L19 nur „Körperteile + tut/tun weh“, die Termin-Seite streichen, oder L14 + L19 zusammenlegen |
| B4 | L12 „Dire ce qu’on aime“ und L21 „Parler de ses goûts“: gern/lieber/ins Kino doppelt. 4 von 12 L21-Sätzen sind „Ich gehe gern ins Kino/Museum/Theater/Konzert.“ L21 bringt 6 neue Wortlisteneinträge und 0–1 neuen Grammatikpunkt | L21 auf „Programm lesen: Beginn, Eintritt, Treffpunkt“ fokussieren oder mit L12 zusammenlegen |
| B5 | L18 „Stratégie pour l’examen“ steht zwischen L17 und L19 | hinter L23 neben L24 stellen oder mit L24 zusammenlegen |
| B6 | Der Verdacht L16 Schilder vs. L23 Formulare bestätigt sich **nicht**: 0 von 12 Sätzen überlappen | beibehalten |
| B7 | Dativ ohne Gesamtüberblick (siehe 6.1) | in L17 eine Seite „mir/dir/Ihnen + mit/bei/zu + dem/der“ als Übersicht; davor nur Chunks |
| B8 | Identische Seiten L1/L10 „Verbes réguliers“, L8/L20 „Articles à l’accusatif“ (gleiche Regel, Tabelle, ~11–14 Aufgaben) | in L10/L20 durch eine kurze Wiederholungsübung mit neuen Sätzen ersetzen |

**Bilan** [g]: In L1 und L4 im Browser und in allen 24 Lektionen im Dump prüft der Bilan ausschließlich Stoff der eigenen Lektion. In den gesichteten Lektionen kommt nichts aus späteren Lektionen vor. L24 Hard Mode wiederholt bewusst L1 („Wie ___ Sie?“, Hinweis *heißen*), als Abschlusswiederholung stimmig.

**Thematischer Faden innerhalb der Lektion** [g, Stichprobe 6 Lektionen]: Écouter, Vertiefung, Compréhension, Bilan und Hard Mode bleiben beim Thema. Ausnahmen:
- Die Wortlisten enthalten themenfremde Paradigma-Beispiele (*kein Zug, keine Straße, im Kino* in L4 „Heure“; *zum Arzt, zum Kino* in L3 „Nombres“).
- L1 Vertiefung fragt „Der Tisch, la table : quel pronom le remplace ?“ (`page-checks.js:29`) mit einem Nomen, das in L1 nicht vorkommt.

---

## 7. Prüfbereich 5 – Hörbeispiele und Hörverstehen

Technik [g]:
- Alles Audio ist Browser-Sprachsynthese (`speechSynthesis`), es gibt keine Audiodateien.
- Tempo: Écouter-Sätze und Antwort-Audio laufen mit 0,8, die Compréhension standardmäßig mit 1,0 (umschaltbar 75 % / 100 %), das Hard-Hörquiz mit 0,75 und Pausen an Satzgrenzen.
- Ziffernfolgen (PLZ, Telefon) werden einzeln mit 0,65 diktiert (`deutsch/listening-audio.js`).
- Im Testbrowser gab es nur eine deutsche Stimme, die App meldet das selbst. Ein Sprecherwechsel ist dann nicht hörbar.

### 7.1 Tabelle pro Lektion [g]

Spalten:
- **Hörbeispiele**: Écouter-Sätze / Audio-Knöpfe auf den Vertiefungsseiten / Quiz-Hörfragen / Compréhension-Dialog / Hard-Texte.
- **Dauer**: ein Durchgang aller Hörbeispiele ohne Vertiefungsaudio, geschätzt mit 2,3 Wörtern/s × Tempo.
- **Hörfragen**: Quiz 2 + Compréhension 3 + Hard.
- **Infos/Text**: Zahlen- und Namensangaben pro Hard-Text (T1 / T2).

| L | Hörbeispiele | Dauer (s) | Hörfragen | Infos/Text | Urteil |
|---|---|---:|---:|---|---|
| 1 | 12 / 11 / 2 / 1 (4 Wechsel) / 2 | 83 | 2+3+7 | 7 / 4 | passend; Hard T1 mit 4 Fragen |
| 2 | 12 / 12 / 2 / 1 (6) / 2 | 86 | 2+3+6 | 2 / 4 | passend |
| 3 | 15 / 6 / 2 / 1 (4) / 2 | 89 | 2+3+7 | **12 / 9** | **überladen** (Hard) |
| 4 | 16 / 26 / 2 / 1 (4) / 2 | 112 | 2+3+6 | 7 / 6 | viel |
| 5 | 12 / 7 / 2 / 1 (4) / 2 | 77 | 2+3+6 | 5 / 6 | passend |
| 6 | 12 / 4 / 2 / 1 / 2 | 85 | 2+3+6 | 2 / 2 | passend |
| 7 | 12 / 5 / 2 / 1 / 2 | 92 | 2+3+6 | 3 / 5 | passend |
| 8 | 12 / 4 / 2 / 1 / 2 | 95 | 2+3+7 | **5+ / 6** | **überladen** (T1: 7 Fakten, 4 Fragen) |
| 9 | 12 / 4 / 2 / 1 / 2 | 93 | 2+3+6 | 5 / 4 | passend |
| 10 | 12 / 6 / 2 / 1 / 2 | 89 | 2+3+6 | 4 / 4 | passend |
| 11 | 12 / 5 / 2 / 1 / 2 | 95 | 2+3+6 | 5 / 2 | passend |
| 12 | 12 / 5 / 2 / 1 / 2 | 90 | 2+3+6 | 4 / 2 | passend |
| 13 | 12 / 4 / 2 / 1 / 2 | 101 | 2+3+6 | 5 / 5 | passend |
| 14 | 12 / 5 / 2 / 1 / 2 | 88 | 2+3+6 | 3 / 3 | passend |
| 15 | 12 / 5 / 2 / 1 / 2 | 101 | 2+3+6 | 3 / 2 | passend |
| 16 | 12 / 5 / 2 / 1 / 2 | 86 | 2+3+6 | 3 / 2 | passend |
| 17 | 12 / 5 / 2 / 1 / 2 | 93 | 2+3+6 | 1 / 1 | passend |
| 18 | 12 / 4 / 2 / 1 / 2 | 93 | 2+3+6 | 0 / 0 | passend, aber Fragen per Weltwissen lösbar |
| 19 | 12 / 5 / 2 / 1 / 2 | 86 | 2+3+6 | 1 / 2 | passend |
| 20 | 12 / 5 / 2 / 1 / 2 | 85 | 2+3+6 | 0 / 3 | passend |
| 21 | 12 / 4 / 2 / 1 / 2 | 93 | 2+3+6 | 6 / 4 | passend |
| 22 | 12 / 4 / 2 / 1 / 2 | 109 | 2+3+6 | 4 / 5 | passend |
| 23 | 12 / 5 / 2 / 1 / 2 | 84 | 2+3+6 | 4 / 2 | passend |
| 24 | 12 / 4 / 2 / 1 / 2 | 103 | 2+3+7 | **8 / 2** | **überladen** (T1) |

Gesamturteil:
- Die **Menge** ist pro Durchgang angemessen (1,5–2 min).
- **Zu viel** sind die Écouter-Pflicht (12–16 Einzel-Taps, ⅓ Substitutionsreihen) und das automatische Antwort-Audio nach jeder Aufgabe (R7).
- **Audio fehlt nirgends**, wo es nötig wäre: Zahlen, Uhrzeiten und Buchstaben haben Audio, Ziffern werden diktiert.
- **Fragen und Wiederholungen**:
  - Hard-Texte haben 3–4 Fragen statt 1–2, dafür sind die Fragen vorab sichtbar und das Hören ist auf 2 Durchgänge begrenzt, prüfungsnah [g].
  - Die Compréhension hat 3 Fragen bei 4 Wechseln mit 20–39 Wörtern, passend.
  - Wiederholungsregel: Compréhension unbegrenzt plus Transkript vorab (F03), Hard Mode max. 2× (Start Deutsch 1: Teil 1 und 3 zweimal, Teil 2 einmal).
- **Struktur**:
  - Gut: Fragen kommen vor dem Hören.
  - Nicht gut: Es gibt keinen Hinweis „Lies zuerst die Fragen“ in der Compréhension.
  - Gut: Die Hörtexte stehen nach Écouter und Vertiefung, die Wörter sind also bekannt.

### 7.2 Die 10 schwächsten Hörfragen mit Ersatz

| # | L | Datei:Zeile | Transkript-Zitat | Frage · Optionen → Lösung | Problem | Ersatz |
|---|---|---|---|---|---|---|
| H1 | 2 | `hard-mode-content.js:481` | „A: … Können Sie den Vornamen bitte wiederholen? B: Paul. Ohne Bindestrich.“ | Que demande la femme à la fin ? · Sie möchte den Vornamen noch einmal hören. / … Familiennamen … / … buchstabieren. | Geschlecht von A wird nie genannt; mit einer Stimme nur über die Stimme lösbar | À la fin, quelle information faut-il répéter ? · den Vornamen / den Familiennamen / die Telefonnummer → den Vornamen |
| H2 | 6 | `hard-mode-content.js:1405` | „B: Ich hätte gern eine Suppe ohne Fleisch … A: Und für Ihre Freundin? B: Ein Wasser ohne Eis und einen Salat.“ | Que prend l’homme à manger ? · eine Suppe / einen Salat / einen Kuchen | „l’homme“ (B) nur über die Stimme bestimmbar | Que commande le client pour lui ? · eine Suppe / einen Salat / ein Wasser → eine Suppe |
| H3 | 19 | `hard-mode-content.js:4383`, `:4409` | „Mein Hals tut weh und ich brauche Wasser. Ich gehe heute zur Apotheke.“ | Que demande-t-elle à boire ? · Wasser / Tee / Saft | unnatürlicher Satz, Nebendetail, Distraktoren nicht im Text | Text: „Mein Hals tut weh. Tee habe ich zu Hause. Ich gehe heute zur Apotheke und kaufe Tabletten.“ · Que va-t-elle acheter ? · Tabletten / Tee / Wasser → Tabletten |
| H4 | 12 | `hard-mode-content.js:2832` | „Kommst du am Sonntag um drei Uhr in den Park? Bring bitte Wasser mit.“ | Que faut-il apporter ? · Wasser / Saft / Milch | Nebendetail, Distraktoren fehlen im Text | À quelle heure se retrouve-t-on dimanche ? · 15:00 / 13:00 / 16:00 → 15:00 |
| H5 | 15 | `hard-mode-content.js:3495` | „… hier ist Marc … Ich bringe dann einen Salat und Wasser mit.“ | Quelle boisson propose-t-elle d’apporter ? · Wasser / Saft / Kaffee | Saft/Kaffee nicht im Text; „-t-elle“ bei Sprecher Marc missverständlich | Que propose Marc d’apporter ? · einen Salat und Wasser / einen Kuchen und Wasser / nur einen Salat → 1 |
| H6 | 18 | `hard-mode-content.js:4113` | „Wir kreuzen die richtige Antwort an.“ | Que faut-il cocher ? · die richtige Antwort / die richtige Frage / das richtige Wort | per Weltwissen lösbar | Qu’écrit-on après avoir coché ? · eine kurze Nachricht / einen langen Text / die Aufgabe → eine kurze Nachricht |
| H7 | 18 | `hard-mode-content.js:4158` | „Sie haben eine Frage? Fragen Sie bitte.“ | Que faut-il faire en cas de question ? · eine Frage stellen / … | Frage verrät die Lösung | Que faut-il faire à la fin ? · den Text prüfen / die Fragen lesen / den Dialog hören → den Text prüfen |
| H8 | 5 | `hard-mode-content.js:1199` | „Mein Bruder heißt Paul … Hast du eine Schwester? Ja, sie heißt Lea.“ | Combien de frères et sœurs … au total ? · 2 / 1 / 3 | Rechen- und Gedächtnisaufgabe über 4 Wechsel | Où habite la sœur ? · Berlin / Bonn / Bremen → Berlin (Bonn = Vater, im Text) |
| H9 | 20 | `hard-mode-content.js:5776` | „Es ist kalt und windig. Am Nachmittag regnet es.“ | Quel temps fait-il aujourd’hui avant la pluie de l’après-midi ? | Frage verrät den Regen am Nachmittag; verschachtelt | Quel temps fait-il ce matin ? · kalt und windig / warm und sonnig / kalt und sonnig → 1 |
| H10 | 24 | `comprehension-content.js:1180` | „B: Ja, wir feiern bei mir zu Hause.“ | Lieu · bei Person A / im Restaurant / bei Person B | Rollen-Metasprache, bei einer Stimme schwer | Dialog: „Feiern wir bei dir, Paul?“ · bei Paul / bei Anna / im Restaurant → bei Paul |

### 7.3 Überladene Hörtexte und Kürzung

| Text | Datei:Zeile | Befund [g] | Kürzungsvorschlag |
|---|---|---|---|
| L3 Hard 1 | `hard-mode-content.js:646` | 8 Wechsel, 51 Wörter, **5 Datenangaben**: Alter 30, PLZ 10115, Telefon 030 21 34 56, Geburtsort, Geburtsdatum „der dritte April neunzehnhundertsechsundneunzig“; 4 Fragen | Alter und Geburtsdatum streichen: „Wo wohnen Sie? – In Berlin. Meine Postleitzahl ist 10115. – Und Ihre Telefonnummer? – 030 21 34 56.“ 2 Fragen (PLZ, Telefon) |
| L3 Hard 2 | `hard-mode-content.js:727` | Ansage mit 5 Angaben (Alter, Stadt, PLZ, Telefon, Geburtsort) | auf Alter + Telefonnummer reduzieren, 2 Fragen |
| L8 Hard 1 | `hard-mode-content.js:1845` | 8 Wechsel, **7 Fakten** (2 Zimmer, Balkon, Küche, Bad, 600 €, Mo → Di 10 Uhr, Schulstraße 12); 4 Fragen | Adress-Wechsel und „Küche und Bad“ streichen; Fragen: Miete, Besichtigungstag |
| L24 Hard 1 | `hard-mode-content.js:5461` | Vorstellung (Name, Herkunft, Wohnort, Sprachen) **und** Terminverschiebung 18 → 19 Uhr **und** Treffpunkt; 4 Fragen | in zwei Texte teilen: „Vorstellung“ (Herkunft, Wohnort) und „Termin“ (19 Uhr, vor dem Bahnhof) |
| L1 Hard 1 | (L1 listening[0]) | 7 Wechsel, beide Sprecher nennen Herkunft und Stadt (Kanada/Frankreich, Bonn/Berlin), 4 Fragen | gewollte Verwechslung ok, aber Frage 4 (Sprachen) streichen → 3 Fragen |

---

## 8. Fundliste

| ID | Bereich | L | Datei:Zeile | Zitat | Problem | Schwere | Fix | Status |
|---|---|---|---|---|---|---|---|---|
| F01 | 2/4 | alle | `deutsch/lesson-flow.js:185–188` | `if(!window.DE_A1_HARD_MODE){ … data-lesson-step="speak" …}` | Oral/Écriture im Pfad nicht erreichbar; Lehrplanstufen 3–4 fehlen, Sprechen wird nie geübt | KRITISCH | Karte unabhängig vom Hard Mode zeigen | geprüft (L1 Bilan-Ansicht und Ergebnis im Browser ohne Knopf; Bedingung im Code) |
| F02 | 2 | alle | `shared/exercise-engine.js:5`, `:279` | „Suite : parler et écrire“ | falsches Ziel am Ende jeder Übung | MITTEL | `finishLabel` setzen | geprüft |
| F03 | 5 | alle | `shared/comprehension.js:22` | `<details><summary>Lire le dialogue</summary>…` | Transkript vor der Antwort lesbar | MITTEL | erst nach „Vérifier“ | geprüft |
| F04 | 2 | alle | `deutsch/assessments.js:80`, `:89` | „Commencer le bilan“ → „Commencer les 16 questions“ | doppelter Start | GERING | ein Bildschirm | geprüft |
| F05 | 2 | 1 | `deutsch/assessments.js:83` | „BILAN 100 %“ nach Test final | Verwechslung mit Bilan de la leçon | GERING | „Test final“ | geprüft |
| F06 | 2 | alle | `shared/bug-reports.js:205` | `#a1BugLauncher{position:fixed;…bottom:calc(94px …)}` | überdeckt 🔊 und Play-Knopf bei 375 px | MITTEL | Icon in Kopfzeile | geprüft |
| F07 | 2/5 | alle | `deutsch/deepening-content.js:2438–2446`, `:4151ff.` | „Am Samstag / Sonntag / Montag spiele ich Fußball.“ | Pflicht-Einzeltaps, monotone Reihen | MITTEL | „Tout écouter“, Reihen kürzen | geprüft |
| F08 | 3 | 8 | `deutsch/question-content.js:491` | « Je voudrais visiter la maison. » Ich möchte das Haus ___. → sehen | korrektes „besichtigen“ abgelehnt | KRITISCH | `accept:['besichtigen']` | geprüft (Code `matchesAnswer`) |
| F09 | 2 | alle (Hard) | `deutsch/hard-mode.js:9–11`; Lücken `strictAccents:true` | „heissen“ → „On s’entraîne encore. La bonne réponse est: Wie heißen Sie?“ | ß/ss streng, im Bilan tolerant | MITTEL | ß↔ss tolerieren | geprüft (L24 S. 4) |
| F10 | 3 | 2 | `deutsch/question-content.js:393` | Müller / Muller / Mülller | zu offensichtlich | MITTEL | Ersatz 5.3 #1 | geprüft |
| F11 | 3 | 11 | `deutsch/page-checks.js:296` | eu → Deutsch / Datum / Dank | Schriftbild verrät | MITTEL | Ersatz #2 | geprüft |
| F12 | 3 | 1 | `deutsch/page-checks.js:53` | « aï » → heißen / Sie / sieben | Schriftbild verrät | MITTEL | Ersatz #3 | geprüft |
| F13 | 3 | 18 | `deutsch/page-checks.js:422` | trente mots / trois mots / trois cents mots | absurd | MITTEL | Ersatz #4 | geprüft |
| F14 | 3 | 13 | `deutsch/question-content.js:209` | inklusive / reservieren / geschlossen | Grammatik verrät | MITTEL | Ersatz #5 | geprüft |
| F15 | 3 | 6 | `deutsch/question-content.js:112` | Möchten ___ … Sie / du / ihr | Grammatik verrät | MITTEL | Ersatz #6 | geprüft |
| F16 | 3 | 12 | `deutsch/question-content.js:192` | lieber / liebe / lieben | Grammatik verrät | MITTEL | Ersatz #7 | geprüft |
| F17 | 3 | 11 | `deutsch/question-content.js:528` | « … Le cours dure six minutes. » | Lösung länger, Distraktor absurd | MITTEL | Ersatz #8 | geprüft |
| F18 | 3 | 1, 4, 12, 16, 20 | `deutsch/study.js:131`; `deepening-content.js:76`, `:883`, `:2360`, `:3044`, `:3874` | Kanada/Canada, Oktober, Basketball, Fotografieren, warm | Kognat-Quiz | MITTEL | eigene Kontraste (`unit.contrasts`) | geprüft |
| F19 | 3 | alle | `deutsch/applications.js:41ff.` | Léa / Lena / Lisa (nur Léa im Text) | 57/96 Lesefragen per Wortabgleich | MITTEL | Distraktoren in den Text | geprüft |
| F20 | 2/3 | 4, 5, 1 | `page-checks.js:101` + `grammar-drills.js:101`; `page-checks.js:132` + `question-content.js:94` | „Der Termin ist ___ zehn Uhr.“ 2× in einer Übung | Dubletten | MITTEL | Dedupe | geprüft |
| F21 | 2 | 1 | `deutsch/assessments.js:100` | Test final aus Drill-Pools | wörtliche Wiederholung | GERING | streichen/neue Sätze | geprüft |
| F22 | 1 | 1 | L1-Vertiefung (6 Seiten) | 69 Aufgaben, 8 Grammatikpunkte, 70 Wörter | Einstieg überladen | MITTEL | 3.4 Nr. 1 | geprüft |
| F23 | 1 | 4 | L4 Wortliste / 4 Seiten | 118 Einträge, davon 69 neu | zu viel | MITTEL | 3.4 Nr. 3 | geprüft |
| F24 | 1 | 5 | `deutsch/grammar-drills.js:153` | Wir suchen ___ Schlüssel → unseren; Ihr besucht ___ Schwester → eure | Paradigma über A1 | MITTEL | 3.4 Nr. 4 | geprüft |
| F25 | 1 | 9, 10, 22 | `deutsch/question-content.js:157` + Bilan-Lücken | Wir fahren mit ___ Bahn. → der (getippt) | produktiver Dativ | MITTEL | Chunk-Auswahl | geprüft |
| F26 | 1 | 6 | L6 „Bon à savoir“ | ich hätte · du hättest · … ihr hättet | Paradigma unnötig | GERING | kürzen | geprüft |
| F27 | 1/4 | alle | `shared/vocabulary-trainer.js:80` | mein Buch / meine Straße / meine Bücher; kein Zug; um zu lernen | Wortliste mit themenfremden Beispielen | GERING | nicht als Lektionswort listen | geprüft |
| F28 | 1 | 9 | `shared/vocabulary-content.js:6948` | „fahren / ein Fahrzeug führen“ | unnatürlicher Eintrag | GERING | „fahren“ | geprüft |
| F29 | 1 | Prüfungsvorb. | `deutsch/app.js:1444`, `:1674` | „…, weil ich krank bin.“ | Nebensatz in A1-Modell | GERING | „Ich bin krank.“ als Hauptsatz | geprüft / Inventar: Vermutung |
| F30 | 4 | 14/19 | L19 Écouter-Sätze | „Ich brauche einen Termin.“ / „Ich habe seit gestern Kopfschmerzen.“ | Doppelung L14 | MITTEL | B3 | geprüft |
| F31 | 4 | 12/21 | `deepening-content.js:2411` vs. `:4059` | „Ich gehe gern/lieber ins Kino.“ | Doppelung | MITTEL | B4 | geprüft |
| F32 | 4 | 1/10, 8/20 | Seiten „Verbes réguliers“, „Articles à l’accusatif“ | identische Seiten | Wiederholung ohne Neues | GERING | B8 | geprüft |
| F33 | 4 | 18 | Lektionsfolge | Prüfungsstrategie zwischen L17 und L19 | Reihenfolge | GERING | B5 | geprüft |
| F34 | 4 | 4 | Übung L4 T4 | „Ich möchte dich treffen.“ | möchte vor L6 | GERING | streichen | geprüft |
| F35 | 4 | – | `deutsch/LEHRPLAN-A1.md:11–13` | „Oral … Écriture …“, „douze questions“ | Doku ≠ App | GERING | angleichen | geprüft |
| F36 | 5 | 2 | `deutsch/hard-mode-content.js:481` | Que demande la femme à la fin ? | nur über Stimme | MITTEL | H1 | geprüft |
| F37 | 5 | 6 | `deutsch/hard-mode-content.js:1405` | Que prend l’homme à manger ? | nur über Stimme | MITTEL | H2 | geprüft |
| F38 | 5 | 19 | `deutsch/hard-mode-content.js:4383`, `:4409` | „Mein Hals tut weh und ich brauche Wasser.“ | unnatürlich, Nebendetail | MITTEL | H3 | geprüft |
| F39 | 5 | 18 | `deutsch/hard-mode-content.js:4113`, `:4158` | Que faut-il cocher ? / en cas de question | Weltwissen / Frage verrät | MITTEL | H6, H7 | geprüft |
| F40 | 5 | 3, 8, 24 | `hard-mode-content.js:646`, `:727`, `:1845`, `:5461` | siehe 7.3 | Infodump | MITTEL | Kürzung 7.3 | geprüft |
| F41 | 2 | alle | `deutsch/answer-audio.js:27` | `autoplay=true` | Audio nach jeder Antwort ungefragt | GERING | Schalter | geprüft |
| F42 | 2 | Hard | `shared/game-hard-mode.js:31` | „Klasse! / Prima! / Genau!“ | Sprachmischung | GERING | französisch | geprüft |
| F43 | 3 | 1 | `deutsch/question-content.js:856` | „Im Text steht « Ich spreche … » : Anna parle …“ | Sprachmischung | GERING | « Le texte dit … » | geprüft |
| F44 | 3 | alle | `deutsch/question-content.js:1006` | „Ich kann das Wort buchstabieren. = Je peux épeler le mot. Écris seulement l’infinitif.“ | Erklärung wiederholt nur die Lösung (190 Tippaufgaben) | MITTEL | Kurzregel je Lernziel | geprüft (Entscheidung angefochten) |
| F45 | 3 | 14 | `deutsch/deepening-content.js:2704` | „Ich habe seit heute Husten.“ / „Je tousse depuis aujourd’hui.“ | beide Sprachen unidiomatisch | GERING | „seit heute Morgen“ / « depuis ce matin » | geprüft |
| F46 | 3 | 14 | `deutsch/deepening-content.js:2794` | „Ich bin zwei Tage krank.“ = « malade pour deux jours » | unidiomatisch (krankgeschrieben) | GERING | „Ich bin zwei Tage krankgeschrieben.“ oder streichen | geprüft |
| F47 | 3 | 1 | `deutsch/page-checks.js:14` | Distraktor „Ich spreche deutsch und französisch.“ | Kleinschreibung adverbial vertretbar | GERING | Distraktor „Ich spreche Deutsch und Frankreich.“ (Land statt Sprache) | Vermutung |
| F48 | 5 | 19 | `deutsch/comprehension-content.js:937` | gestern / heute / drei Tagen | Formbruch | GERING | Ersatz #28 | geprüft |

Summe: 48 Funde · KRITISCH 2 · MITTEL 28 · GERING 18.

---

## 9. Was gut ist – bei Änderungen erhalten

- **Eindeutige Lösungen**: Unter 1 403 Auswahlaufgaben gibt es keine doppelte Option und keine fehlende Lösung. Es gibt keinen Längen-Bias (21 % längste und 18 % kürzeste Lösung gegenüber 33 % Zufall) [g].
- **`CHECK_RATIONALES`**: Die Begründungen in Auswahlaufgaben erklären auch den Distraktor („Wohnt va avec er ou sie, pas avec Sie.“) [g].
- **Typische Lernerfehler als Distraktoren**:
  - *Ich habe dreißig Jahre alt*
  - *siebenzehn*
  - *zweizehn*
  - *Viertel vor/nach*
  - *halb acht = 7:30*
  - *der Kurs fällt aus → « sort »*
  - *lest/liest*
  - PLZ- und Telefon-Zahlendreher
- **Hard-Hörquiz prüfungsnah**: Fragen vorab, max. 2 Durchgänge, 75 % Tempo, Transkript erst nach Abgabe, Ziffern diktiert [g].
- **Bilan**: prüft nur die eigene Lektion, mit 6–9 Tippaufgaben. Die Tippprüfung toleriert Groß-/Kleinschreibung, ae/oe/ue, ss und Satzzeichen [g].
- **Fortschritt und Fortsetzung**: Angefangene Übungen laufen weiter, eine richtige Antwort ist ohne Scrollen erreichbar, Umlaut-Knöpfe gibt es im Hard Mode [g].
- **Stoffgrenzen**: Kein Perfekt, Passiv, *dass* oder Konjunktiv außer *hätte/möchte* im Lernpfad [g]. Die Vertiefungsseiten bleiben unter 280 Wörtern vor der Übung (laut bestehendem Test) [g].

---

## 10. Methode und Grenzen

**Durchgespielt** [g]:
- Umgebung: lokaler Server `http://localhost:8765/deutsch/`, Browser-Pane bei 375 × 812 px, lokales Testprofil (`mode:'local'`, nach dem Test wieder gelöscht, keine Cloud-Daten).
- **L1** komplett:
  - Écouter: 12 Audio, Quiz 10.
  - Vertiefung: 6 Seiten, 69 Aufgaben.
  - Test final 10, Compréhension 3, Bilan 16.
  - Hard-Mode-Übersicht und Quiz radio.
- **L4, L6, L12, L19, L24**: alle Stufen (Écouter, Quiz, alle Themenübungen, Compréhension, Bilan) per Skript mit richtigen Antworten durchgeklickt. Danach die Hard-Mode-Spieleliste geöffnet; in L24 Hard Mode „Les trous magiques“ mit Toleranztest gespielt.
- Falsche Antworten habe ich nur stichprobenhaft ausgelöst (L1 Quiz 1, Hard-Lücke).

**Gezählt** [g]:
- Grundlage ist ein JSDOM-Dump wie in `tests/deutsch-a1-page-load.test.cjs` über alle 24 Lektionen. Er umfasst die Écouter-Sätze, Wortliste, 60 Vertiefungsseiten (Wörter, Tabellen, Audio, Übungsaufgaben inkl. `page-checks`), das Quiz, den Bilan, Compréhension, Review/Reading und die Hard-Lücken und -Hörfragen.
- Automatische Prüfungen über 1 593 Aufgaben.
- Stichprobe von 168 Aufgaben von Hand bewertet (Seed-gezogen, gleichmäßig).
- Alle 190 Bilan-Tippaufgaben gesichtet.
- Alle 48 Hard-Hörtexte, 148 Hard-Hörfragen und 24 Compréhension-Dialoge gelesen und ausgezählt.

**Nicht oder nur eingeschränkt geprüft**:
- **Klangqualität**: Das Audio war für die Messung abgefangen (`speechSynthesis.speak` protokolliert), ich habe also nicht wirklich zugehört. Geprüft sind gesprochener Text, Tempo, Stückelung und Zeitpunkt. Der Testbrowser bot nur eine deutsche Stimme. Safari/iOS-Stimmen und VoiceOver sind nicht geprüft.
- **Zeitschätzungen**: Sie sind Formeln (Abschnitt 3.1), keine gemessenen Lernzeiten.
- **Hard-Mode-Spiele**: Memory, Fadenspiel, Wortzug und Uhr habe ich nur geöffnet und nicht durchgespielt. Der Quiz-Turm „La tour du million“ ist nicht geprüft.
- **Prüfungspools** (Écoute Teil 1–4, Lesen, Schreiben in `app.js`): nur Grammatik-Stichworte gesucht, nicht inhaltlich bewertet.
- **Goethe-A1-Wortliste**: Ich habe nicht maschinell abgeglichen. Aussagen zu „nicht auf der Liste“ sind Vermutungen.
- **Wortzahlen**: Sie zählen Wortlisten-Einträge, keine Lemmata. Paradigma-Beispiele erhöhen L1, L3, L4 und L5.
- **Code und Inhalte**: Gemäß Auftrag habe ich nichts geändert. Die einzige neue Datei ist dieser Bericht.
