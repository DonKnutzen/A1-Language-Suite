# Qualitätsprüfung: Spanisch A1

Datum: 19. November 2026. Geprüfter Ausgangsstand: `bf4c4c9`.

## Ergebnis

**Die Inhalte von Spanisch A1 sind jetzt fachlich stimmig und funktionieren. Didaktisch erreicht der Kurs aber noch nicht die Tiefe von Französisch A1, weil ihm zwei Bausteine fehlen, die Französisch hat: ein eigener Lektionscheck und ein eigenes Vertiefungsmodul mit Mini-Tests.** Diese Lücke ist eine Frage der Struktur. Laut Auftrag wurde die Struktur nicht verändert.

Geprüft wurden alle 24 Lektionen: Lernziele, Vertiefungstexte, Aussprachehinweise, Dialoge, Kernwendungen, alle 240 Quizfragen, die 80 Grammatikfragen, die 57 Hör- und 57 Leseaufgaben, Formulare, Schreibaufgaben, Sprechkarten sowie die Audioausgabe. Zusätzlich lief ein Browser-Durchgang mit Playwright durch alle 24 Übungsrunden. Er zeichnete auf, welche Texte an die Sprachausgabe gehen.

Diese Prüfung hat ein Entwickler durchgeführt. Sie ersetzt kein Lektorat durch Muttersprachler und keinen Lerntest mit Anfängern. Wie gut die Stimmen klingen, hängt vom Gerät ab und wurde nicht beurteilt. Geprüft wurde nur, dass der richtige spanische Text mit `es-ES` an die Stimme geht.

## Vergleich mit Französisch A1

| Baustein | Französisch A1 | Spanisch A1 |
|---|---|---|
| Lernziele, Kernwendungen mit Audio, Aussprache, Dialog | ja | ja |
| Vertiefung (Grammatik & Satzmuster) | eigenes Modul mit Themen, Mini-Tests und Fortsetzen (`deepening.js`) | Erklärungsblock in der Lektion plus Grammatikübersicht; **kein eigenes Modul mit Mini-Tests** |
| 10 gemischte Übungen | ja | ja (gemeinsamer Übungsmotor) |
| Sprechen & Schreiben selbst anwenden | ja | ja |
| **Lektionscheck** | eigener Check mit Fehlerwiederholung (`lesson-challenge.js`) | **fehlt**: Der Abschluss erfordert 70 % in den 10 Übungen plus Sprechen und Schreiben |
| Grammatik-Sets | 12 Sets / 120 Fragen | 8 Sets / 80 Fragen |
| Audio | Browserstimme und vorproduzierte Aufnahmen | nur Browserstimme |

## Behobene Befunde

| ID | Prio | Befund | Korrektur |
|---|---|---|---|
| S01 | P1 | In den Lektionen 2–24 waren die falschen Antwortoptionen meist zufällige Sätze aus anderen Lektionen, zum Beispiel „Wo ist der Bahnhof?“ mit der Alternative „Was machst du beruflich?“. Die Aufgaben ließen sich ohne Spanischkenntnisse lösen. Bei 230 von 240 Fragen fehlte außerdem eine Erklärung. | Alle 230 Fragen haben jetzt thematisch passende, lehrreiche Alternativen, zum Beispiel cansado/casado, está/es/hay, gusta/gustan, siga/sigue, cuánto/cuándo, tú- oder usted-Form. Jede Frage hat eine Erklärung, die die entscheidende Regel nennt. Richtige Antworten und Fragen sind unverändert. |
| S02 | P1 | Die Vertiefung von L11, L14, L21 und L22 hatte keinen Erklärungstext. In L4, 7, 10, 19, 20 und 21 fehlte der Merksatz. | Erklärungen ergänzt (Wegbeschreibung mit usted-Formen, Wetter mit hace, Artikel/Plural/Adjektive, dónde/a dónde/de dónde) und Merksätze ergänzt. `LEHRPLAN-A1.md` wurde daraus neu erzeugt. |
| S03 | P1 | L15 sagte „por dos noches nennt die Dauer“, Dialog und Kernwendung nutzen aber „Para dos noches“. | Die Erklärung nennt jetzt beide üblichen Varianten. |
| S04 | P2 | L5 erklärte, das r in hermano stehe „zwischen Vokalen“. Das stimmt nicht. Das Beispiel „Tengo dos hermanos“ war mit „zwei Brüder“ übersetzt, die Lektion meint aber Geschwister. | Erklärung und Übersetzung korrigiert. |
| S05 | P2 | L18 erklärte b/v nur vage, L8 erklärte gusta/gustan im Text gar nicht, L9 erklärte este/esta/esto nicht. In L10 stand „Spreche“ statt „Sprich“. | Präzisiert und korrigiert. |
| S06 | P2 | Übersetzungen: „Llego un poco tarde“ stand als „Ich komme etwas später“ statt „zu spät“, „Schreiben Sie zwischen 30 und 40 Wörtern“ war ungrammatisch, „¿Cómo eres?“ war ohne Hinweis auf den Charakter übersetzt. | Korrigiert, auch in der Grammatikübersicht. |
| S07 | P1 | Audio: Buchstabierte Namen wie „Se escribe M-U-L-L-E-R.“ gingen als einzelne Buchstaben an die spanische Stimme. | Spanische Buchstabennamen ergänzt (eme, u, ele …). Die Stimme liest jetzt „Se escribe eme, u, ele, ele, e, erre.“ |
| S08 | P1 | Der Zurück-Button „← Lesen“ im Leseverstehen reagierte nicht. | Behoben. |
| S09 | P1 | Offene Formularfelder („¿Cómo eres?“, „Personas que quieres conocer (10–15 palabras)“ usw.) wurden Buchstabe für Buchstabe mit einer einzigen Musterantwort verglichen. Richtige eigene Antworten zählten deshalb fast immer als falsch. | Offene Felder zählen bei ausreichender Wortzahl und zeigen eine Musterantwort zum Selbstvergleich. Feste Angaben wie Name, Alter oder E-Mail werden weiter exakt geprüft. |
| S10 | P1 | `index.html` lud Stil-, Grammatik- und Lektionsdateien mit `?v=dialog-44`, der Offline-Cache enthielt aber `dialog-45`. In der installierten App fehlten diese Dateien offline. | Versionen angeglichen. Die geänderten Inhaltsdateien haben neue Versionen, damit installierte Apps sie neu laden. |
| S11 | P2 | Einzelheiten: Grammatikübersicht „Nach Vokal -s: hotel → hoteles“, Hörfrage zu „Paco“ ohne Paco im Text, Uhrzeit 18:15 statt 6:15, „estación de policía“, ungelenke Lesefrage, Subjuntivo-Musterantwort, mehrdeutige Grammatikfrage „Du hast nicht verstanden“. | Korrigiert. |

Neue Absicherung: `tests/spanish-a1-quality.test.cjs`. Der Test prüft Erklärungen und Alternativen aller Quizfragen, die Vertiefungstexte, die Übereinstimmung mit dem Lehrplan, die spanischen Buchstabennamen, den Zurück-Button und die offenen Formularfelder. Mit dem alten Stand schlagen alle fünf Tests fehl, mit dem neuen bestehen sie.

## Browser-Durchgang

* Alle 24 Übungsrunden (240 Aufgaben) liefen ohne JavaScript-Fehler.
* 234 der 240 Aufgaben zeigen nach der Antwort eine Begründung. Die übrigen sind automatisch erzeugte Lücken- oder Höraufgaben des gemeinsamen Übungsmotors. Sie zeigen die richtige Antwort und das Audio, so wie in den anderen Kursen.
* Die Sprachausgabe bekommt nie deutschen Text. Alle Texte gehen als `es-ES` an die Stimme. Der einzige Treffer der Prüfung ist der Name „Müller“.

## Nachtrag: Vertiefung und Lektionscheck wie bei Französisch

Nach dieser Prüfung kamen die beiden fehlenden Bausteine hinzu. Jede Lektion läuft jetzt so ab wie bei Französisch: **Hören & Vertiefung → 10 Übungen → Lektionscheck → Sprechen & Schreiben**.

* **Vertiefung** (`spanisch/deepening-content.js`): Jede Lektion hat 2 Themen, jedes mit einer Regel, drei hörbaren Beispielen und dem Mini-Test „Direkt üben“ mit 5 Aufgaben. Zu jeder Aufgabe gibt es eine Erklärung und Audio. Ein angefangener Test lässt sich fortsetzen. Insgesamt sind das 240 Aufgaben.
* **Lektionscheck** (`spanisch/check-content.js`): 12 neue Aufgaben pro Lektion, keine Kopien aus dem Quiz. Davon sind 5 Situationsfragen, 2 Hörfragen und 5 Formen zum Eintippen. Zum Bestehen braucht man 80 %. Danach gibt es eine Fehlerliste und eine Wiederholung nur der Fehler, und ein angefangener Check lässt sich fortsetzen. Fehlende Akzente werden mit Hinweis akzeptiert. Nur wo der Akzent die Bedeutung ändert (está/esta, tú/tu, mí/mi), zählen sie als Fehler. Insgesamt sind das 288 Aufgaben.
* **Abschluss einer Lektion:** mindestens 70 % in den 10 Übungen, mindestens 80 % im Lektionscheck, dazu Sprechen und Schreiben. Bereits abgeschlossene Lektionen bleiben abgeschlossen.
* Technik: `spanisch/lesson-practice.js` sowie optionale Erweiterungen in `shared/lesson-flow.js`. Diese Datei nutzt nur Spanisch.

Die Punkte 1 und 2 der folgenden Liste sind damit erledigt.

## Bekannte Grenzen (nicht behoben, weil Strukturänderung)

1. ~~**Lektionscheck fehlt.**~~ Erledigt, siehe Nachtrag. Französisch prüft jede Lektion mit einem eigenen Check und wiederholt Fehler gezielt. Spanisch hat nur die 10 gemischten Übungen.
2. ~~**Vertiefungsmodul fehlt.**~~ Erledigt, siehe Nachtrag. Französisch bietet pro Lektion eigene Vertiefungsthemen mit Mini-Tests. Bei Spanisch ist die Vertiefung ein Erklärungsblock ohne eigene Übungen.
3. **Keine vorproduzierten Aufnahmen.** Ohne spanische Stimme auf dem Gerät gibt es kein Hörtraining.
4. **Hör- und Lesetexte haben keine eigenen Erklärungen.** Im Training erscheint das Transkript, aber keine Begründung.
5. Die automatisch erzeugten Lückenaufgaben fragen manchmal sehr kleine Wörter ab (a, y). Das betrifft den gemeinsamen Übungsmotor aller Kurse.
