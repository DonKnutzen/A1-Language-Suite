# Wiederholung und Fehlertraining

Einstieg: Startseite, „Tägliche Wiederholung“, direkt unter „Fortsetzen“ und vor dem Lernbaum. „Wissen auffrischen“ öffnet die gemischte Themenwiederholung, „Fehler gezielt üben“ direkt die Fehlerauswahl. Die zuletzt verwendete Auswahl überschreibt diese beiden Einstiege nicht.

Der Einstieg leuchtet, solange heute noch keine vollständige Wiederholungsrunde beendet wurde. Danach zeigt die Karte „Heute wiederholt“ ohne laufende Animation; weitere Runden bleiben möglich. Eine abgeschlossene Runde zählt unabhängig vom Ergebnis. Der Kalendertag richtet sich nach der lokalen Gerätezeit. Die technischen Details für beide A1-Kurse stehen in `../shared/DAILY-REVIEW.md`.
Bei gespeicherten Fehlern steht der Einstieg auch vor dem ersten Lektionsabschluss bereit.

- **Alles mischen:** Aufgaben aus den konkreten Grammatikthemen abgeschlossener Lektionen.
- **Selbst auswählen:** ganze Lektionen oder einzelne Grammatikthemen ankreuzen. Allgemeine Lektionsübungen, Lektionschecks und Hörübungen werden weder als Auswahl noch im gemischten Themenpool verwendet.
- **Fehler gezielt üben:** noch offene, tatsächlich falsch beantwortete Aufgaben, auch aus begonnenen Lektionen und zusätzlichem Training.
- 10 oder 20 Fragen; kleinere Pools werden ohne Auffüllen mit Duplikaten angeboten.
- Rundenauswahl verteilt Fragen auf Lektions-/Themengruppen und vermeidet unmittelbar ähnliche Antworten.

## Fehler und Bewertung

Erfasst werden neue Antworten aus Lektionsübungen, Grammatikvertiefung (einschließlich der Sonderübungen in Lektion 1), Lektions- und Kurschecks, Lektionshörverstehen, den objektiven Hard-Mode-Teilen sowie zusätzlichem Grammatik-, Hör- und Lesetraining. Freie Texte und Sprechaufgaben erhalten keine erfundene automatische Bewertung.

Ein Fehler bleibt vorgemerkt, bis dieselbe Aufgabe in zwei Wiederholungen hintereinander richtig beantwortet wurde. Ein neuer Fehler setzt die Serie zurück. Normale Übungen können neue Fehler vormerken, entfernen sie aber nicht durch unmittelbar nachfolgendes Nachklicken. Es handelt sich um eine Übungsregel, nicht um einen bestätigten Kompetenznachweis oder zeitgesteuerten Lernalgorithmus.

Vorhandene konkrete Antwortdaten aus noch gespeicherten Übungen und abgegebenen Hard-Mode-Versuchen ab Version 2 werden einmalig übernommen. Aus früheren Gesamtprozenten werden keine einzelnen Fehler abgeleitet. Bereits vollständig ersetzte Versuche lassen sich nicht rekonstruieren.

Antwortprüfung entspricht den bestehenden Lektionschecks; Hard-Mode-Aufgaben übernehmen ihre individuellen Regeln für Akzente, Zahlen und alternative Lösungen. Französisch wird über die kostenlose Browserstimme wiedergegeben. Hördialoge bleiben als Sprecherfolgen erhalten, Tempo 75 %.

## Speicherung

`state.reviewPractice` liegt im bestehenden profilbezogenen Französisch-Kursstand und wird über die vorhandene Speicher-/Profilfunktion gespeichert. Kein zusätzlicher Dienst. Kursreset löscht auch diese Daten.

Aufgabenidentitäten berücksichtigen Frage, Lösungen, Kontext, Optionen und Hörinhalt. Fehler und laufende Runden speichern den vollständigen Aufgabenstand. Inhaltsänderungen bewerten dadurch alte Antworten nicht unbemerkt gegen neue Fragen. Ein Neuladen erhält Antwort, Optionsreihenfolge, Position und Entwurf. Geprüfte Antworten werden dabei nicht erneut gezählt.

Wiederholungen verändern weder Lektionsbestwerte noch die Hard-Mode-Freischaltung. Eine neue Runde ersetzt eine laufende Runde erst nach ausdrücklicher Bestätigung; die bereits gemerkten Fehler bleiben erhalten.

## Prüfung

`node --test francais/tests/review-practice.test.cjs` (jsdom erforderlich) prüft unter anderem alle 24 Lektionspools, Themenfilter, Rundenauswahl, Fehlerstatus, Antwortregeln, Wiederaufnahme und die echte Lektionscheck-Anbindung. Layout und Navigation werden zusätzlich im Browser geprüft; diese Tests beurteilen keine tatsächliche TTS-Klangqualität.

Bereits laufende gemischte oder selbst zusammengestellte Runden werden auf Grammatikaufgaben begrenzt. Dabei bleiben Antworten ihrer ursprünglichen Aufgabe zugeordnet; der vorherige Rundenstand bleibt unter `previousMixedRound` gespeichert. Explizites Fehlertraining kann weiterhin Fehler aus allen erfassten Übungsarten enthalten.

## Aufgabenqualität, Revision 139

Der Wiederholungspool wurde auf echte Form-/Anwendungsaufgaben begrenzt. Automatische Übersetzungskarten aus den Beispielsammlungen werden nicht mehr in „Alles mischen“ und „Selbst auswählen“ aufgenommen; dafür gibt es den Vokabeltrainer. Tatsächlich gespeicherte Wortschatzfehler bleiben im ausdrücklich gewählten Fehlermodus zugänglich. Lektion 1 verwendet ausschließlich ihre vorbereiteten Spezialübungen, ohne parallele Konjugationsfragen aus denselben Referenztabellen.

Die französischen Grammatiktabellen erzeugen keine beliebigen Zellzuordnungen mehr. Nur bekannte Tabellenformen erhalten passende Satzlücken. Beispiele:

- Statt „Welche Form passt zu vous (habiter)?“ mit „vous habitez / j’habite / nous habitons“: „Vous ___ à Lyon.“ mit „habitez / habite / habites“. Die reguläre Wiederholung verwendet „Vous ___ où ?“ mit „habites / habitez / habitons“ aus der Spezialübung.
- Statt „à la → à la gare“: „Je suis ___ gare.“ mit „à la / au / aux“.
- Statt „du → Je viens du Canada“: „Je viens ___ Canada.“ mit „du / de / d’“.
- Reflexive Konjugationen geben Subjekt und Reflexivpronomen vor: „Vous vous ___ comment ?“ mit „appelez / appelle / appelles“. Das Korrekturaudio liest einen vollständigen Satz ohne doppelte Subjekte oder vorgelesene Personenlisten.
- Künstliche Ablenker wie „Ce sommes“ und „Ces sont“ wurden durch Satzlücken mit realen Verbformen ersetzt. Bei „Mon ___ est Dupont“ stehen „nom“ und „nom de famille“ nicht mehr als zwei gleichermaßen mögliche Lösungen nebeneinander. Die Höflichkeitsfrage unterscheidet drei Fragen mit vous und benennt präzise die Bedeutung „könnten Sie“.

Nachvollziehbare Änderungen an gespeicherten Aufgaben: Noch unbeantwortete betroffene Fragen werden beim Fortsetzen ersetzt, eine überholte Optionsreihenfolge wird verworfen. Bewertete Antworten und Ergebnisse bleiben unverändert; die vorige Runde wird in `previousQuestionRound` archiviert. Überholte Tabellenfehler werden als Verlauf aufbewahrt und mit der korrigierten Aufgabe weiter geübt; ein Erfolg wird daraus nicht abgeleitet. Derselbe Schutz gilt beim Fortsetzen der betroffenen direkten Grammatikübungen (`previousQuestionSession`).

Die ergänzten Tests prüfen die gemeldete vous/habiter-Aufgabe, alle bekannten Tabellenformen, gleichartige Optionen, Mehrdeutigkeiten, die Bereinigung aller 24 Wiederholungspools und das Fortsetzen vorhandener Fragen einschließlich Fehlerhistorie. Zusammen mit den vorhandenen Französisch-/Deutsch-A1- und Vokabeltests bestehen 101 Tests. Ein zusätzlicher Chromium-Durchlauf prüft die sichtbaren Antwortmöglichkeiten, die Aktualisierung nach Neuladen und englische Darstellung auf Mobil- und Desktopbreite. Tatsächlicher TTS-Klang wurde nicht angehört.
