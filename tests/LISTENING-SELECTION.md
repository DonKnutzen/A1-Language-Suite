# Hörverstehen mit Auswahlantworten · Revision 162

Ausgangsstand: `9d22c2651c8fedcefcab99c6a3ce6fab073fb261`.

## Änderungen

- Französisch und Deutsch A1: alle 326 Hard-Mode-Hörfragen verwenden jetzt Auswahlantworten. Die normalen Hördialoge hatten bereits Auswahlantworten. Kein Hörtext und keine Frage wurden entfernt; Lückentext und freie Nachricht bleiben eigenständige Schreibaufgaben.
- Die Alternativen sind je Frage redaktionell hinterlegt: etwa verwechselbare Uhrzeiten, Zahlengruppen, Namen, Orte oder passende Gegenstände. Formatvarianten und Synonyme dürfen keine zweite richtige Auswahl erzeugen.
- Beim deutschen Doppelnamen werden die beiden Namen ohne Trennzeichen angezeigt; die folgende Frage zum Bindestrich bleibt eine eigenständige Hörfrage. Die französischen E-Mail-Alternativen nennen nicht mehr durchgehend denselben Nachnamen und erfordern weiterhin die Unterscheidung der Domain.
- Neue Inhaltsversionen: Französisch 5, Deutsch 4. Ursprüngliche Datensätze bleiben für abgegebene Versuche erhalten. Offene Versuche werden archiviert und auf die aktuellen Auswahlfragen übertragen; passende alte Eingaben werden einer tatsächlich angebotenen Antwort zugeordnet. Nicht zuordenbare Eingaben bleiben im archivierten Entwurf. Lückentext, Schreibentwurf, Bestwerte und frühere Erfolge bleiben erhalten.
- Unter 80 % zeigt der Lektionscheck den bisherigen leuchtenden Einstieg mit einer kurzen Wiederholungsaufforderung. Grün kennzeichnet einen erreichten Bestwert ab 80 %. Ein schon freigeschalteter Hard Mode wird durch einen späteren schwächeren Versuch nicht wieder gesperrt.
- Die Prozentanzeige bleibt eine einzelne, nicht schrumpfende Einheit neben der umbrechenden Überschrift. Beim erneuten Teststart wird der aktuelle Bestwert verwendet.
- Wortliste am Lektionsanfang: kurzer Hinweis zum Nachschlagen, späteren Wiederaufgreifen und zur Erklärung von Präpositionen/Endungen in der Vertiefung. Die Wörter bei einzelnen Übungen erhalten einen kurzen Aufgabenhinweis. Der Weiter-Button wurde nicht versetzt.
- Hard Mode: kurzer Hinweis „Optional · Nicht für den Lektionsabschluss erforderlich“, auch vor der Freischaltung.
- Browserdateien und beide A1-Service-Worker-Caches wurden gemeinsam versioniert.

## Verifikation

107 gezielte Tests erfolgreich: 104 Tests für Hörverstehen, Auswahl und Fortsetzung aller 48 Hard Modes, Lektionscheck, Wortschatz, Auszeichnungen und didaktische Regressionen; zusätzlich drei deutsche Paritätstests einschließlich vollständiger Abgabe/Selbstbewertung aller 24 deutschen Hard Modes.

26 Chromium-Prüfungen: beide Kurse, 320/390/1280 Pixel, Hell-/Dunkelmodus, Ergebnisse unter/über 80 %, einzeilige Prozentanzeige und tatsächliche Auswahlinteraktion im Hard Mode. Screenshots wurden visuell geprüft. Keine tatsächliche Browseraussprache wurde neu bewertet.

Die vollständige deutsche Paritätstestsammlung enthält außerdem eine bereits auf dem unveränderten Ausgangsstand fehlschlagende Prüfung zur Fehlertraining-Sitzung (`German mistake memory, settings, frozen responses and draft position survive reopening`); diese separate Bestandsabweichung wurde nicht als behoben ausgegeben.
