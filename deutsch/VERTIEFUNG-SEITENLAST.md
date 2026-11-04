# Vertiefung: eine Seite pro Thema (DE-A1)

Stand 2026-11-03, zweite Fassung. Vorbild ist die Vertiefung des Französischkurses.

Diese Fassung ersetzt zwei frühere Aufbauten:

- **2026-11-02:** eingeklappte `<details>`-Blöcke.
- **Erste Fassung vom 2026-11-03:** „Partie x sur y“-Unterseiten mit einem Kurztest „Vérifie“ nach jedem Block. Auf einer Seite standen bis zu vier grüne Testknöpfe, dazu viele kleine Kästen. Das wirkte unaufgeräumt.

## Aufbau einer Themenseite

1. Titel
2. Regel (2–3 Sätze)
3. Tabelle, wenn vorhanden
4. Beispiele: Zeilen ohne Kasten, ab 640 px zweispaltig
5. **„Bon à savoir“**: alle Hinweise des Themas (`lesson-foundations`) in einem ruhigen Streifen mit Akzentkante
6. Aussprache, wenn vorhanden
7. **„Mots utiles“**: die Übungswörter, direkt über der Übung
8. **Ein Übungsblock** „À toi de pratiquer“ mit einem Knopf

Für den Aufbau gilt:

- Nichts ist eingeklappt, und es gibt keine Unterseiten.
- Navigation wie im Französischkurs: oben die Themensegmente, unten „← Retour“ und „Suivant : … →“.
- Die frühere Referenzliste „Autres expressions“ entfällt. Sie enthielt nach dem Entfernen der Hörsätze nur noch Schreibhilfen, und die stehen in der Schreibaufgabe.

## Kurztests in der Übung

Die Fragen der früheren Kurztests (`@R`, `@H0` … und `@P` in `page-checks.js`) gehen in die eine Übung des Themas ein. Dazu kommen die bisherigen Abschlussfragen (`>`). Es geht keine Frage verloren.

- Eine Übung hat 9–16 Aufgaben.
- Angefangene Übungen behalten ihre Aufgaben.
- Der Lernstand (`lessonGrammarPractice`) bleibt erhalten.

## Keine Wiederholung aus „Écouter & comprendre“

Unverändert gilt: `withoutListeningRepeats` in `study.js` entfernt Beispielsätze, die schon im Hörteil vorkamen. Eine Liste behält höchstens zwei davon, und das nur, wenn die Regel sonst ohne Beispiel dastünde.

## Umsetzung

- `deutsch/assessments.js`: `decorate` legt die Kurztestfragen in die Themenübung, `pageChecks` ist entfernt.
- `deutsch/study.js`: `compactPage` ordnet die Wortliste vor der Übung ein, entfernt die Hörwiederholungen und den Referenzblock und fasst die Hinweise unter „Bon à savoir“ zusammen. `splitPage`, `showPart` und `partReady` sind entfernt.
- `deutsch/lesson-flow.js`: Die Teil-Navigation ist entfernt, es gilt wieder die einfache Themennavigation.
- `deutsch/deepening.css`: Beispiele ohne Kasten, Zwei-Spalten-Raster, „Bon à savoir“-Streifen und kleine Überschrift für „Mots utiles“.

## Grenzwerte (festgehalten in `tests/deutsch-a1-page-load.test.cjs`)

Gemessen pro Seite, bis zum Übungsknopf:

| | Grenze |
|---|---|
| Wörter | **280** |
| Tabellen | 1 |
| Beispielzeilen | 8 |
| Aufgaben in der Übung | 8–16 |

Die meisten Seiten haben 60–180 Wörter. Am längsten sind Themen mit drei Hinweisen, etwa L15 T2 mit 270 Wörtern und L9 T2 mit 257.
