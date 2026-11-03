# Vertiefung: Aufbau in Teilen (DE-A1)

Stand 2026-11-03. Ersetzt die Fassung vom 2026-11-02, in der Beispiele, Hinweise und Aussprache in `<details>` eingeklappt waren.
Das sah uneinheitlich aus und wurde zurückgenommen.

## Grundsatz

- **Nichts ist eingeklappt.** Auf einer Vertiefungsseite gibt es kein `<details>` mehr, auch nicht für Wortliste oder Referenz.
- **Ein Thema = mehrere kurze Teile.** Jeder Teil ist ein Häppchen mit seinem kurzen Test („Vérifie“).
  Nach dem Test geht es mit „Continuer →“ zum nächsten Teil. Es entsteht kein neuer Reiter: Lektionsschritte und Themenleiste bleiben gleich.
- **Reihenfolge der Teile:**
  1. „Mots pour les exercices“, nur wenn die Liste mehr als drei Wörter hat. Kürzere Listen stehen beim Erklärungsteil.
  2. Erklärung: Regel, Tabelle, Beispiele, danach ihr Test.
  3. Jeder Hinweis aus `lesson-foundations` mit seinem Test.
  4. Aussprache, mit Test, wenn es einen gibt. In L2 T1 kommt sie zuerst, weil die Regel auf das Alphabet verweist.
  5. Mini-Test („À toi de pratiquer“), danach offen „Autres expressions“, wenn vorhanden.
- Unter dem Thementitel steht „Partie x sur y“. „← Retour“ geht einen Teil zurück, vom ersten Teil zurück zum letzten Teil des vorigen Themas.
- Die Position (Thema und Teil) wird in `resume.grammarPart` gespeichert. Ein angefangener Mini-Test öffnet direkt den letzten Teil.

## Keine Wiederholung aus „Écouter & comprendre“

Vorher waren 195 von 408 Beispielzeilen der Vertiefung wortgleich die Sätze aus dem Hörteil davor.
`withoutListeningRepeats` in `study.js` entfernt sie beim Aufbau der Seite:

- Eine Beispielliste behält höchstens so viele gehörte Sätze, dass sie auf zwei Beispiele kommt.
  Das gilt nur, wenn die Regel sonst ohne Beispiel dastünde, also keine Tabelle und keine Wortreihe hat.
- Die Referenzliste „Autres expressions“ behält keine gehörten Sätze. Ist sie danach leer, entfällt sie.

Ergebnis: 298 Beispielzeilen, davon 86 bewusst behaltene Wiederholungen (höchstens zwei pro Liste).
Die Daten in `deepening-content.js` bleiben unverändert. Aufgaben, IDs und `practiceCount` ändern sich nicht.

## Umsetzung

- `deutsch/study.js`: `compactPage` (Wortliste und Referenz als offene Blöcke, Wiederholungen entfernen), `splitPage`, `showPart`, `partReady`.
- `deutsch/lesson-flow.js`: Teil-Navigation im Fußbereich (`#previousGrammarPart`, `#nextGrammarPart`).
  „Continuer“ wird hervorgehoben, sobald der Test des Teils erledigt ist.
- `deutsch/assessments.js`: Ein abgeschlossener Kurztest meldet sich über `onUpdate`.
- `deutsch/deepening.css`: Die Klapp-Regeln sind entfernt. Wortliste, Referenz, Hinweise und Aussprache haben dieselbe Überschrift (Akzentstrich) und keinen eigenen Rahmen.

## Grenzwerte (festgehalten in `tests/deutsch-a1-page-load.test.cjs`)

Gemessen pro Teil, bis zum Start seines Tests:

| | L1–3 | ab L4 |
|---|---|---|
| Wörter | **100** | **120** |
| Tabellen | 1 | 1 |
| Beispielzeilen | 6 | 6 |

Die Wortliste als eigener Teil zählt nicht, sie ist ein Nachschlageblock.
Die längste Stelle in L1–3 ist der Hinweis „Lire un jour dans une date“ (L3 T2) mit 95 Wörtern. Er ist ein zusammenhängender Text und wurde deshalb nicht geteilt.
