# Inhalts- und Aufgabenqualitätsaudit – 1. November 2026

**Status: Teilabgeschlossen (systematische technische Bestandserfassung, gezielte redaktionelle Korrekturen). Kein zertifiziertes vollständiges linguistisches Audit.**

## 1. Tatsächlich überprüfte Aufgabenbestände

Die statischen Multiple-Choice- bzw. Auswahlfragen der folgenden Quellen wurden programmatisch auf gültige Lösungsindizes, fehlende/duplizierte Optionen und auffällige Positionsverteilungen geprüft:

| Kurs | Erfasste Auswahlaufgaben | Quellen / Abgrenzung |
| --- | ---: | --- |
| Deutsch A1 (FR → DE) | 731 | 278 Grammatik, 305 Themenpraxis, 148 Lektionscheck-Auswahlaufgaben |
| Französisch A1 (DE → FR) | 438 | 240 Lektionen-Quiz, 120 Grammatik, 66 Hör- und 12 Lese-Multiple-Choice |
| Englisch A1 (DE → EN) | 1.104 | 768 Grammatik-Zeilen, 240 Wendungs-/Übersetzungs-Zeilen, 96 Kontextaufgaben |
| Spanisch A1 (DE → ES) | 434 | 240 Lektionen-Quiz, 80 Grammatik, 57 Hören, 57 Lesen |
| Türkisch → Deutsch C1 | 419 | Verschachtelte C1-Aufgaben mit `q/o/a` (außerhalb des A1-Zielniveaus) |
| **Gesamt** | **3.126** | Strukturprüfungen, keine vollständige Einzelbegutachtung aller Bedeutungen |

Für diese 3.126 Einträge wurden **keine ungültigen Lösungsindizes** festgestellt. Keine Antwortliste enthielt zwei exakt gleiche Optionen. Vier scheinbare Duplikate bei deutscher A1-Grammatik entstehen ausschließlich durch die **grammatisch notwendige Unterscheidung `sie` / `Sie`** und dürfen **nicht** automatisch vereinheitlicht werden.

Weitere erfasste Formate (z. B. 190 deutsche Lektionscheck-Lücken, True/False, Zuordnungen, Hard Mode, generierte Fragen und schriftliche Leistungen) fallen **nicht vollständig** unter diese 3.126er-Zahl. Die Zahl ist deshalb keine Gesamtzahl aller Übungen.

## 2. Schwerwiegende Befunde und Korrekturen

### A – Antwortpositionen verraten die Lösung (systemischer Fehler)

- Spanisch: Ursprünglich lagen alle 114 statischen Hör-/Lese-Lösungen auf Position A; die 80 Grammatikaufgaben waren mit 60 × A deutlich verzerrt, drei ganze Grammatiksets lagen ausschließlich auf A.
- Französisch: Grammatik- und bestimmte Hör-/Lesesets waren stark positionslastig, ein Grammatikset hatte ausschließlich A.
- Deutsch: Die statischen Themenpraxis- und Lektionscheck-Auswahlfragen speichern die korrekte Lösung stets im ersten Feld; die Quiz-Renderer dürfen diese Reihenfolge nicht unverändert anzeigen.
- **Korrektur:** Die relevanten gerenderten Multiple-Choice-Optionen werden in `spanisch/app.js`, `francais/app.js` und `deutsch/app.js` gemischt. Der korrekte Antworttext und sein neuer Index werden synchron neu ermittelt. Identitätsgebundene Formate (A/B-Lesetexte, Wahr/Falsch) bleiben absichtlich in ihrer semantisch festen Reihenfolge.

### B – Inhaltlich wertlose Distraktoren

- In der spanischen Einführung standen bei „¡Hola!“ unter anderem „eins, zwei, drei“ und eine Zeitangabe. In weiteren Lektionen wurden Antworten offenbar aus fremden Themenbereichen zusammengestellt.
- **Korrektur:** Alle zehn Quizfragen der ersten spanischen Lektion besitzen jetzt manuell überprüfte, thematisch plausiblere Alternativen. Mehrere zusätzliche spanische Grammatik-Distraktoren wurden verfeinert.
- **Offen:** Die 230 Quizfragen der spanischen Lektionen 2–24 wurden strukturell erfasst, aber noch **nicht vollständig** auf ihren semantischen Schwierigkeitsgrad redaktionell korrigiert. Die bisherigen Fälle belegen weiterhin große Qualitätslücken. Keine automatisierte Ersetzung ohne Bedeutungsprüfung.

### C – Antworterklärungen fehlen oder sind irreführend

- `shared/explain-de.js`: Entstörung eines fehlerhaften Regex-Steuerzeichens, korrekte Deklination `euer → eure / euren`, vorsichtigere Fallzuordnung bei Wechselpräpositionen und Dativverben, keine unbegründete Genuszuschreibung anhand von Suffixen, plausible Beispiele für trennbare Verben. Zusätzliche Erklärungen für Personalpronomen, Pluralformen und Zeitangaben.
- Im realen statischen deutschen Grammatikpool liefern nun **278/278** Aufgaben bei der durchgeführten Engine-Simulation mindestens eine Erklärung; zuvor fehlten bei 30 dieser Aufgaben die Regelkarten.
- `deutsch/question-content.js`: Für **57 zuvor ohne Regelkarte erfasste Verständnisfragen** gezielte, aus der Aufgabenstellung abgeleitete Erläuterungen zu Schlüsselwörtern, Zeitangaben, Zahlen, Satzstellung und Kontext hinzugefügt.
- `shared/explain-fr.js`: `notre/votre/leur` nach Numerus statt unzutreffend ausschließlich maskulin; Ausnahmen zur französischen Verneinung und den `être/avoir`-Hilfsverben; alternative zulässige Zahlenschreibung. Bei deutschsprachigen Übersetzungsantworten wird die französische **Ausgangsform** statt der deutschen Zielantwort grammatisch analysiert.
- `francais/data.js`: 33 konkrete Quizrationalen ergänzt; `quai` im Bahnhofskontext von der unpräzisen Alternative „Gleis/Bahnsteig“ auf **„Bahnsteig“** korrigiert.
- `spanisch/data.js` und `spanisch/app.js`: **80 individuelle Grammatik-Erklärungen**, deren Anzeige nach dem Auswählen der Antwort sowie **10 individuelle Erklärungen** zur ersten Lektion ergänzt.
- `spanisch/lesson-content.js`: Falsche Aussage, `está` habe nur eine Silbe, ersetzt durch korrekte Erklärung **es-tá (zwei Silben)**.

**Offen:** Die übrigen dynamischen Grammatik- und Lektionscheck-Erklärungen müssen Frage für Frage auf Relevanz, Mehrdeutigkeit und tatsächliche Abdeckung überprüft werden. Insbesondere spanische Quizzes der Lektionen 2–24 sowie viele spanische Hör-/Lesefragen haben weiterhin keine individuell geschriebene Begründung. Auch bei anderen Kursen ist eine bloße Generatorkarte nicht automatisch ein didaktisch ausreichender Lösungsweg.

## 3. Absicherungen

`tests/explanation-fidelity.test.cjs` sichert unter anderem Folgendes ab:

- deutsche Possessivformen, Genus-/Kasusregeln und 278 Grammatikaufgaben;
- französische Regeln und Übersetzungsbegründungen;
- spanische Quizindizes und Optionen, 80 Grammatikrationalen, die Aussprache von `está`;
- korrekte Lösung nach zufälliger Antwortposition in DE/FR/ES;
- ausgewählte neu annotierte französische und deutsche Verständnisfragen.

Die **13 Tests** wurden mit ihren Original-Quelldateien in einer isolierten JavaScript-Ausführung erfolgreich durchgespielt. Ein vollständiger `node --test`-Lauf mit lokal geklonter Arbeitskopie sowie Browser-/Mobil-End-to-End-Tests konnten aus dieser Umgebung nicht durchgeführt werden.

## 4. Ausdrücklich nicht als abgeschlossen deklarieren

1. Vollständige redaktionelle Einzelabnahme aller 3.126 Auswahlfragen; strukturierte Validierung ersetzt keine Sprachprüfung.
2. Vollständige semantische Überarbeitung sämtlicher spanischer Distraktoren nach Lektion 1.
3. Die individuellen Erklärungen aller übrigen Quiz-, Lese-, Hör-, Zuordnungs-, Lücken- und Hard-Mode-Aufgaben.
4. Prüfung aller Audio-Transkripte, TTS-Aussprache, Übersetzungskontexte, alternative korrekten Antworten und Zeit-/Kasus-Mehrdeutigkeiten.
5. Visuelle und interaktive Regression auf Desktop und Mobilgerät einschließlich gespeicherter Lernfortschritte.

**Redaktionelle Qualitätsnorm:** Distraktoren sollten sprachlich möglich, thematisch verwandt und eindeutig widerlegbar sein, ohne künstliche A1-Fallen zu erzeugen. Jede Feedback-Erklärung soll die *entscheidende* Regel oder Textstelle erklären, nicht lediglich die korrekte Antwort wiederholen.
