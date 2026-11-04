# Prüfauftrag: Deutsch A1 – Stoffmenge, Nervfaktor, Aufgabenqualität, roter Faden, Hörverstehen

Du bist erfahrene/r DaF-Lehrkraft (Deutsch als Fremdsprache, Goethe-Prüferin Start Deutsch 1) **und** UX-Reviewer für Lern-Apps. Du prüfst den Kurs **Deutsch A1** in `deutsch/` (gemeinsamer Code in `shared/`). Zielgruppe: **französischsprachige Erwachsene ohne Deutschvorkenntnisse**, die am Handy lernen, oft 10–20 Minuten am Stück. Erklärungen im Kurs sind auf Französisch, Lernstoff auf Deutsch.

Dies ist ein **reiner Prüfauftrag**. Ändere keinen Code und keine Inhalte, bis ich den Bericht freigegeben habe.

## Kontext, den du zuerst liest

- `deutsch/LEHRPLAN-A1.md` – Aufbau (Écouter → Approfondir → Oral → Écriture → Bilan) und die 24 Lektionsthemen.
- `deutsch/QUESTION-QUALITY.md` und `deutsch/DE-A1-QUALITAET.md` – frühere Prüfungen und **bewusste Entscheidungen**. Melde nichts erneut, was dort schon behoben oder bewusst so entschieden ist, außer du findest, dass die Entscheidung dem Lernen schadet – dann begründe es ausdrücklich.
- `deutsch/VERTIEFUNG-SEITENLAST.md` – bisherige Arbeit zur Seitenlast.
- Inhalte: `lesson-content.js`, `deepening-content.js`, `question-content.js`, `applications.js`, `study.js`, `grammar-drills.js`, `comprehension-content.js`, `hard-mode-content.js`, `assessments.js`; Ablauf: `lesson-flow.js`, `app.js`, `shared/lesson-flow.js`, `shared/exercise-engine.js`.

Node ist nicht im PATH (siehe Memory). Für Zählungen und Dumps darfst du Skripte im Scratchpad schreiben, z. B. ein JSDOM-Dump wie in `tests/deutsch-a1-page-load.test.cjs`.

## Wie du prüfst

1. **Als Lernende/r durchspielen**, nicht nur Code lesen: Starte den Kurs im Browser (Preview, Handybreite 375 px) und spiele **Lektion 1, 4, 6, 12, 19 und 24 komplett** durch – alle Stufen inklusive Bilan und einem Hard-Mode-Spiel. Notiere Klicks, Wartezeiten, Wiederholungen und Momente, in denen du als Anfänger/in genervt oder verwirrt wärst.
2. **Alle 24 Lektionen inhaltlich auswerten** über die Datendateien bzw. einen Dump dessen, was Lernende sehen.
3. **Zahlen statt Eindrücke**: Wo eine Aussage messbar ist (Wörter, Grammatikpunkte, Fragen, Klicks, Bildschirmhöhen), zähle sie.
4. **Belege**: Jeder Fund nennt `Datei:Zeile`, die Lektion und zitiert die Aufgabe wörtlich (Frage + alle Optionen + Lösung). Allgemeine Ratschläge ohne konkretes Beispiel zählen nicht.
5. Kennzeichne jede Aussage als **geprüft** (selbst gesehen/gezählt) oder **Vermutung**.

## Prüfbereich 1 – Wird zu viel Stoff vermittelt?

- Zähle pro Lektion: **neue Wörter/Wendungen**, **neue Grammatikpunkte**, **Anzahl Aufgaben** über alle Stufen, **geschätzte Bearbeitungszeit**.
- Richtwert für A1: ca. 15–30 neue Wörter und 1–2 neue Grammatikpunkte pro Lektion. Markiere Lektionen deutlich darüber.
- Liste **Stoff oberhalb von A1** (z. B. Perfekt/Präteritum außer *war/hatte*, Dativ jenseits fester Wendungen, Nebensätze mit *weil/dass*, Konjunktiv außer *möchte/hätte gern*, Passiv, seltene Wörter, die nicht in der Goethe-A1-Wortliste stehen). Unterscheide: aktiv geübt vs. nur passiv gezeigt.
- Prüfe, ob Erklärungstexte zu lang sind (Absätze > 4 Sätze, Tabellen > 8 Zeilen am Handy) und ob dieselbe Regel mehrfach erklärt wird.
- Ergebnis: Tabelle *Lektion | neue Wörter | neue Grammatik | Aufgaben | Minuten | Urteil (ok / viel / zu viel)* und konkrete Streichvorschläge.

## Prüfbereich 2 – Ist es nervig zu benutzen?

Prüfe aus Sicht einer/s müden Lernenden am Handy:

- Klicks bis zur ersten Aufgabe; Klicks pro Aufgabe; unnötige Bestätigungen oder Zwischenbildschirme.
- **Wiederholung**: dieselbe Frage/derselbe Satz mehrfach in kurzer Folge, gleiche Aufgabe in Quiz, Bilan und Hard Mode.
- Zu lange Blöcke ohne Pause oder Fortschrittsanzeige; unklar, wie viel noch kommt.
- Audio: startet ungefragt, wiederholt sich, fehlt, ist zu schnell; Tippaufgaben, die an Umlauten, Groß-/Kleinschreibung, Leerzeichen oder Satzzeichen unfair scheitern.
- Feedback: zu lang, verdeckt die nächste Aufgabe, muss weggeklickt werden; Strafe/Neustart bei kleinem Fehler.
- Unklare Anweisungen (Was soll ich hier tun?), Mischung Französisch/Deutsch in der Bedienung, Fortschrittsverlust, Layoutfehler bei 375 px, Scrollen nötig, um Antwortknöpfe zu sehen.
- Ergebnis: Liste der **Reibungspunkte** mit Ort, Häufigkeit (einmalig / jede Aufgabe / jede Lektion) und Fix.

## Prüfbereich 3 – Ergeben Fragen und Antworten Sinn? Sind die Optionen nah beieinander?

Prüfe **alle Auswahl- und Lückenaufgaben** automatisch und **mindestens 150 zufällig gezogene Aufgaben** (gleichmäßig über Lektionen und Aufgabentypen verteilt) von Hand.

Für jede Aufgabe:

- **Sinn**: Ist die Frage verständlich, ist die Situation realistisch, ist das Deutsch natürlich und A1-gerecht? Passt die französische Übersetzung/Erklärung genau?
- **Eindeutigkeit**: Ist genau eine Option richtig? Wäre eine zweite Option für Muttersprachler/innen auch korrekt? (Kritisch.)
- **Nähe der Distraktoren** – gute Distraktoren sind:
  - gleiche Wortart, gleiche Form, ähnliche Länge, gleiches Thema;
  - **typische Lernerfehler** (falscher Artikel, falsche Verbendung, *ihr/Ihr*, *vierzehn/vierzig*, *halb acht* = 7:30 vs. 8:30, *kennen/wissen*, Verbposition);
  - nur durch das Lernziel der Aufgabe unterscheidbar.
- **Zu offensichtlich**, wenn z. B.: nur eine Option grammatisch in die Lücke passt, obwohl Grammatik nicht das Lernziel ist; die Lösung länger/genauer formuliert ist; Distraktoren absurd oder themenfremd sind; die Frage die Lösung schon enthält; die Lösung immer an derselben Position steht; man ohne Deutschkenntnisse durch Ausschluss lösen kann.
- **Zu unfair**, wenn: zwei Lösungen vertretbar sind, Stoff abgefragt wird, der vorher nicht gezeigt wurde, oder eine Tippaufgabe nur eine von mehreren korrekten Schreibweisen akzeptiert.
- **Erklärung**: Erklärt sie, *warum* die Lösung richtig und der gewählte Distraktor falsch ist – oder wiederholt sie nur die Lösung?

Bewerte jede geprüfte Aufgabe mit **Trennschärfe 1–5** (1 = Lösung springt ins Auge, 3 = man muss den Lernpunkt kennen, 5 = sehr nah, aber eindeutig; *U* = mehrdeutig/unfair).
Ergebnis: Verteilung der Werte pro Lektion und Aufgabentyp, die **30 schwächsten Aufgaben** mit Zitat und **fertigem Ersatz** (neue Frage, neue Optionen, Lösung, französische Erklärung).

## Prüfbereich 4 – Wird gut vermittelt oder geht es kreuz und quer?

- **Progression**: Baut jede Lektion auf den vorherigen auf? Wird etwas abgefragt, bevor es erklärt wurde (Lektion, Stufe, Aufgabe nennen)? Wird Grammatik verwendet, die erst Lektionen später eingeführt wird?
- **Roter Faden in der Lektion**: Passen Écouter, Approfondir, Oral, Écriture und Bilan zum selben Thema und Lernziel? Gibt es Übungen, die thematisch nicht zur Lektion gehören?
- **Grammatik-Verteilung**: Erstelle eine Karte *Grammatikpunkt → Lektion der Einführung → Lektionen mit Wiederholung*. Markiere Punkte, die verstreut ohne klare Einführung auftauchen, zu früh kommen oder nie wiederholt werden.
- **Bilan/Check**: Prüft der Lektionstest, was in der Lektion gelernt wurde, oder Zufälliges/Früheres/Späteres?
- **Reihenfolge der Lektionen**: Ist die Reihenfolge der 24 Themen für Anfänger/innen sinnvoll (z. B. Doppelungen wie L14 Symptome vs. L19 Schmerzen; L16 Schilder vs. L23 Formulare)? Schlage ggf. Zusammenlegungen oder Umstellungen vor.
- Ergebnis: Progressionskarte und Liste der Brüche mit Fix.

## Prüfbereich 5 – Hörbeispiele und Hörverstehen

Quellen: `comprehension-content.js`, `listening-audio.js`, `listening-player.js`, `answer-audio.js`, Hörfragen in `hard-mode-content.js`, Audio in `lesson-content.js` und `deepening-content.js`, gemeinsamer Code in `shared/comprehension.js`, `shared/dialogue-voices.js` und `shared/review-audio.js`. Höre die Beispiele in den sechs durchgespielten Lektionen wirklich an und lies nicht nur die Texte.

- **Menge**: Zähle pro Lektion und Stufe die Hörbeispiele (Einzelwörter, Sätze, Dialoge, Hörtexte mit Fragen) und ihre Gesamtdauer. Gibt es zu viele, sodass das Hören zur Pflichtschleife wird? Gibt es Stellen, an denen Audio fehlt, obwohl es nötig wäre (Aussprache neuer Wörter, Zahlen, Uhrzeiten)? Werden dieselben Sätze in mehreren Stufen erneut vorgespielt?
- **Sind die Hörfragen angemessen?**
  - Ist die Frage nur durch Hören lösbar, oder verrät der eingeblendete Text oder die Frage selbst schon die Lösung?
  - Prüft sie, was Start Deutsch 1 verlangt (eine Zahl, einen Preis, eine Uhrzeit, einen Ort oder eine Information heraushören), oder Nebensächliches und Gedächtnisdetails?
  - Gibt es genau eine Lösung, die eindeutig im Audio vorkommt? Liegen die Distraktoren nahe, kommen sie z. B. ebenfalls im Text vor (*Gleis 3* vs. *Gleis 13*, *Dienstag* vs. *Donnerstag*)?
  - Ist die Frage nur über die Stimme oder einen Tonfall lösbar und nicht über den Inhalt?
  - Passt das Niveau zu A1: Sprechtempo, Satzlänge, unbekannte Wörter, Anzahl Sprecher/innen, Störgeräusche?
- **Macht die Aufteilung Sinn?**
  - Ist klar, was vor, während und nach dem Hören zu tun ist?
  - Kommen die Fragen vor dem Hören, damit man gezielt hört? Wie oft darf man hören, und ist das wie in der Prüfung (meist zweimal)?
  - Ist ein Hörtext sinnvoll in Abschnitte geteilt, oder hängen viele Fragen an einem langen Text?
  - Stehen Hörbeispiele beim passenden Lernstoff, oder kommen sie zu früh, bevor die Wörter bekannt sind?
- **Wird zu viel Information in ein Hörbeispiel gestopft?**
  - Zähle pro Hörtext Wörter, Sätze, Zahlen und Namen, Informationen, die man sich merken muss, und Fragen pro Text.
  - Richtwert A1: kurze Alltagsdialoge mit etwa 2–6 Wechseln oder Ansagen mit 1–3 Kerninformationen, 1–2 Fragen pro Text.
  - Markiere Texte, die mehrere Zahlen, Zeiten und Orte auf einmal bringen oder künstlich überladen wirken („Infodump-Dialoge“).
- **Technik und Bedienung**: Abspielen, Pause und Wiederholen am Handy, Tempo-Option, Ladezeiten, falsche oder fehlende Dateien, unpassende Stimme (z. B. Sprecherwechsel im Dialog nicht hörbar), Audio, das andere Audio überlagert.
- **Ergebnis**: Tabelle *Lektion | Hörbeispiele | Gesamtdauer | Hörfragen | Ø Informationen pro Text | Urteil (zu wenig / passend / zu viel / überladen)*, die 10 schwächsten Hörfragen mit Transkript-Zitat und fertigem Ersatz sowie die überladenen Texte mit einem Kürzungsvorschlag.

## Form des Berichts

Schreibe den Bericht nach `deutsch/PRUEFBERICHT-A1.md`, auf Deutsch:

1. **Kurzfazit** (max. 10 Zeilen) und Noten 1–5 für jeden Prüfbereich mit einem Satz Begründung.
2. **Top 10 Maßnahmen**, sortiert nach Nutzen für Lernende ÷ Aufwand.
3. Je Prüfbereich die oben verlangten Tabellen.
4. **Fundliste** als Tabelle: *ID | Bereich | Lektion | Datei:Zeile | Zitat | Problem | Schweregrad (KRITISCH / MITTEL / GERING) | konkreter Fix | geprüft/Vermutung*.
   - KRITISCH: falsche oder mehrdeutige Lösung, fehlerhaftes Deutsch, abgefragter Stoff nicht vermittelt, Bedienung blockiert.
   - MITTEL: zu offensichtlich, zu viel Stoff, deutliche Reibung, Bruch im roten Faden.
   - GERING: Stil, Kleinigkeiten.
5. **Was gut ist** (kurz) – damit es bei Änderungen nicht kaputtgeht.
6. **Methode und Grenzen**: was du durchgespielt, gezählt, stichprobenartig oder gar nicht geprüft hast.

Sei streng und konkret. Lieber 40 belegte Funde als 100 allgemeine Bemerkungen. Keine Lobhudelei, keine Füllsätze.
