# Wiederholung und Fehlertraining

Einstieg: Startseite, „Das hast du schon gelernt“. „Wissen auffrischen“ öffnet die gemischte Themenwiederholung, „Fehler gezielt üben“ direkt die Fehlerauswahl. Die zuletzt verwendete Auswahl überschreibt diese beiden Einstiege nicht.

Die kompakte Karte zeigt gelernte Lektionen ohne automatischen Wechsel; ein einzelner Weiterblättern-Button und der Zähler dienen der Orientierung.
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
